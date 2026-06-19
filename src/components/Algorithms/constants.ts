import {AlgorithmKey} from './codes';
import {ThemeKey} from '../Theme';

// Speed param keys (turtle '0' slowest … rabbit '2' fastest) and the ms-per-frame each maps to.
export const SpeedKey = ['0', '1', '2'] as const;
export type SpeedKeyType = (typeof SpeedKey)[number];
export const speedValue: Record<SpeedKeyType, number> = {'0': 1000, '1': 100, '2': 10};

export const AudioIsEnabledKey = ['0', '1'] as const;
export type AudioIsEnabledKeyType = (typeof AudioIsEnabledKey)[number];

// Fallbacks used by useTypedParams when a route param is missing or invalid.
export const defaultAlgorithmKey = AlgorithmKey.bubble;
export const defaultSpeedKey: SpeedKeyType = '1';
export const defaultAudioIsEnabledKey: AudioIsEnabledKeyType = '0';

export interface Params {
    themeKey: ThemeKey;
    algorithmKey: AlgorithmKey;
    speedKey: SpeedKeyType;
    audioIsEnabledKey: AudioIsEnabledKeyType;
}
