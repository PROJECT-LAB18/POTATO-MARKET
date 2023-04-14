import styled from "styled-components";

import checkboxChecked from "@/assets/checkbox-checked.svg";
import checkbox from "@/assets/checkbox.svg";

import { primaryColor, gray5 } from "@/styles/Global";

const Label = styled.label`
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 12px 0;
  cursor: pointer;
  box-sizing: border-box;
`;

const LabelAll = styled(Label)`
  padding: 0 0 14px;
  align-items: start;
  i {
    margin-top: 4px;
  }
`;

const Terms = styled.div`
  display: flex;
  label {
    flex-grow: 1;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 12px 0;
    cursor: pointer;
    box-sizing: border-box;
  }
`;

const CheckBox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0px, 0px, 0px, 0px);
  overflow: hidden;
  box-sizing: border-box;
  padding: 0px;

  &:checked + i {
    background: url(${checkboxChecked}) no-repeat;
  }

  &:focus-visible + i {
    outline-offset: 1px;
    outline: 2px solid black;
  }

  & + i {
    flex-shrink: 0;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(${checkbox}) no-repeat;
    border-radius: 50%;
  }
`;

const Text = styled.span`
  padding: 0 8px;
  margin-right: auto;
`;

const TextAll = styled(Text)`
  flex-grow: 1;
  position: relative;
  font-size: 21px;
  line-height: 32px;
  font-weight: 700;

  span {
    display: block;
    margin-top: 4px;
    color: ${gray5};
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: -0.4px;
  }
`;

const DetailTermButton = styled.button`
  position: relative;
  min-width: 80px;
  background-color: #fff;
  border: 0;
  color: ${primaryColor};
  font-size: 14px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 6px;
    width: 5px;
    height: 5px;
    border: 1px solid ${primaryColor};
    border-width: 1px 1px 0 0;
    transform: rotate(45deg) translateY(-50%);
  }
`;

interface FormTermsInterface {
  id?: string;
  text?: string;
  all?: boolean;
  checked?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTerms: React.FC<FormTermsInterface> = ({ id, text, all, checked, onChange, value }) => {
  return (
    <>
      {all ? (
        <LabelAll htmlFor={id}>
          <CheckBox checked={checked} id={id} name={id} type="checkbox" onChange={onChange} />
          <i></i>
          <TextAll aria-labelledby={id}>
            전체 동의합니다.
            <span>
              선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.
            </span>
          </TextAll>
        </LabelAll>
      ) : (
        <Terms>
          <Label htmlFor={id}>
            <CheckBox
              checked={checked}
              id={id}
              name={id}
              type="checkbox"
              onChange={onChange}
              value={value}
            />
            <i></i>
            <Text aria-labelledby={id}>{text}</Text>
          </Label>
          <DetailTermButton type="button">약관보기</DetailTermButton>
        </Terms>
      )}
    </>
  );
};

export default FormTerms;
