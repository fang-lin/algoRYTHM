import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/moxer.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/nord.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/ssms.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/theme/zenburn.css';
import random from 'lodash/random';

export const ThemeKeys = [
    '3024-day',
    '3024-night',
    'abcdef',
    'ambiance',
    'ayu-dark',
    'ayu-mirage',
    'base16-dark',
    'base16-light',
    'bespin',
    'blackboard',
    'cobalt',
    'colorforth',
    'darcula',
    'dracula',
    'duotone-dark',
    'duotone-light',
    'eclipse',
    'elegant',
    'erlang-dark',
    'gruvbox-dark',
    'hopscotch',
    'icecoder',
    'idea',
    'isotope',
    'lesser-dark',
    'liquibyte',
    'lucario',
    'material',
    'material-darker',
    'material-ocean',
    'material-palenight',
    'mbo',
    'mdn-like',
    'midnight',
    'monokai',
    'moxer',
    'neat',
    'neo',
    'night',
    'nord',
    'oceanic-next',
    'panda-syntax',
    'paraiso-dark',
    'paraiso-light',
    'pastel-on-dark',
    'railscasts',
    'rubyblue',
    'seti',
    'shadowfox',
    'solarized',
    'ssms',
    'the-matrix',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'ttcn',
    'twilight',
    'vibrant-ink',
    'xq-dark',
    'xq-light',
    'yeti',
    'yonce',
    'zenburn',
] as const;

export function getRandomThemeKey(): ThemeKey {
    return ThemeKeys[random(0, ThemeKeys.length - 1)];
}

export type ThemeKey = (typeof ThemeKeys)[number];

export interface Theme {
    backgroundColor: string;
    keywordColor: string;
    variableColor: string;
    defColor: string;
    operatorColor: string;
    numberColor: string;
    codeColor: string;
    themeKey: string;
}

export const defaultTheme: Theme = {
    backgroundColor: 'black',
    keywordColor: 'black',
    variableColor: 'black',
    defColor: 'black',
    operatorColor: 'black',
    numberColor: 'black',
    codeColor: 'black',
    themeKey: 'unknown',
};

export function queryTheme(element: HTMLDivElement, themeKey: ThemeKey): Theme {
    let {
        backgroundColor,
        keywordColor,
        variableColor,
        defColor,
        operatorColor,
        numberColor,
        codeColor,
    } = defaultTheme;

    const cmDom = element.querySelector('.CodeMirror');

    if (cmDom) {
        const exec = /rgb\([\d\s,]+\)/i.exec(getComputedStyle(cmDom).background);
        if (exec && exec[0]) backgroundColor = exec[0];
    }
    const cmKeywordDom = element.querySelector('.cm-keyword');
    if (cmKeywordDom) keywordColor = getComputedStyle(cmKeywordDom).color;
    const cmVariableDom = element.querySelector('.cm-variable');
    if (cmVariableDom) variableColor = getComputedStyle(cmVariableDom).color;
    const cmDefDom = element.querySelector('.cm-def');
    if (cmDefDom) defColor = getComputedStyle(cmDefDom).color;
    const cmOperatorDom = element.querySelector('.cm-operator');
    if (cmOperatorDom) operatorColor = getComputedStyle(cmOperatorDom).color;
    const cmNumberDom = element.querySelector('.cm-number');
    if (cmNumberDom) numberColor = getComputedStyle(cmNumberDom).color;
    const cmColorDom = element.querySelector('.CodeMirror-line ');
    if (cmColorDom) codeColor = getComputedStyle(cmColorDom).color;

    return {
        backgroundColor,
        keywordColor,
        variableColor,
        defColor,
        operatorColor,
        numberColor,
        codeColor,
        themeKey,
    };
}
