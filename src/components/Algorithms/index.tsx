import {createContext, FunctionComponent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import algorithms, {AlgorithmKey} from './codes';
import CodeArea from '../CodeArea';
import CanvasTarget from '../Canvas';
import {defaultTheme, Theme, ThemeKey, ThemeKeys} from '../Theme';
import {
    GlobalStyle,
    Wrapper,
    Head2,
    MenuWrapper,
    AlgorithmsWrapper,
    CodeAreaWrapper,
    ThemeBarWrapper, Head1,
} from './styles';
import Menu from '../Menu';
import Footer from '../Footer';
import ThemeBar from '../Theme';
import SettingBar from '../SettingBar';
import AudioAlert from '../AudioAlert';
import {useTypedParams} from '../../hooks/useTypedParams';

function validParams({themeKey, algorithmKey, speedKey, audioIsEnabledKey}: Params): boolean {
    return algorithms[algorithmKey] && ThemeKeys.includes(themeKey) && validSpeedKey(speedKey) && AudioIsEnabledKey.includes(audioIsEnabledKey);
}

function validSpeedKey(speedKey: string): boolean {
    return SpeedValue[parseInt(speedKey)] !== undefined;
}

export type AudioButtonElement = HTMLAnchorElement | null;
export const AudioButtonContext = createContext<AudioButtonElement>(null);

const Algorithms: FunctionComponent = () => {
    const params = useTypedParams();
    const {themeKey, algorithmKey, speedKey, audioIsEnabledKey} = params;
    const navigate = useNavigate();
    const [theme, applyTheme] = useState<Theme>(defaultTheme);
    const [shuffle, triggerShuffle] = useState<number>(0);
    const [firstShowAudioAlert, setFirstShowAudioAlert] = useState<boolean>(audioIsEnabledKey === '1');
    const [audioButton, setAudioButton] = useState<AudioButtonElement>(null);

    useEffect(() => {
        if (!validParams(params))
            navigate('/');
    }, [params, navigate]);

    if (validParams(params)) {
        const {name, code, executor} = algorithms[algorithmKey];
        return <AudioButtonContext.Provider value={audioButton}>
            <CanvasTarget {...{theme, speed: SpeedValue[parseInt(speedKey)], executor, shuffle}}/>
            <Head1 {...theme}>algoRYTHM</Head1>
            <Wrapper {...{firstShowAudioAlert}}>
                <AlgorithmsWrapper>
                    <GlobalStyle {...theme}/>
                    <CodeAreaWrapper>
                        <Head2 {...theme}> {name}<sup> with <span>{themeKey}</span></sup></Head2>
                        <CodeArea {...{themeKey, code, applyTheme}}/>
                    </CodeAreaWrapper>
                    <MenuWrapper>
                        <Menu {...theme}/>
                        <SettingBar {...{theme, triggerShuffle, setAudioButton}}/>
                    </MenuWrapper>
                    <ThemeBarWrapper>
                        <ThemeBar {...theme}/>
                    </ThemeBarWrapper>
                </AlgorithmsWrapper>
                <Footer {...theme}/>
            </Wrapper>
            {firstShowAudioAlert && <AudioAlert {...{theme, setFirstShowAudioAlert}}/>}
        </AudioButtonContext.Provider>;
    }
    return null;
};

export default Algorithms;

export const SpeedKey = ['2', '1', '0'] as const;
const SpeedValue = [1000, 100, 10] as const;
const AudioIsEnabledKey = ['1', '0'] as const;

export interface Params {
    themeKey: ThemeKey;
    algorithmKey: AlgorithmKey;
    speedKey: typeof SpeedKey[number];
    audioIsEnabledKey: typeof AudioIsEnabledKey[number]
}
