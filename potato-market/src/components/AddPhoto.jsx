import { useEffect } from "react";

import imageCompression from "browser-image-compression";
import styled from 'styled-components';

import addIcon from "@/assets/icon-add-photo.svg"

import { WriteInput } from "./WriteForm";

import { gray4, primaryColor } from "@/styles/global";

function AddPhoto({myinputRef, name, required, postImg, setPostImg, previewImg, setPreviewImg}){

  const uploadFile = async (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    const options = {
      maxSizeMB: 0.5, // 이미지 최대 용량
      maxWidthOrHeight: 1920, // 최대 넓이/높이
      useWebWorker: true,
    };
    let filesLength = files.length > 5 ? 5 : files.length;
    for (let i = 0; i < filesLength; i++) {
      const file = files[i];
      try {
        const compressedFile = await imageCompression(file, options);
        uploadedImages.push(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
    setPostImg(uploadedImages);
  };
  useEffect(() => {
    const postImageUrl = postImg.map((file) => imageCompression.getDataUrlFromFile(file));
    Promise.all(postImageUrl).then((results) => {
      setPreviewImg(results);
    });
  }, [postImg]);

  const removeImage = (index) => {
    const newPostImg = [...postImg];
    newPostImg.splice(index, 1);
    setPostImg(newPostImg);

    const newPreviewImg = [...previewImg];
    newPreviewImg.splice(index, 1);
    setPreviewImg(newPreviewImg);
  }

  return <Container>    
    <PhotoContainer>
      <WriteInput accept=".png, .jpeg, .jpg, .svg" multiple={true} myinputRef={myinputRef} name={name} required={required} type="file"
      onChange={uploadFile} onClick={(e)=>e.target.value = null}
      />
      {
        previewImg.map((url, index) => {
          return <ProductImage key={url}>
            <button type="button" onClick={()=>removeImage(index)}>
              <img alt="업로드 이미지 제거" src="@/assets/icon-close-button.svg" />
            </button>
            <img alt={url} src={url} />
          </ProductImage>
        })
      }
      {previewImg.length>=5 ? '' : <ProductImage/>}
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
  gap: 20px;
  padding: 10px 0;
  
  & label{
    display: inline-block;
    width: 90px;
    height: 90px;
    background: url(${addIcon}) no-repeat;
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
  overflow: hidden;

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