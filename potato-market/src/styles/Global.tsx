import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  html{
    scroll-behavior: smooth;
  }
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  ::selection {
    background: #CFA36E;
    color: #fff;
  }
  ::-moz-selection {
    background: #CFA36E;
    color: #fff;
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

export const primaryColor: string = "#CFA36E"; // potato
export const gray8: string = "#71747A"; // superdeep
export const gray7: string = "#868B94"; // deepest
export const gray6: string = "#ADB5BD"; // deeper
export const gray5: string = "#C4C4C4"; // deep
export const gray4: string = "#D1D3D8"; // normal
export const gray3: string = "#E9ECEF"; // light
export const gray2: string = "#F8F9FA"; // lighter
export const gray1: string = "#F2F3F6"; // lightest

export default GlobalStyle;
