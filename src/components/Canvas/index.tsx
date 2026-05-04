import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react';
import {Theme} from '../Theme';
import {CanvasStage, CanvasWrapper} from './styles';
import {Executor} from '../Algorithms/codes';
import {AnimationPlayer, Size, AudioPlayer} from './functions';
import {useParams} from 'react-router-dom';
import {AudioButtonContext, Params} from '../Algorithms';
import {deviceRatio} from '../../functions';

interface CanvasProps {
    theme: Theme;
    speed: number;
    shuffle: number;
    executor: Executor;
}

const Canvas: FunctionComponent<CanvasProps> = ({theme, speed, executor, shuffle}) => {
    const {audioIsEnabledKey} = useParams() as unknown as Params;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState<Size>([0, 0]);
    const [animationPlayer, setAnimationPlayer] = useState<AnimationPlayer>();
    const [autoPlayer, setAutoPlayer] = useState<AudioPlayer>();
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

                setAnimationPlayer(_animationPlayer);
                setAutoPlayer(_audioPlayer);
            }
        }
    }, [canvasRef, audioButton]);

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
        if (autoPlayer) {
            autoPlayer.isEnabled = !!parseInt(audioIsEnabledKey);
        }
    }, [autoPlayer, audioIsEnabledKey]);

    return <CanvasWrapper>
        <CanvasStage ref={canvasRef} width={size[0]} height={size[1]}/>
    </CanvasWrapper>;
};

export default Canvas;
