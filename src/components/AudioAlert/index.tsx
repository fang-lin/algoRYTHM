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

// One-shot handler that cancels the music-toggle link's navigation (see PLAY onClick).
const suppressNavigation = (event: Event) => event.preventDefault();

const AudioAlert: FunctionComponent<AudioAlertProps> = ({theme, setFirstShowAudioAlert}) => {
    const params = useTypedParams();
    const navigate = useNavigate();
    const audioButton = useContext(AudioButtonContext);
    return audioButton ? (
        <AudioAlertBackground {...theme}>
            <AudioAlterButton
                onClick={() => {
                    // Clicking the music-toggle link fires the oscillator start()
                    // listeners (the audio unlock gesture). Suppress the link's own
                    // navigation (react-router's Link skips it when defaultPrevented)
                    // so we don't bounce through the audio-OFF URL; we navigate to
                    // the audio-ON URL ourselves, exactly once.
                    audioButton.addEventListener('click', suppressNavigation, {once: true});
                    audioButton.click();
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
