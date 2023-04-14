import styled, { css } from "styled-components";

import { primaryColor } from "./Global";

interface FormButtonInterface {
  primary?: boolean;
}

const FormButton = styled.button<FormButtonInterface>`
  display: block;
  width: 340px;
  height: 54px;
  margin: 12px auto 0;
  box-sizing: border-box;
  border-radius: 4px;
  line-height: 54px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  ${(props) =>
    (props.primary &&
      css`
        background-color: ${primaryColor};
        color: #fff;
        border: none;
      `) ||
    css`
      background-color: #fff;
      color: ${primaryColor};
      border: 1px solid ${primaryColor};
    `};
`;

export default FormButton;
