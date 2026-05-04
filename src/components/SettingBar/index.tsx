import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import Rabbit from '../../icons/rabbit.svg?react';
import Turtle from '../../icons/turtle.svg?react';
import Bear from '../../icons/bear.svg?react';
import {Raw, Item, OperationBarWrapper} from './styles';
import {getRandomThemeKey, Theme} from '../Theme';
import {NavLink, useParams} from 'react-router-dom';
import {AudioButtonElement, Params} from '../Algorithms';
import Shuffle from '../../icons/shuffle.svg?react';
import MusicOff from '../../icons/music-off.svg?react';
import MusicOn from '../../icons/music-on.svg?react';
import Palette from '../../icons/palette.svg?react';
import {paramsToLink} from '../../functions';
import {SpeedKey} from '../Algorithms';

interface SpeedBarProps {
    theme: Theme;
    triggerShuffle: Dispatch<SetStateAction<number>>;
    setAudioButton: Dispatch<SetStateAction<AudioButtonElement>>;
}

const SettingBar: FunctionComponent<SpeedBarProps> = ({theme, triggerShuffle, setAudioButton}) => {
    const params = useParams() as unknown as Params;
    const audioButton = useRef<HTMLAnchorElement>(null);
    const audioIsEnabledKey = params.audioIsEnabledKey === '1' ? '0' : '1';

    useEffect(() => {
        setAudioButton(audioButton.current);
    }, [setAudioButton]);

    return <OperationBarWrapper>
        <Raw>
            {
                [Turtle, Bear, Rabbit].map((Icon, index) => {
                    const speedKey =  index.toString() as typeof SpeedKey[number];
                    return <Item {...theme} key={index}>
                        <NavLink to={paramsToLink({...params, speedKey})}><Icon/></NavLink>
                    </Item>;
                })}
        </Raw>
        <Raw>
            <Item  {...theme}>
                <NavLink
                    ref={audioButton}
                    to={paramsToLink({
                        ...params,
                        audioIsEnabledKey
                    })}
                >{params.audioIsEnabledKey === '1' ? <MusicOff/> : <MusicOn/>}</NavLink>
            </Item>
            <Item onClick={({timeStamp}) => triggerShuffle(timeStamp)} {...theme}><a><Shuffle/></a></Item>
            <Item  {...theme}>
                <NavLink to={paramsToLink({
                    ...params,
                    themeKey: getRandomThemeKey()
                })}><Palette/></NavLink>
            </Item>
        </Raw>
    </OperationBarWrapper>;
};

export default SettingBar;
