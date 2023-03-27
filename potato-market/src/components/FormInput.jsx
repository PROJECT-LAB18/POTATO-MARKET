import { useState } from 'react';

import imageCompression from "browser-image-compression";

import styled from 'styled-components';

import defaultProfile from '@/assets/default_profile.png';
import { gray5, primaryColor } from '@/styles/Global';

export const FormInputImage = ({ profileUrl, setProfileUrl }) => {
  const [previewUrl, setPreviewUrl] = useState(
    profileUrl || defaultProfile
  );

  const handleFileInputChange = async (e) => {
    const uploadedImage = e.target.files[0];
    const options = { // 이미지 최적화 옵션
      maxSizeMB: 0.1, // 이미지 최대 용량
      maxWidthOrHeight: 100, // 최대 넓이/높이
      useWebWorker: true,
    };
    if (uploadedImage) {
      const compressedFile = await imageCompression(uploadedImage, options);
      const imageUrl = URL.createObjectURL(compressedFile);
      setPreviewUrl(imageUrl);
      setProfileUrl(compressedFile);
    }
  };

  return (
    <>
      <LabelText htmlFor="profileImage">프로필 사진</LabelText>
      <InputBox>
        <img
          alt="프로필 이미지사진 미리보기"
          className="profile-image-preview"
          src={previewUrl}
        />
        <input
          accept=".png, .jpg, .jpeg, .svg"
          id="profileImage"
          type="file"
          onChange={handleFileInputChange}
        />
      </InputBox>
    </>
  )
};

export const FormInputLocation = ({ setOpenPostcode, fullAddress }) => {

  const clickButton = () => {
    setOpenPostcode(current => !current);
  };

  return (
    <>
      <LabelText htmlFor="userLocation">주소</LabelText>
      <InputBox >
        <div className="loca" >
          <input readOnly id="userLocation" name="userLocation" type="text"
            value={fullAddress === 'undefined undefined undefined' ? '' : fullAddress}
            onClick={clickButton}
          />
          <Button type="button" onClick={clickButton}>검색</Button>
        </div>
        {/* <input id="userLocationDetail" name="userLocationDetail" placeholder="상세주소를 입력해주세요" type="text" /> */}
        <DescText>주소에 따라서 내 동네가 설정됩니다</DescText>
      </InputBox>
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
  input[type="file"] {
    width: 340px;
    &::file-selector-button {
      border: 1px solid ${primaryColor};
      color: ${primaryColor};
      font-weight: 600;
      cursor: pointer;
    }
  }
  button {
    width: 340px;
  }
  .profile-image-preview {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid ${gray5};
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
    input[type="file"],
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

export default FormInput;