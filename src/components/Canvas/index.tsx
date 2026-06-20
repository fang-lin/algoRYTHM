import {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState} from 'react';
import {Theme} from '../Theme';
import {CanvasStage, CanvasWrapper} from './styles';
import {Executor} from '../Algorithms/codes';
import {AnimationPlayer, Size, AudioPlayer} from './functions';
import {AudioUnlock} from '../Algorithms';
import {useTypedParams} from '../../hooks/useTypedParams';
import {audioOn, deviceRatio} from '../../functions';

interface CanvasProps {
    theme: Theme;
    speed: number;
    shuffle: number;
    executor: Executor;
    setAudioUnlock: Dispatch<SetStateAction<AudioUnlock>>;
}

const Canvas: FunctionComponent<CanvasProps> = ({
    theme,
    speed,
    executor,
    shuffle,
    setAudioUnlock,
}) => {
    const {audioIsEnabledKey} = useTypedParams();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState<Size>([0, 0]);
    // Players are state, not refs, so the config effects below re-run once the
    // players are created in this mount effect. A ref would not re-trigger them —
    // keep the players in the effect deps.
    const [animationPlayer, setAnimationPlayer] = useState<AnimationPlayer>();

    useEffect(() => {
        let createdAnimationPlayer: AnimationPlayer | undefined;
        let createdAudioPlayer: AudioPlayer | undefined;
        if (canvasRef.current) {
            const {width, height} = canvasRef.current.getBoundingClientRect();
            setSize([width * deviceRatio, height * deviceRatio]);
            const canvasContext = canvasRef.current.getContext('2d');
            if (canvasContext) {
                createdAudioPlayer = new AudioPlayer();
                createdAnimationPlayer = new AnimationPlayer(canvasContext, createdAudioPlayer);

                createdAnimationPlayer.size = [width * deviceRatio, height * deviceRatio];

                setAnimationPlayer(createdAnimationPlayer);

                // Expose unlock() so PLAY / the music toggle can start audio from a
                // user gesture. Double arrow so useState stores the fn, not its result.
                const player = createdAudioPlayer;
                setAudioUnlock(() => () => player.unlock());
            }
        }
        return () => {
            createdAnimationPlayer?.destroy();
            createdAudioPlayer?.dispose();
            setAudioUnlock(null);
        };
    }, [setAudioUnlock]);

    useEffect(() => {
        if (animationPlayer) {
            animationPlayer.theme = theme;
        }
    }, [animationPlayer, theme]);

    useEffect(() => {
        if (animationPlayer) {
            animationPlayer.executor = executor;
        }
    }, [animationPlayer, executor]);

    useEffect(() => {
        if (animationPlayer) {
            animationPlayer.speed = speed;
        }
    }, [animationPlayer, speed]);

    useEffect(() => {
        if (animationPlayer) {
            animationPlayer.replay();
        }
    }, [animationPlayer, shuffle]);

    useEffect(() => {
        if (animationPlayer) {
            animationPlayer.audioPlayer.isEnabled = audioOn(audioIsEnabledKey);
        }
    }, [animationPlayer, audioIsEnabledKey]);

    return (
        <CanvasWrapper>
            <CanvasStage ref={canvasRef} width={size[0]} height={size[1]} />
        </CanvasWrapper>
    );
};

export default Canvas;
