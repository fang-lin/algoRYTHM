import SourceCodeProItalicGreek from './source_code_pro/SourceCodeProItalicGreek.woff2';
import SourceCodeProItalicLatinExt from './source_code_pro/SourceCodeProItalicLatinExt.woff2';
import SourceCodeProItalicLatin from './source_code_pro/SourceCodeProItalicLatin.woff2';
import SourceCodeProRegularGreek from './source_code_pro/SourceCodeProRegularGreek.woff2';
import SourceCodeProRegularLatinExt from './source_code_pro/SourceCodeProRegularLatinExt.woff2';
import SourceCodeProRegularLatin from './source_code_pro/SourceCodeProRegularLatin.woff2';
import SourceCodeProBoldGreek from './source_code_pro/SourceCodeProBoldGreek.woff2';
import SourceCodeProBoldLatinExt from './source_code_pro/SourceCodeProBoldLatinExt.woff2';
import SourceCodeProBoldLatin from './source_code_pro/SourceCodeProBoldLatin.woff2';

const fonts = `
@font-face {
  font-family: 'Source Code Pro';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Source Code Pro Italic'), local('SourceCodePro-It'), url(${SourceCodeProItalicGreek}) format('woff2');
  unicode-range: U+0370-03FF;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Source Code Pro Italic'), local('SourceCodePro-It'), url(${SourceCodeProItalicLatinExt}) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Source Code Pro Italic'), local('SourceCodePro-It'), url(${SourceCodeProItalicLatin}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Source Code Pro Regular'), local('SourceCodePro-Regular'), url(${SourceCodeProRegularGreek}) format('woff2');
  unicode-range: U+0370-03FF;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Source Code Pro Regular'), local('SourceCodePro-Regular'), url(${SourceCodeProRegularLatinExt}) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Source Code Pro Regular'), local('SourceCodePro-Regular'), url(${SourceCodeProRegularLatin}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Source Code Pro Bold'), local('SourceCodePro-Bold'), url(${SourceCodeProBoldGreek}) format('woff2');
  unicode-range: U+0370-03FF;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Source Code Pro Bold'), local('SourceCodePro-Bold'), url(${SourceCodeProBoldLatinExt}) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Source Code Pro Bold'), local('SourceCodePro-Bold'), url(${SourceCodeProBoldLatin}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`;

export default function injectFonts(): void {
    const style = document.createElement('style');
    style.textContent = fonts;
    document.head.append(style);
}
