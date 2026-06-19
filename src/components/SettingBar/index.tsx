import {Dispatch, FunctionComponent, SetStateAction, useContext} from 'react';
import Rabbit from '../../icons/rabbit.svg?react';
import Turtle from '../../icons/turtle.svg?react';
import Bear from '../../icons/bear.svg?react';
import {Raw, Item, OperationBarWrapper} from './styles';
import {getRandomThemeKey, Theme} from '../Theme';
import {NavLink} from 'react-router-dom';
import {AudioUnlockContext} from '../Algorithms';
import {useTypedParams} from '../../hooks/useTypedParams';
import Shuffle from '../../icons/shuffle.svg?react';
import MusicOff from '../../icons/music-off.svg?react';
import MusicOn from '../../icons/music-on.svg?react';
import Palette from '../../icons/palette.svg?react';
import {audioOn, paramsToLink, toggleAudioKey} from '../../functions';
import {SpeedKey} from '../Algorithms/constants';

interface SpeedBarProps {
    theme: Theme;
    triggerShuffle: Dispatch<SetStateAction<number>>;
}

const SettingBar: FunctionComponent<SpeedBarProps> = ({theme, triggerShuffle}) => {
    const params = useTypedParams();
    const audioUnlock = useContext(AudioUnlockContext);
    const audioIsEnabledKey = toggleAudioKey(params.audioIsEnabledKey);

    return (
        <OperationBarWrapper>
            <Raw>
                {[Turtle, Bear, Rabbit].map((Icon, index) => {
                    const speedKey = index.toString() as (typeof SpeedKey)[number];
                    return (
                        <Item {...theme} key={index}>
                            <NavLink to={paramsToLink({...params, speedKey})}>
                                <Icon />
                            </NavLink>
                        </Item>
                    );
                })}
            </Raw>
            <Raw>
                <Item {...theme}>
                    <NavLink
                        onClick={() => audioUnlock?.()}
                        to={paramsToLink({
                            ...params,
                            audioIsEnabledKey,
                        })}
                    >
                        {audioOn(params.audioIsEnabledKey) ? <MusicOff /> : <MusicOn />}
                    </NavLink>
                </Item>
                <Item onClick={({timeStamp}) => triggerShuffle(timeStamp)} {...theme}>
                    <button type="button">
                        <Shuffle />
                    </button>
                </Item>
                <Item {...theme}>
                    <NavLink
                        to={paramsToLink({
                            ...params,
                            themeKey: getRandomThemeKey(),
                        })}
                    >
                        <Palette />
                    </NavLink>
                </Item>
            </Raw>
        </OperationBarWrapper>
    );
};

export default SettingBar;
