import styled, { css } from 'styled-components';

// import FormInput from "@/components/FormInput";

import { gray6 } from "@/styles/global";

function WriteForm(){
  return <section>
    <h3 className="a11yHidden">게시글 작성란</h3>
    <Form>
      <legend>게시글 등록 폼</legend>      
      <WriteInput placeholder="제목을 입력해주세요" type="text" />

      <RegionInformation className="userRegion">
        <span>지역</span>
        <span>동네</span>
        <span>동</span>
      </RegionInformation>

      <ProductPriceBox>
        <WriteInput placeholder="상품 가격을 입력해주세요" type="number" />
        <span className="productPrice">판매 가격 : {"10,000원"}</span>
      </ProductPriceBox>

      <WriteInput content placeholder="내용을 입력해주세요" type="text" />     
    </Form>
  </section>
}

export function WriteInput({placeholder, type, content, value, accept}){
  return <label>
    {
      content ?
      <Textarea placeholder={placeholder} type={type} /> :
      <Input accept={accept} placeholder={placeholder} type={type} value={value} />
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

export default WriteForm;