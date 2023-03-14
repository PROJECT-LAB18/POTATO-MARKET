import styled from 'styled-components';

import { gray8 } from '../styles/Global';

const InputText = styled.input`
  box-sizing: border-box;
  width: 340px;
  height: 44px;
  padding: 9px 20px;
  border: 1px solid ${gray8};
  border-radius: 4px;
`

const FormInput = ({ id, type, placeholder, text }) => {
  return (
    <>
      <label className="a11yHidden" htmlFor={id}>{text}</label>
      <InputText
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
      />
    </>
  )
};

export default FormInput;