import { useRef, useState, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRecoilValue } from "recoil";

import styled, { StyledComponent, FlattenSimpleInterpolation, css } from 'styled-components';

import AddPhoto from '../components/AddPhoto';
import firebase from '../firebase';
import { userId, userInformation } from "../stores/userAuth"
import { gray4, gray6, primaryColor } from "../styles/Global";

const db = firebase.firestore();
const storage = getStorage();

function WriteForm(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [click, setClick] = useState<number>(0);
  const userUid = useRecoilValue(userId);
  const userInfo = useRecoilValue(userInformation);

  const [postImg, setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  interface FormState{
    title: string;
    side: string;
    price: '' | number;
    content: string;
    nickname: string;
    profileImage: string;
    imgsrc: string;
  }
  const [formState, setFormState] = useState<FormState>({
    title: '',
    side: '물품 종류',
    price: '',
    content: '',
    nickname: '',
    profileImage: '',
    imgsrc: '',
  });

  if (typeof formState.price ==="number" && formState.price > 1000000000) {
    formState.price = 999999999;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    setClick(1);
    e.preventDefault();

    const file: File[] = postImg;
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
            location: userInfo.location,
            recommend: [],
          }).then(() => {
            navigate("/HotArticles");
          })
      })
    })
  }
  return <section>
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
          label="inputTitle"
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
            label="inputPrice"
            name="price"
            placeholder="상품 가격을 입력해주세요"
            required={true}
            type="number"
            value={formState.price}
            onChange={handleChange}
          />
            <span className="productPrice">
              판매 가격 :{" "}
              {formState.price === ""
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
            onClick={() => {
              navigate("/HotArticles");
            }}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={
              Boolean(click) ||
              Boolean(!previewImg[0]) ||
              Boolean(!formState.title) ||
              Boolean(!formState.price) ||
              Boolean(!formState.content)
            }
            onClick={handleSubmit}
          >
            완료
          </Button>
        </WriteButtonBox>
      </fieldset>
    </Form>
  </section>
}

interface IButtonDefaultProps{
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface IButton extends IButtonDefaultProps{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface InputInfo extends InputDefaultProps {
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

interface InputDefaultProps {
  id: string;
  myinputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement> | null | undefined;
  className?: string;
  placeholder?: string;
  required?: boolean;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: string;
  name?: string;
  content?: boolean;
  label?: string;
}

export const WriteInput: React.FC<InputInfo> = ({
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
})=>{
  return <>
    <label
      className={`a11yHidden ${className}`} 
      htmlFor={id}
    >
      {label}
    </label>
    {
      content ? (
        <Textarea
          id={id}
          ref={myinputRef as React.RefObject<HTMLTextAreaElement>}
          className={className}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          onChange={onChange}
        />
      ) : (    
        <Input
          id={id}
          ref={myinputRef as React.RefObject<HTMLInputElement>}
          className={className}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          onChange={onChange}
          accept={accept}
          disabled={disabled}
          multiple={multiple}
          onClick={onClick}
        />
      )
    }
  </>
}

// mixin
const mixinInputStyle: FlattenSimpleInterpolation = css`
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${gray6};
  box-sizing: border-box;
  padding: 0 12px;
  font-size: 15px;
`

const Form: StyledComponent<"form", any, {}, never> = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin-left: auto;
  margin-right: auto;

  fieldset{
    padding: 0;
  }  
  
  @media all and (max-width: 767px) {
    .userRegion{
      flex-flow: column;
      gap: 0;
    }
    input#boardTitle, .userRegion span, .productPriceBox, .productPriceBox *{
      margin-bottom: 10px;
    }
    .productPriceBox{
      flex-flow: column;
      gap: 0;
      input, span{
        width: 100%;
        text-align: left;
      }
      span{
        text-indent: 10px;
      }
    }
  }
`

const RegionInformation: StyledComponent<"div", any, {}, never> = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  
  & span{
    ${mixinInputStyle}
    width: 100%;
    line-height: 36px;    
    cursor: default;
  }
`

const Input = styled.input<InputInfo>`
  ${mixinInputStyle}
  width: 100%;
  height: 37px;
`

const Textarea = styled.textarea<InputDefaultProps>`
  ${mixinInputStyle}
  width: 100%;
  height: 290px;
  padding: 12px;
  resize: none;
`

const ProductPriceBox: StyledComponent<"div", any, {}, never> = styled.div`
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
    letter-spacing: .5px;
  }
`

const WriteButtonBox: StyledComponent<"div", any, {}, never> = styled.div`
  width: 218px;
  height: 40px;
  margin: 40px auto 0px auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media all and (max-width: 767px) {
    margin-top: 0px;
  }
`

const Button = styled.button<IButton>`
  width: 100%;
  border: none;
  border-radius: 4px;
  background: ${primaryColor};
  color: white;
  font-weight: bold;
  cursor: pointer;
  
  &[disabled]{
    cursor: not-allowed;
    background: ${gray4};
  }
`

export default WriteForm;