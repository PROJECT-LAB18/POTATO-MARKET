import styled, { css } from 'styled-components';

import { primaryColor } from '../styles/Global';

const FormButton = styled.button`
  display: block;
  width: 340px;
  height: 54px;
  margin-top: 12px;
  border-radius: 4px;
  line-height: 54px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  ${(props) =>
    props.primary &&
    css`
      background-color: ${primaryColor};
      color: #fff;
      border: none;
    ` || css`
      background-color: #fff;
      color: ${primaryColor};
      border: 1px solid ${primaryColor};
    `
  };
`;

export default FormButton;