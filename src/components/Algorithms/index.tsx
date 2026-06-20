import {createContext, FunctionComponent, useEffect, useState} from 'react';
import algorithms from './codes';
import CodeArea from '../CodeArea';
import CanvasTarget from '../Canvas';
import {defaultTheme, Theme} from '../Theme';
import {
    GlobalStyle,
    Wrapper,
    Head2,
    MenuWrapper,
    AlgorithmsWrapper,
    CodeAreaWrapper,
    ThemeBarWrapper,
    Head1,
} from './styles';
import Menu from '../Menu';
import Footer from '../Footer';
import ThemeBar from '../Theme';
import SettingBar from '../SettingBar';
import AudioAlert from '../AudioAlert';
import {useNavigate} from 'react-router-dom';
import {useTypedParams} from '../../hooks/useTypedParams';
import {speedValue} from './constants';
import {audioOn, paramsToLink} from '../../functions';

export type AudioUnlock = (() => void) | null;
export const AudioUnlockContext = createContext<AudioUnlock>(null);

// Module-level: resets only on a full page load, not on in-app navigation. Used so
// the audio-off -> audio-on redirect happens once per refresh, never when the user
// toggles sound off mid-session.
let audioRedirectedThisLoad = false;

const Algorithms: FunctionComponent = () => {
    // useTypedParams guarantees every param is valid (it coerces to a default
    // otherwise), so the route always resolves to a real algorithm — no guard needed.
    const params = useTypedParams();
    const {themeKey, algorithmKey, speedKey, audioIsEnabledKey} = params;
    const navigate = useNavigate();
    const [theme, applyTheme] = useState<Theme>(defaultTheme);
    const [shuffle, triggerShuffle] = useState<number>(0);
    // A fresh load always lands on the audio-on URL (the effect below redirects /0 to
    // /1), so the PLAY gate shows on every load and nothing auto-plays until clicked.
    const [firstShowAudioAlert, setFirstShowAudioAlert] = useState<boolean>(true);
    const [audioUnlock, setAudioUnlock] = useState<AudioUnlock>(null);

    // Refreshing an audio-off URL (.../0) redirects to the audio-on URL (.../1) so the
    // PLAY gate always shows. Only the first load after a refresh redirects; toggling
    // sound off mid-session stays on /0.
    useEffect(() => {
        if (!audioRedirectedThisLoad) {
            audioRedirectedThisLoad = true;
            if (!audioOn(audioIsEnabledKey)) {
                navigate(paramsToLink({...params, audioIsEnabledKey: '1'}), {replace: true});
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {name, code, executor} = algorithms[algorithmKey];
    return (
        <AudioUnlockContext.Provider value={audioUnlock}>
            <CanvasTarget
                {...{theme, speed: speedValue[speedKey], executor, shuffle, setAudioUnlock}}
            />
            <Head1 {...theme}>algoRYTHM</Head1>
            <Wrapper {...{firstShowAudioAlert}}>
                <AlgorithmsWrapper>
                    <GlobalStyle {...theme} />
                    <CodeAreaWrapper>
                        <Head2 {...theme}>
                            {' '}
                            {name}
                            <sup>
                                {' '}
                                with <span>{themeKey}</span>
                            </sup>
                        </Head2>
                        <CodeArea {...{themeKey, code, applyTheme}} />
                    </CodeAreaWrapper>
                    <MenuWrapper>
                        <Menu {...theme} />
                        <SettingBar {...{theme, triggerShuffle}} />
                    </MenuWrapper>
                    <ThemeBarWrapper>
                        <ThemeBar {...theme} />
                    </ThemeBarWrapper>
                </AlgorithmsWrapper>
                <Footer {...theme} />
            </Wrapper>
            {firstShowAudioAlert && <AudioAlert {...{theme, setFirstShowAudioAlert}} />}
        </AudioUnlockContext.Provider>
    );
};

export default Algorithms;
