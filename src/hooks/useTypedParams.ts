import {useParams} from 'react-router-dom';
import {Params} from '../components/Algorithms';
import algorithms from '../components/Algorithms/codes';
import {ThemeKeys} from '../components/Theme';

export function useTypedParams(): Params {
    const raw = useParams();
    return {
        themeKey: ThemeKeys.includes(raw.themeKey as Params['themeKey']) ? raw.themeKey as Params['themeKey'] : ThemeKeys[0],
        algorithmKey: (raw.algorithmKey && raw.algorithmKey in algorithms) ? raw.algorithmKey as Params['algorithmKey'] : 'bubble-sort' as Params['algorithmKey'],
        speedKey: (['0', '1', '2'].includes(raw.speedKey ?? '') ? raw.speedKey : '1') as Params['speedKey'],
        audioIsEnabledKey: (['0', '1'].includes(raw.audioIsEnabledKey ?? '') ? raw.audioIsEnabledKey : '0') as Params['audioIsEnabledKey'],
    };
}
