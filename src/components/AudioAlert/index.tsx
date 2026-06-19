import {Dispatch, FunctionComponent, SetStateAction, useContext} from 'react';
import {getRandomThemeKey, Theme} from '../Theme';
import {AudioAlterButton, AudioAlertBackground, CoinTossButton, Head3} from './styles';
import {useNavigate, NavLink} from 'react-router-dom';
import {AudioUnlockContext} from '../Algorithms';
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
    const audioUnlock = useContext(AudioUnlockContext);
    return audioUnlock ? (
        <AudioAlertBackground {...theme}>
            <AudioAlterButton
                onClick={() => {
                    // PLAY is a user gesture, so unlock the audio directly, then go to
                    // the audio-ON URL and dismiss the overlay.
                    audioUnlock();
                    navigate(
                        paramsToLink({
                            ...params,
                            audioIsEnabledKey: '1',
                        })
                    );
                    setFirstShowAudioAlert(false);
                }}
                {...theme}
            >
                <Music />
                PLAY
            </AudioAlterButton>
            <CoinTossButton {...theme}>
                <NavLink
                    to={paramsToLink({
                        ...params,
                        algorithmKey: getRandomAlgorithmKey(),
                        themeKey: getRandomThemeKey(),
                    })}
                >
                    <CoinToss />
                    Toss
                </NavLink>
            </CoinTossButton>
            <Head3 {...theme}>algoRYTHM {__APP_VERSION__}</Head3>
        </AudioAlertBackground>
    ) : null;
};

export default AudioAlert;
