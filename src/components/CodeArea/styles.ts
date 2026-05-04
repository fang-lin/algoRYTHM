import styled, {createGlobalStyle} from 'styled-components';

export const CodeMirrorStyle = createGlobalStyle`
    .CodeMirror {
      font-family: 'Source Code Pro', monospace;
      font-size: 14px !important;
      background-image: none !important;
      box-shadow: none !important;
    }
    
    .CodeMirror-line {
      line-height: 18px !important;
    }
`;

export const CodeWrapper = styled.div`
    .CodeMirror {
        background: transparent !important;
    }
`;

export const ThemeWrapper = styled.div`
    overflow: hidden;
    height: 0;
`;
