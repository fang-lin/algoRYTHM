import {useParams} from 'react-router-dom';
import {
    AudioIsEnabledKey,
    defaultAlgorithmKey,
    defaultAudioIsEnabledKey,
    defaultSpeedKey,
    Params,
    SpeedKey,
} from '../components/Algorithms/constants';
import algorithms from '../components/Algorithms/codes';
import {ThemeKeys} from '../components/Theme';

export function useTypedParams(): Params {
    const raw = useParams();
    return {
        themeKey: ThemeKeys.includes(raw.themeKey as Params['themeKey'])
            ? (raw.themeKey as Params['themeKey'])
            : ThemeKeys[0],
        algorithmKey:
            raw.algorithmKey && raw.algorithmKey in algorithms
                ? (raw.algorithmKey as Params['algorithmKey'])
                : defaultAlgorithmKey,
        speedKey: ((SpeedKey as readonly string[]).includes(raw.speedKey ?? '')
            ? raw.speedKey
            : defaultSpeedKey) as Params['speedKey'],
        audioIsEnabledKey: ((AudioIsEnabledKey as readonly string[]).includes(
            raw.audioIsEnabledKey ?? ''
        )
            ? raw.audioIsEnabledKey
            : defaultAudioIsEnabledKey) as Params['audioIsEnabledKey'],
    };
}
