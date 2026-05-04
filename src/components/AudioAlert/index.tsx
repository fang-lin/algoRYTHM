import React, {Dispatch, FunctionComponent, SetStateAction, useContext} from 'react';
import {getRandomThemeKey, Theme} from '../Theme';
import {AudioAlterButton, AudioAlertBackground, CoinTossButton, Head3} from './styles';
import {useParams, useNavigate, NavLink} from 'react-router-dom';
import {AudioButtonContext, Params} from '../Algorithms';
import Music from '../../icons/music.svg?react';
import CoinToss from '../../icons/coin-toss.svg?react';
import {getRandomAlgorithmKey, paramsToLink} from '../../functions';
declare const __APP_VERSION__: string;

interface AudioAlertProps {
    theme: Theme;
    setFirstShowAudioAlert: Dispatch<SetStateAction<boolean>>;
}

const AudioAlert: FunctionComponent<AudioAlertProps> = ({theme, setFirstShowAudioAlert}) => {
    const params = useParams() as unknown as Params;
    const navigate = useNavigate();
    const audioButton = useContext(AudioButtonContext);
    return audioButton ? <AudioAlertBackground {...theme}>
        <AudioAlterButton onClick={() => {
            audioButton.click();
            navigate(paramsToLink({
                ...params,
                audioIsEnabledKey: '1'
            }));
            setFirstShowAudioAlert(false);
        }} {...theme}>
            <Music/>
            PLAY
        </AudioAlterButton>
        <CoinTossButton {...theme}>
            <NavLink to={paramsToLink({
                ...params,
                algorithmKey: getRandomAlgorithmKey(),
                themeKey: getRandomThemeKey(),
            })}>
                <CoinToss/>
                Toss
            </NavLink>
        </CoinTossButton>
        <Head3 {...theme}>algoRYTHM {__APP_VERSION__}</Head3>
    </AudioAlertBackground> : null;
};

export default AudioAlert;
