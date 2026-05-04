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
    }

    drawFrame(frame: Frame): void {
        if (this._size && this._theme) {
            const {keywordColor, variableColor, defColor} = this._theme;
            this.context.clearRect(0, 0, this._size[0], this._size[1]);
            frame.list.forEach((value, i) => {
                if (frame.swap?.includes(i)) {
                    this.context.fillStyle = rgba(keywordColor, 0.3);
                } else if (frame.comparing?.includes(i)) {
                    this.context.fillStyle = rgba(variableColor, 0.3);
                } else {
                    this.context.fillStyle = rgba(defColor);
                }
                if (this._size)
                    this.context.fillRect(
                        this.left + this.barGap / 2 + (this.barWidth + this.barGap) * i,
                        this._size[1] - this.barUnit * value,
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
        if (this._size) {
            this.barCount = (this._size[0] / (this.barWidth + this.barGap)) | 0;
            this.barUnit = (this._size[1] / this.barCount) | 0;
            this.left = (this._size[0] - this.barCount * (this.barWidth + this.barGap)) / 2;
        }
    }
}

class GainedOscillator {
    public oscillator: OscillatorNode;
    public readonly gain: GainNode;

    constructor(type: OscillatorType, audioContext: AudioContext, audioButton: HTMLAnchorElement) {
        this.oscillator = audioContext.createOscillator();
        this.gain = audioContext.createGain();

        this.oscillator.type = type;
        this.gain.connect(audioContext.destination);
        this.oscillator.connect(this.gain);
        this.gain.gain.setValueAtTime(0.0000001, audioContext.currentTime);
        audioButton.addEventListener(
            'click',
            () => {
                this.oscillator.start();
            },
            {once: true}
        );
    }
}

export class AudioPlayer {
    public isEnabled = false;
    private readonly audioContext: AudioContext;

    private readonly swapGainedOscillators: [GainedOscillator, GainedOscillator];
    private readonly comparingGainedOscillators: [GainedOscillator, GainedOscillator];

    constructor(audioButton: HTMLAnchorElement) {
        this.audioContext = new AudioContext();
        this.swapGainedOscillators = [
            new GainedOscillator('square', this.audioContext, audioButton),
            new GainedOscillator('square', this.audioContext, audioButton),
        ];
        this.comparingGainedOscillators = [
            new GainedOscillator('sine', this.audioContext, audioButton),
            new GainedOscillator('sine', this.audioContext, audioButton),
        ];
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
