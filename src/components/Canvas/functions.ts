import {Theme} from '../Theme';
import {Executor, Frame} from '../Algorithms/codes';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';
import {deviceRatio, rgba} from '../../functions';

export type Size = [number, number];

function collectFrames(disorderedList: Array<number>, executor: Executor): Array<Frame> {
    const frames: Array<Frame> = [];
    executor(disorderedList, _ =>
        frames.push({list: [..._.list], comparing: _.comparing, swap: _.swap})
    );
    return frames;
}

export class AnimationPlayer {
    public speed = 100;
    private audioPlayer: AudioPlayer;
    private _frames: Array<Frame> = [];
    private context: CanvasRenderingContext2D;
    private playId = NaN;
    private left = 0;
    private barUnit = 0;
    private barCount = 0;
    private barGap = 0;
    private barWidth = 0;
    private barStride = 0;
    private barStart = 0;
    private swapFill = '';
    private comparingFill = '';
    private defFill = '';

    constructor(context: CanvasRenderingContext2D, audioPlayer: AudioPlayer) {
        this.context = context;
        this.audioPlayer = audioPlayer;
    }

    private _executor: Executor = () => undefined;

    set executor(executor: Executor) {
        this._executor = executor;
        if (this._frames[0]) {
            this._frames = collectFrames(this._frames[0].list, executor);
        } else {
            this._frames = collectFrames(shuffle(range(1, this.barCount + 1)), executor);
        }
        this.play();
    }

    private _size?: Size;

    set size(size: Size) {
        this._size = size;
        this.getLayout();
    }

    private _theme?: Theme;

    set theme(theme: Theme) {
        this._theme = theme;
        // Precompute the three bar fill colors once per theme instead of running
        // rgba()'s regex for every bar on every frame.
        this.swapFill = rgba(theme.keywordColor, 0.3);
        this.comparingFill = rgba(theme.variableColor, 0.3);
        this.defFill = rgba(theme.defColor);
    }

    drawFrame(frame: Frame): void {
        if (this._size && this._theme) {
            const height = this._size[1];
            this.context.clearRect(0, 0, this._size[0], height);
            frame.list.forEach((value, i) => {
                if (frame.swap?.includes(i)) {
                    this.context.fillStyle = this.swapFill;
                } else if (frame.comparing?.includes(i)) {
                    this.context.fillStyle = this.comparingFill;
                } else {
                    this.context.fillStyle = this.defFill;
                }
                this.context.fillRect(
                    this.barStart + this.barStride * i,
                    height - this.barUnit * value,
                    this.barWidth,
                    this.barUnit * value
                );
            });
        }
    }

    _nextFrame(): void {
        this.playId = window.setTimeout(() => {
            const frame = this._frames.shift();
            if (frame) {
                this.audioPlayer.fresh(frame, this.speed, this.barCount);
                this.drawFrame(frame);
                this._nextFrame();
            } else {
                this.play();
            }
        }, this.speed);
    }

    play(): void {
        clearTimeout(this.playId);
        if (this._frames.length === 0) {
            this._frames = collectFrames(shuffle(range(1, this.barCount + 1)), this._executor);
        }
        this._nextFrame();
    }

    replay(): void {
        this._frames = [];
        this.play();
    }

    destroy(): void {
        clearTimeout(this.playId);
        this._frames = [];
    }

    private getLayout(): void {
        this.barWidth = 16 * deviceRatio;
        this.barGap = deviceRatio;
        this.barStride = this.barWidth + this.barGap;
        if (this._size) {
            this.barCount = (this._size[0] / this.barStride) | 0;
            this.barUnit = (this._size[1] / this.barCount) | 0;
            this.left = (this._size[0] - this.barCount * this.barStride) / 2;
        }
        this.barStart = this.left + this.barGap / 2;
    }
}

class GainedOscillator {
    public oscillator: OscillatorNode;
    public readonly gain: GainNode;
    private started = false;

    constructor(type: OscillatorType, audioContext: AudioContext) {
        this.oscillator = audioContext.createOscillator();
        this.gain = audioContext.createGain();

        this.oscillator.type = type;
        this.gain.connect(audioContext.destination);
        this.oscillator.connect(this.gain);
        this.gain.gain.setValueAtTime(0.0000001, audioContext.currentTime);
    }

    start(): void {
        if (!this.started) {
            this.started = true;
            this.oscillator.start();
        }
    }
}

export class AudioPlayer {
    public isEnabled = false;
    private readonly audioContext: AudioContext;

    private readonly swapGainedOscillators: [GainedOscillator, GainedOscillator];
    private readonly comparingGainedOscillators: [GainedOscillator, GainedOscillator];

    constructor() {
        this.audioContext = new AudioContext();
        this.swapGainedOscillators = [
            new GainedOscillator('square', this.audioContext),
            new GainedOscillator('square', this.audioContext),
        ];
        this.comparingGainedOscillators = [
            new GainedOscillator('sine', this.audioContext),
            new GainedOscillator('sine', this.audioContext),
        ];
    }

    // Must run inside a user gesture (autoplay policy): resume the context and start
    // every oscillator. Idempotent — safe to call on every PLAY / music-toggle click.
    unlock(): void {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        [...this.swapGainedOscillators, ...this.comparingGainedOscillators].forEach(o => o.start());
    }

    dispose(): void {
        this.audioContext.close();
    }

    private static frequency(value: number, upper: number) {
        return 30 + (4200 - 30) * (value / upper);
    }

    fresh(frame: Frame, duration: number, barCount: number): void {
        if (this.isEnabled) {
            const timeSlice = duration < 100 ? 0.1 : 0.6;
            if (frame.swap) {
                frame.swap.forEach((swap, index) =>
                    this.beep(
                        this.swapGainedOscillators[index],
                        AudioPlayer.frequency(swap, barCount),
                        index * timeSlice,
                        (index + 1) * timeSlice,
                        0.1
                    )
                );
            } else if (frame.comparing) {
                frame.comparing.forEach((comparing, index) =>
                    this.beep(
                        this.comparingGainedOscillators[index],
                        AudioPlayer.frequency(comparing, barCount),
                        index * timeSlice,
                        (index + 1) * timeSlice,
                        0.03
                    )
                );
            }
        } else {
            this.swapGainedOscillators.forEach(o =>
                o.gain.gain.setValueAtTime(0.0000001, this.audioContext.currentTime)
            );
            this.comparingGainedOscillators.forEach(o =>
                o.gain.gain.setValueAtTime(0.0000001, this.audioContext.currentTime)
            );
        }
    }

    private beep(
        gainedOscillator: GainedOscillator,
        frequency: number,
        startTime: number,
        stopTime: number,
        gainValue: number
    ): void {
        if (gainedOscillator) {
            gainedOscillator.oscillator.frequency.setValueAtTime(
                frequency,
                this.audioContext.currentTime
            );
            gainedOscillator.gain.gain.setValueAtTime(
                gainValue,
                this.audioContext.currentTime + startTime
            );
            gainedOscillator.gain.gain.exponentialRampToValueAtTime(
                0.00001,
                this.audioContext.currentTime + stopTime
            );
        }
    }
}
