import algorithms, {AlgorithmKey} from './components/Algorithms/codes';
import random from 'lodash/random';
import {Params} from './components/Algorithms';

export function getRandomAlgorithmKey(): AlgorithmKey {
    const keys = Object.keys(algorithms);
    return keys[random(0, keys.length - 1)] as AlgorithmKey;
}

export function paramsToLink({
    themeKey,
    algorithmKey,
    speedKey,
    audioIsEnabledKey,
}: Params): string {
    return `/${themeKey}/${algorithmKey}/${speedKey}/${audioIsEnabledKey}`;
}

export const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();

export function rgba(color: string, alpha = 0.2): string {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
    }
    return color;
}
