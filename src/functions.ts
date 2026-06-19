import algorithms, {AlgorithmKey} from './components/Algorithms/codes';
import random from 'lodash/random';
import {Params} from './components/Algorithms/constants';

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

export const deviceRatio = window.devicePixelRatio || 1;

// Parse the leading r,g,b out of an "rgb(...)" / "rgba(...)" string, or null if it doesn't match.
export function parseRgb(color: string): [string, string, string] | null {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return match ? [match[1], match[2], match[3]] : null;
}

export function rgba(color: string, alpha = 0.2): string {
    const rgb = parseRgb(color);
    return rgb ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})` : color;
}
