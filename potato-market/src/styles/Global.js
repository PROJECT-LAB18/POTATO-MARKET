import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize'
import { reset } from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  body {
    font-family: 'Roboto', sans-serif;
  }
  .a11yHidden,
  legend {
    display: inline-block;
    overflow: hidden;
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
  }

  fieldset {
    padding: 0;
  }
  button {
    cursor: pointer;
  }
`;

export const primaryColor = "#CFA36E" // potato
export const gray8 = "#71747A" // superdeep
export const gray7 = "#868B94" // deepest
export const gray6 = "#ADB5BD" // deeper
export const gray5 = "#C4C4C4" // deep
export const gray4 = "#D1D3D8" // normal
export const gray3 = "#E9ECEF" // light
export const gray2 = "#F8F9FA" // lighter
export const gray1 = "#F2F3F6" // lightest

export default GlobalStyle;