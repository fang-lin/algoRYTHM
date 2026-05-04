import {Dispatch, FunctionComponent, SetStateAction, useContext} from 'react';
import {getRandomThemeKey, Theme} from '../Theme';
import {AudioAlterButton, AudioAlertBackground, CoinTossButton, Head3} from './styles';
import {useNavigate, NavLink} from 'react-router-dom';
import {AudioButtonContext} from '../Algorithms';
import {useTypedParams} from '../../hooks/useTypedParams';
import Music from '../../icons/music.svg?react';
import CoinToss from '../../icons/coin-toss.svg?react';
import {getRandomAlgorithmKey, paramsToLink} from '../../functions';

interface AudioAlertProps {
    theme: Theme;
    setFirstShowAudioAlert: Dispatch<SetStateAction<boolean>>;
}

const AudioAlert: FunctionComponent<AudioAlertProps> = ({theme, setFirstShowAudioAlert}) => {
    const params = useTypedParams();
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
