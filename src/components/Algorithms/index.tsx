import {createContext, FunctionComponent, useState} from 'react';
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
import {useTypedParams} from '../../hooks/useTypedParams';
import {speedValue} from './constants';

export type AudioButtonElement = HTMLAnchorElement | null;
export const AudioButtonContext = createContext<AudioButtonElement>(null);

const Algorithms: FunctionComponent = () => {
    // useTypedParams guarantees every param is valid (it coerces to a default
    // otherwise), so the route always resolves to a real algorithm — no guard needed.
    const {themeKey, algorithmKey, speedKey, audioIsEnabledKey} = useTypedParams();
    const [theme, applyTheme] = useState<Theme>(defaultTheme);
    const [shuffle, triggerShuffle] = useState<number>(0);
    const [firstShowAudioAlert, setFirstShowAudioAlert] = useState<boolean>(
        audioIsEnabledKey === '1'
    );
    const [audioButton, setAudioButton] = useState<AudioButtonElement>(null);

    const {name, code, executor} = algorithms[algorithmKey];
    return (
        <AudioButtonContext.Provider value={audioButton}>
            <CanvasTarget {...{theme, speed: speedValue[speedKey], executor, shuffle}} />
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
                        <SettingBar {...{theme, triggerShuffle, setAudioButton}} />
                    </MenuWrapper>
                    <ThemeBarWrapper>
                        <ThemeBar {...theme} />
                    </ThemeBarWrapper>
                </AlgorithmsWrapper>
                <Footer {...theme} />
            </Wrapper>
            {firstShowAudioAlert && <AudioAlert {...{theme, setFirstShowAudioAlert}} />}
        </AudioButtonContext.Provider>
    );
};

export default Algorithms;
