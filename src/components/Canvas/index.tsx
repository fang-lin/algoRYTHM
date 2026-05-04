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
    const animationPlayerRef = useRef<AnimationPlayer>();
    const audioPlayerRef = useRef<AudioPlayer>();
    const audioButton = useContext(AudioButtonContext);

    useEffect(() => {
        if (canvasRef.current && audioButton) {
            const {width, height} = canvasRef.current.getBoundingClientRect();
            setSize([width * deviceRatio, height * deviceRatio]);
            const canvasContext = canvasRef.current.getContext('2d');
            if (canvasContext) {
                const _audioPlayer = new AudioPlayer(audioButton);
                const _animationPlayer = new AnimationPlayer(canvasContext, _audioPlayer);

                _animationPlayer.size = [width * deviceRatio, height * deviceRatio];

                animationPlayerRef.current = _animationPlayer;
                audioPlayerRef.current = _audioPlayer;
            }
        }
        return () => {
            animationPlayerRef.current?.destroy();
            audioPlayerRef.current?.dispose();
        };
    }, [audioButton]);

    useEffect(() => {
        if (animationPlayerRef.current) {
            animationPlayerRef.current.theme = theme;
        }
    }, [theme]);

    useEffect(() => {
        if (animationPlayerRef.current) {
            animationPlayerRef.current.executor = executor;
        }
    }, [executor]);

    useEffect(() => {
        if (animationPlayerRef.current) {
            animationPlayerRef.current.speed = speed;
        }
    }, [speed]);

    useEffect(() => {
        if (animationPlayerRef.current) {
            animationPlayerRef.current.replay();
        }
    }, [shuffle]);

    useEffect(() => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.isEnabled = !!parseInt(audioIsEnabledKey);
        }
    }, [audioIsEnabledKey]);

    return <CanvasWrapper>
        <CanvasStage ref={canvasRef} width={size[0]} height={size[1]}/>
    </CanvasWrapper>;
};

export default Canvas;
