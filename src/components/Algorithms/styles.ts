import styled, {createGlobalStyle} from 'styled-components';
import {Theme} from '../Theme';

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`, // same as desktop — kept for API compat
};

export const GlobalStyle = createGlobalStyle<Theme>`
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: 'Source Code Pro', monospace;
  }

  html {
    background: ${({backgroundColor}) => backgroundColor};
    transition: background 1s;
  }

  #root {
    min-height: 100vh;
  }
`;

export const Head1 = styled.h1<Theme>`
    margin: 0;
    font-size: 108px;
    color: ${({operatorColor}) => operatorColor};
    opacity: 0.3;
    position: fixed;
    top: -22px;
    left: -5px;
    right: 0;
    z-index: -1;
    word-wrap: break-word;
`;

export const Head2 = styled.h2<Theme>`
    margin: 0 0 30px 0;
    font-size: 42px;
    color: ${({variableColor}) => variableColor};

    sup {
        font-size: 12px;
        font-weight: normal;
        top: -24px;
        color: ${({codeColor}) => codeColor};

        span {
            font-weight: bold;
            font-size: 18px;
            color: ${({defColor}) => defColor};
            text-transform: uppercase;
        }
    }
`;

export const Wrapper = styled.section<{firstShowAudioAlert: boolean}>`
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;

    ${({firstShowAudioAlert}) =>
        firstShowAudioAlert
            ? `height: 100vh;
         overflow: hidden;`
            : 'min-height: 100vh;'}
`;

export const AlgorithmsWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 0 30px 0;
    flex-direction: column;
    @media ${device.laptop} {
        flex-direction: row;
        padding: 30px 0;
    }
`;

export const CodeAreaWrapper = styled.div`
    flex: 1;
    order: 1;
    margin: 30px 0;
    @media ${device.laptop} {
        order: unset;
        margin: 0;
    }
`;

export const MenuWrapper = styled.div`
    order: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @media ${device.laptop} {
        order: unset;
        margin: 0 30px;
        flex-direction: column;
        align-items: flex-end;
        justify-content: start;
    }
`;

export const ThemeBarWrapper = styled.div`
    order: 2;
    @media ${device.laptop} {
        order: unset;
    }
`;
