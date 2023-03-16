import {useState} from 'react'

import styled from 'styled-components';

import { WriteInput } from "./WriteForm";

import { gray4, primaryColor } from "@/styles/global";

function AddPhoto({myinputRef}){
  const [, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [detailImages, setDetailImages] = useState([]); // 프리뷰 보여줄 이미지 데이터

  const uploadFile = (event) => {
    let fileArr = event.target.files; //  사용자가 선택한 파일들
    setPostImages(Array.from(fileArr));
    let fileURLs = [];
    let filesLength = fileArr.length > 5 ? 5 : fileArr.length;

    // 프리뷰
    for (let i = 0; i < filesLength; i++) {
      let file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setDetailImages([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    // 파일 여러개가 동시에 지워짐
    setPostImages([]);
    setDetailImages([]);
  }  

  return <Container>    
    <PhotoContainer>
      <WriteInput accept=".png, .jpeg, jpg" multiple={true} myinputRef={myinputRef} type="file"        
      onChange={uploadFile} onClick={(e)=>e.target.value = null}
      />
      {
        detailImages.map((url) => {
          return <ProductImage key={url}>
            <button type="button" onClick={removeImage}>
              <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" />
            </button>
            <img alt={url} src={url} />
          </ProductImage>
        })
      }
      <ProductImage/>
    </PhotoContainer>
    <PhotoUploadTitle>• 판매할 상품의 사진을 업로드해주세요.</PhotoUploadTitle>
  </Container>
}

const Container = styled.div`
  width: 886px;
  margin: 0 auto;
`

const PhotoUploadTitle = styled.span`
  display: inline-block;
  font-size: 12px;
  color: ${primaryColor};
  margin-bottom: 30px;
`

const PhotoContainer = styled.div`
  display: flex;
  gap 20px;
  padding: 10px 0;
  
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
  border: 1px dashed ${gray4};
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