import { useEffect } from "react";

import imageCompression from "browser-image-compression";
import styled from 'styled-components';

import { WriteInput } from "./WriteForm";

import addIcon from "../assets/icon-add-photo.svg"
import closeButton from "../assets/icon-close-button.svg"

import { gray4, primaryColor } from "../styles/Global";

interface IAddPhoto {
  myinputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement> | null | undefined;
  name: string;
  required: boolean;
  postImg: File[];
  setPostImg: React.Dispatch<React.SetStateAction<File[]>>;
  previewImg: string[];
  setPreviewImg: React.Dispatch<React.SetStateAction<string[]>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function AddPhoto({myinputRef, name, required, postImg, setPostImg, previewImg, setPreviewImg}: IAddPhoto): JSX.Element{

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target as HTMLInputElement;
    const files: FileList =  input.files!;
    const uploadedImages: File[]= [];
    const options = {
      maxSizeMB: 0.5, // 이미지 최대 용량
      maxWidthOrHeight: 1024, // 최대 넓이/높이
      useWebWorker: true,
    };

    let filesLength: number = files!==null ? files.length > 5 ? 5 : files.length : 0;

    for (let i = 0; i < filesLength; i++) {
      if(files!==null){
        const file: File = files[i];
        try {
          const compressedFile: File = await imageCompression(file, options);
          uploadedImages.push(compressedFile);
        } catch (error) {
          console.log(error);
        }
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

  const removeImage = (index: number) => {
    const newPostImg = [...postImg];
    newPostImg.splice(index, 1);
    setPostImg(newPostImg);

    const newPreviewImg = [...previewImg];
    newPreviewImg.splice(index, 1);
    setPreviewImg(newPreviewImg);
  }

  return <Container>    
    <PhotoContainer className="photoContainer">
      <WriteInput accept=".png, .jpeg, .jpg, .svg" id="addPhoto" label="중고 물품 등록" multiple={true} myinputRef={myinputRef} name={name} required={required} type="file"
      onChange={uploadFile} />
      {
        previewImg.map((url:string, index): JSX.Element => {
          return <div key={url} className="uploadImageList">
            <ProductImage tabIndex={0 as const}>
              <img alt={postImg[index].name} src={url} />
            </ProductImage>
            <button type="button" onClick={()=>removeImage(index)}>
              <img alt={`${postImg[index].name} 제거 버튼`} src={closeButton} />
            </button>
          </div>
        })
      }
      {previewImg.length>=5 ? '' : <ProductImage/>}
    </PhotoContainer>
    <PhotoUploadTitle>• 판매할 상품의 사진을 업로드해주세요.</PhotoUploadTitle>
  </Container>
}

interface IProductImage {  
  tabIndex?: number;
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  .uploadImageList{
    position: relative;
    button {
      position: absolute;
      right: 0;
      top: 5px;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  @media all and (max-width: 1023px) {
    .photoContainer{
      padding-top: 0;
    }
  }
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
  height: 90px;

  @media all and (max-width: 767px) {
    width: 100%;
    height: auto;
    flex-flow: row wrap;
    input{
      margin-bottom: 0px;
    }
  }
    
  input[type="file"]{
    cursor: pointer;
    background: url(${addIcon}) no-repeat;
    background-position: center;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    border: 1px solid ${gray4};
    border-radius: 10px;
    overflow: hidden;
    &::file-selector-button{
      border: none;
      background: none;
      color: transparent;
      text-indent: 15px;
    }
  }
  
  div{
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
`

const ProductImage = styled.div<IProductImage>`
  border: 1px dashed ${gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  img{
    width: 100%;
  }
`

export default AddPhoto;