import {FunctionComponent, useContext, useEffect, useRef, useState} from 'react';
import {Theme} from '../Theme';
import {CanvasStage, CanvasWrapper} from './styles';
import {Executor} from '../Algorithms/codes';
import {AnimationPlayer, Size, AudioPlayer} from './functions';
import {AudioButtonContext} from '../Algorithms';
import {useTypedParams} from '../../hooks/useTypedParams';
import {deviceRatio} from '../../functions';

interface CanvasProps {
    theme: Theme;
    speed: number;
    shuffle: number;
    executor: Executor;
}

const Canvas: FunctionComponent<CanvasProps> = ({theme, speed, executor, shuffle}) => {
    const {audioIsEnabledKey} = useTypedParams();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState<Size>([0, 0]);
    // Players are state, not refs, so the config effects below re-run once the
    // players are created async (only possible after the audio button arrives via
    // context). A ref would not re-trigger them — keep them in the effect deps.
    const [animationPlayer, setAnimationPlayer] = useState<AnimationPlayer>();
    const [audioPlayer, setAudioPlayer] = useState<AudioPlayer>();
    const audioButton = useContext(AudioButtonContext);

    useEffect(() => {
        let createdAnimationPlayer: AnimationPlayer | undefined;
        let createdAudioPlayer: AudioPlayer | undefined;
        if (canvasRef.current && audioButton) {
            const {width, height} = canvasRef.current.getBoundingClientRect();
            setSize([width * deviceRatio, height * deviceRatio]);
            const canvasContext = canvasRef.current.getContext('2d');
            if (canvasContext) {
                createdAudioPlayer = new AudioPlayer(audioButton);
                createdAnimationPlayer = new AnimationPlayer(canvasContext, createdAudioPlayer);

                createdAnimationPlayer.size = [width * deviceRatio, height * deviceRatio];

                setAnimationPlayer(createdAnimationPlayer);
                setAudioPlayer(createdAudioPlayer);
            }
        }
        return () => {
            createdAnimationPlayer?.destroy();
            createdAudioPlayer?.dispose();
        };
    }, [audioButton]);

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
        if (audioPlayer) {
            audioPlayer.isEnabled = !!parseInt(audioIsEnabledKey);
        }
    }, [audioPlayer, audioIsEnabledKey]);

    return (
        <CanvasWrapper>
            <CanvasStage ref={canvasRef} width={size[0]} height={size[1]} />
        </CanvasWrapper>
    );
};

export default Canvas;
