import {FunctionComponent, useEffect, useState, useRef} from 'react';
import Codemirror, {Editor} from 'codemirror';
import trim from 'lodash/trim';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import {CodeMirrorStyle, CodeWrapper, ThemeWrapper} from './styles';
import {queryTheme, Theme, ThemeKey} from '../Theme';

interface CodeAreaProps {
    code: string
    themeKey: ThemeKey;
    applyTheme: (theme: Theme) => void;
}

const CodeAreaFn: FunctionComponent<CodeAreaProps> = ({themeKey, code, applyTheme}) => {
    const codeRef = useRef<HTMLDivElement>(null);
    const themeRef = useRef<HTMLDivElement>(null);
    const [codeMirror, setCodeMirror] = useState<Editor>();
    const [themeMirror, setThemeMirror] = useState<Editor>();

    useEffect(() => {
        const codeDom = codeRef.current;
        const themeDom = themeRef.current;
        if (codeDom) {
            if (codeMirror) {
                codeMirror.setOption('theme', themeKey);
                codeMirror.setOption('value', trim(code));
            } else {
                const _codemirror_ = Codemirror(codeDom, {
                    value: trim(code),
                    mode: 'text/typescript',
                    theme: themeKey,
                    matchBrackets: true,
                    lineWrapping: true
                });
                _codemirror_.setSize('null', 'auto');
                setCodeMirror(_codemirror_);
            }
        }
        if (themeDom) {
            const value = 'function(a, b){ return const r = 0 + a + b; }';
            if (themeMirror) {
                themeMirror.setOption('theme', themeKey);
                themeMirror.setOption('value', value);
            } else {
                const _themeMirror_ = Codemirror(themeDom, {
                    value,
                    mode: 'javascript',
                    theme: themeKey,
                    lineWrapping: true,
                });
                _themeMirror_.setSize('null', 'auto');
                setThemeMirror(_themeMirror_);
            }
            applyTheme(queryTheme(themeDom, themeKey));
        }
    }, [applyTheme, themeKey, code, themeMirror, codeMirror]);

    return <>
        <CodeMirrorStyle/>
        <CodeWrapper ref={codeRef}/>
        <ThemeWrapper ref={themeRef}/>
    </>;
};

export default CodeAreaFn;