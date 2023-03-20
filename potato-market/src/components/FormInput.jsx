import styled from 'styled-components';

import { gray5, primaryColor } from '../styles/Global';

const LabelText = styled.label`
  display: inline-block;
  flex-shrink: 0;
  width: 139px;
  font-weight: 700;
  line-height: 44px;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 493px;

  input[type="text"],
  input[type="password"],
  input[type="tel"],
  input[type="email"],
  input[type="file"]::file-selector-button {
    width: 340px;
    height: 44px;
    padding: 9px 20px;
    background-color: #fff;
    border: 1px solid ${gray5};
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type="file"]::file-selector-button {
    border: 1px solid ${primaryColor};
    color: ${primaryColor};
    font-weight: 600;
  }
  button {
    width: 340px;
  }
  .loca {
    display: flex;
    button {
      width: 147px;
      margin-left: 8px;
    }
  }
  @media screen and (max-width: 700px) {
    width: 100%;
    max-width: none;
    input[type="text"],
    input[type="password"],
    input[type="tel"],
    input[type="email"],
    input[type="file"]::file-selector-button,
    button {
      width: 100%;
    }
  }
`;

const DescText = styled.p`
  margin-top: 4px;
  font-size: 14px;
  line-height: 19px;
`;

const VaildNotice = styled(DescText)`
  color: #da3a06;
`;

const Button = styled.button`
  flex: 1 0 auto;
  width: 143px;
  height: 44px;
  background-color: #fff;
  border: 1px solid ${primaryColor};
  border-radius: 4px;
  font-weight: 700;
  color: ${primaryColor};
  @media screen and (max-width: 700px) {
    width: 100%;
    max-width: 340px;
    max-width: none;
  }
`;

export const FormInputImage = () => {
  return (
    <>
      <LabelText htmlFor="userProfileImage">프로필 사진</LabelText>
      <InputBox>
        <input accept=".png, .jpg, .jpeg, .svg" id="userProfileImage" type="file" />
      </InputBox>
    </>
  )
};

export const FormInputLocation = ({ process }) => {
  return (
    <>
      <LabelText htmlFor="userLocation">주소</LabelText>
      {process === "search" &&
        <InputBox>
          <Button type="button">주소 검색</Button>
          <DescText>주소에 따라서 내 동네가 설정됩니다</DescText>
        </InputBox>
      }
      {process === "detail" &&
        <InputBox>
          <div className="loca">
            <input readOnly id="userLocation" name="userLocation" type="text" value="경기도 용인시 기흥구 기흥1로" />
            <Button type="button">재검색</Button>
          </div>
          <input id="userLocationDetail" name="userLocationDetail" placeholder="상세주소를 입력해주세요" type="text" />
          <DescText>주소에 따라서 내 동네가 설정됩니다</DescText>
        </InputBox>
      }
    </>
  )
};

const FormInput = ({ id, type, onChange, value, placeholder, text, desc, valid, label, button }) => {
  return (
    <>
      {label
        ? <LabelText htmlFor={id}>{text}</LabelText>
        : <label className="a11yHidden" htmlFor={id}>{text}</label>
      }
      <InputBox>
        <input id={id} name={id} placeholder={placeholder} type={type} value={value} onChange={onChange} />
        {desc &&
          <DescText>{desc}</DescText>
        }
        {valid &&
          <VaildNotice>{valid}</VaildNotice>
        }
      </InputBox>
      {button &&
        <Button type="button">{button}</Button>
      }
    </>
  )
};

export default FormInput;