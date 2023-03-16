import {useState} from 'react'

import styled from 'styled-components';

import { WriteInput } from "./WriteForm";

import { gray4, primaryColor } from "@/styles/global";

function AddPhoto(){
  const [state, setState] = useState({
    uploadImageFile: null,
    uploadImageUrl: null,    
  })  

  const setImageFromFile = ({ file, setImageUrl }) => {
    let reader = new FileReader();
    reader.onload = function () {
      setImageUrl({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setState({
      uploadImageFile: null,
      uploadImageUrl: null,  
    })
  }
  

  return <Container>    
    <PhotoContainer>
      <WriteInput accept=".png, .jpeg, jpg"  multiple={true} type="file"
        onChange={
          ({ target: { files } }) => {
            if (files.length) {
              setImageFromFile({
                file: files[0],
                setImageUrl: ({ result }) => setState({
                  uploadImageFile: files[0], uploadImageUrl: result
                })
              });
            }
          }
        }
      />
      { state.uploadImageFile ? (
        <>
          <ProductImage>
            <button type="button" onClick={removeImage}>
              <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" />
            </button>
            <img alt={state.uploadImageFile} src={state.uploadImageUrl} />
          </ProductImage>
          <ProductImage />
        </>
      ):<ProductImage />}
      
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