import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRecoilValue } from "recoil";

import styled, { css } from "styled-components";

import AddPhoto from "@/components/AddPhoto";
import firebase from "@/firebase";
import { userId, userInformation } from "@/stores/userAuth.js"
import { gray4, gray6, primaryColor } from "@/styles/global";

const db = firebase.firestore();
const storage = getStorage();

function WriteForm() {  
  const inputRef = useRef();
  const navigate = useNavigate();
  const [click, setClick] = useState(0);
  const userUid = useRecoilValue(userId);
  const userInfo = useRecoilValue(userInformation);

  const [postImg, setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  const [formState, setFormState] = useState({
    title: "",
    side: "물품 종류",
    price : "",
    content: "",
    nickname: "",
    profileImage: "",
    imgsrc: "",
  });

  if(formState.price > 1000000000) {
    formState.price = 999999999;
  };
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name] : e.target.value,
    })
  };

  const handleSubmit = (e) => {
    setClick(1);
    e.preventDefault();
    const file = postImg;
    const uploadPromises = [];
    for (let i = 0; i < file.length; i++) {
      const mountainRef = ref(storage, "writeimages/" + file[i].name);
      uploadPromises.push(uploadBytes(mountainRef, file[i]));
    }
  
    Promise.all(uploadPromises).then(() => {
      const urlPromises = [];
      for (let i = 0; i < file.length; i++) {
        const mountainRef = ref(storage, "writeimages/" + file[i].name);
        urlPromises.push(getDownloadURL(mountainRef));
      }
      Promise.all(urlPromises).then((urls) => {
        db.collection("UserWrite")
          .add({
            title: formState.title,
            side: "중고 거래 ",
            price: formState.price,
            content: formState.content,
            date: new Date(),
            imgsrc: urls,
            chat: 0,
            check: 0,
            heart: 0,
            userId: userUid,
            nickname: userInfo.nickname,
            profileImage: userInfo.profileImage,
            location : userInfo.location,
            recommend : [],
          }).then(() => {
            navigate("/HotArticles");
          });
      })
    })
  };
  return (
    <section>    
      <h3 className="a11yHidden">게시글 작성란</h3>
      <Form>
        <fieldset>
          <AddPhoto
            myinputRef={inputRef}
            name="imgsrc"
            postImg={postImg}
            previewImg={previewImg}
            required={true}
            setPostImg={setPostImg}
            setPreviewImg={setPreviewImg}
          />
          <legend>게시글 등록 폼</legend>      
          <WriteInput
            id="boardTitle"
            name="title"
            placeholder="제목을 입력해주세요"
            required={true}
            type="text"
            value={formState.title}
            onChange={handleChange}
          />

          <RegionInformation className="userRegion">
            <span>{userInfo.location.sido}</span>
            <span>{userInfo.location.sigungu}</span>
            <span>{userInfo.location.bname}</span>
          </RegionInformation>

          <ProductPriceBox className="productPriceBox">
            <WriteInput
              id="productPrice"
              name="price"
              placeholder="상품 가격을 입력해주세요"
              required={true}
              type="number"
              value={formState.price}
              onChange={handleChange}
            />
            <span className="productPrice">
              판매 가격 :{" "}
              {formState.price===""
                ? 0
                : formState.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </span>
          </ProductPriceBox>

          <WriteInput
            content
            id="writeContent"
            label="게시글 내용"
            name="content"
            placeholder="내용을 입력해주세요"
            required={true}
            type="text"
            value={formState.content}
            onChange={handleChange}
          />      
          
          <WriteButtonBox>
            <Button
              onClick={()=>{
                navigate("/HotArticles");
              }}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={
                click ||
                !previewImg[0] ||
                !formState.title ||
                !formState.price ||
                !formState.content
              }
              onClick={handleSubmit}
            >
              완료
            </Button>
          </WriteButtonBox>
        </fieldset>
      </Form>
    </section>
  )
}

export function WriteInput({
  className,
  placeholder,
  disabled,
  type,
  content,
  value,
  accept,
  required,
  onChange,
  name,
  multiple,
  myinputRef,
  onClick,
  id,
  label
}){
  return <>
    <label className={`a11yHidden ${className}`} htmlFor={id}>{label}</label>
    {
      content ? (
        <Textarea ref={myinputRef} className={className} id={id} name={name} placeholder={placeholder} required={required} type={type} value={value} onChange={onChange} />
      ) : (     
        <Input
          ref={myinputRef}
          accept={accept}
          className={className}
          disabled={disabled}
          id={id}
          multiple={multiple}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          onChange={onChange}
          onClick={onClick}
        />
      )
    }
  </>
}

// mixin
const mixinInputStyle = css`
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${gray6};
  box-sizing: border-box;
  padding: 0 12px;
  font-size: 15px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin-left: auto;
  margin-right: auto;

  fieldset {
    padding: 0;
  };
  
  @media all and (max-width: 767px) {
    .userRegion {
      flex-flow: column;
      gap: 0;
    }
    input#boardTitle, .userRegion span, .productPriceBox, .productPriceBox * {
      margin-bottom: 10px;
    }
    .productPriceBox {
      flex-flow: column;
      gap: 0;
      input, span {
        width: 100%;
        text-align: left;
      }
      span {
        text-indent: 10px;
      }
    }
  }
`;

const RegionInformation = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  
  & span {
    ${mixinInputStyle}
    width: 100%;
    line-height: 36px;    
    cursor: default;
  }
`;

const Input = styled.input`
  ${mixinInputStyle}
  width: 100%;
  height: 37px;
`;

const Textarea = styled.textarea`
  ${mixinInputStyle}
  width: 100%;
  height: 290px;
  padding: 12px;
  resize: none;
`;

const ProductPriceBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;

  input{
    width: 66%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${gray6};
  }

  input::-webkit-inner-spin-button {
    appearance: none;
  }

  span{    
    width: 30%;
    line-height: 36px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.5px;
  }
`;

const WriteButtonBox = styled.div`
  width: 218px;
  height: 40px;
  margin: 40px auto 0px auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media all and (max-width: 767px) {
    margin-top: 0px;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 4px;
  background: ${primaryColor};
  color: white;
  font-weight: bold;
  cursor: pointer;
  
  &[disabled] {
    cursor: not-allowed;
    background: ${gray4};
  }
`;

export default WriteForm;