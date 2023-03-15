import styled from 'styled-components';

import { WriteInput } from "./WriteForm";

import { gray4, primaryColor } from "@/styles/global";

function AddPhoto(){
  return <>
    <PhotoUploadTitle>• 판매할 상품의 사진을 업로드해주세요.</PhotoUploadTitle>
    <PhotoContainer>
      <WriteInput accept=".png, .jpeg, jpg" type="file" />
      <ProductImage>
        <button type="button">
          <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" />
        </button>
        <img alt="매물1" src="src/assets/logo.svg" />
      </ProductImage>
      <ProductImage>
        <button type="button">
          <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" />
        </button>
        <img alt="매물1" src="src/assets/logo.svg" />
      </ProductImage>
    </PhotoContainer>
  </>
}

const PhotoUploadTitle = styled.span`
  font-size: 12px;
  color: ${primaryColor};
`

const PhotoContainer = styled.div`
  display: flex;
  gap 20px;
  padding: 10px 0;
  margin-bottom: 20px;
  
  & label{
    display: inline-block;
    width: 90px;
    height: 90px;
    background: url('src/assets/icon-add-photo.svg') no-repeat;
    background-position: center;
    border: 1px solid ${gray4};
    border-radius: 10px;
    cursor: pointer;
  }
  
  input{
    display: none;
  }
  
  div{
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
`

const ProductImage = styled.div`
  background: ${gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  button{
    position: absolute;
    right: 0;
    top: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }

  img{
    width: 100%;
  }
`

export default AddPhoto;