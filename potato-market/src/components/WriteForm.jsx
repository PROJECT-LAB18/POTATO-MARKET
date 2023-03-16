import { useState } from 'react';
import { useNavigate } from 'react-router';

import styled, { css } from 'styled-components';

import firebase from '@/firebase';

import { gray4, gray6, primaryColor } from "@/styles/global";


const db = firebase.firestore();

function WriteForm(){  
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    side: '물품 종류',
    price : '',
    content: '',
  });
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection('UserWrite').add({
      title: formState.title,
      side: '물품 종류',
      price : formState.price,
      content: formState.content,
    })
    navigate("/HotArticles");
  }
  
  return <section>
    <h3 className="a11yHidden">게시글 작성란</h3>
    <Form>
      <fieldset>
        <legend>게시글 등록 폼</legend>      
        <WriteInput name="title" placeholder="제목을 입력해주세요"  required={true} type="text" value={formState.title} onChange={handleChange} />

        <RegionInformation className="userRegion">
          <span>지역</span>
          <span>동네</span>
          <span>동</span>
        </RegionInformation>

        <ProductPriceBox>
          <WriteInput name="price" placeholder="상품 가격을 입력해주세요" required={true} type="number" value={formState.price} onChange={handleChange} />
          <span className="productPrice">판매 가격 : {formState.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
        </ProductPriceBox>

        <WriteInput content name="content" placeholder="내용을 입력해주세요" required={true} type="text" value={formState.content} onChange={handleChange} />      
        
        <WriteButtonBox>
          <Button>취소</Button>
          <Button disabled={!formState.title || !formState.price || !formState.content} type="submit" onClick={handleSubmit}>완료</Button>
        </WriteButtonBox>
      </fieldset>
    </Form>
  </section>
}

export function WriteInput({placeholder, disabled, type, content, value, accept, required, onChange, name, multiple}){
  return <label>
    {
      content ?
      <Textarea name={name} placeholder={placeholder} required={required} type={type} value={value} onChange={onChange} /> :
      <Input accept={accept} disabled={disabled} multiple={multiple} name={name} placeholder={placeholder} required={required} type={type} value={value} onChange={onChange}/>
    }
  </label>
}

// mixin
const mixinInputStyle = css`
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${gray6};
  box-sizing: border-box;
  padding: 0 12px;
  font-size: 15px;
`

const Form = styled.form`
  width: 886px;
  display: flex;
  flex-flow: column nowrap;
  margin-left: auto;
  margin-right: auto;

  fieldset{
    padding: 0;
  }
`

const RegionInformation = styled.div`
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

const Input = styled.input`
  ${mixinInputStyle}
  width: 100%;
  height: 37px;
`

const Textarea = styled.textarea`
  ${mixinInputStyle}
  width: 100%;
  height: 290px;
  padding: 12px;
  resize: vertical;
`

const ProductPriceBox = styled.div`
  width: 886px;
  display: flex;
  justify-content: space-between;
  gap: 50px;

  input{
    width: 585px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${gray6};
  }

  input::-webkit-inner-spin-button {
    appearance: none;
  }

  span{    
    width: 250px;
    line-height: 36px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: .5px;
  }
`

const WriteButtonBox = styled.div`
  width: 218px;
  height: 40px;
  margin: 40px auto 80px auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

const Button = styled.button`
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