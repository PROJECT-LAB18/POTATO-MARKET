import styled, { css } from 'styled-components';

import { gray4, gray6, primaryColor } from "@/styles/global";

function WriteForm(){
  return <section>
    <h3 className="a11yHidden">게시글 작성란</h3>
    <Form>
      <fieldset>
        <legend>게시글 등록 폼</legend>      
        <WriteInput placeholder="제목을 입력해주세요" required={true} type="text" />

        <RegionInformation className="userRegion">
          <span>지역</span>
          <span>동네</span>
          <span>동</span>
        </RegionInformation>

        <ProductPriceBox>
          <WriteInput placeholder="상품 가격을 입력해주세요" required={true} type="number" />
          <span className="productPrice">판매 가격 : {"10,000원"}</span>
        </ProductPriceBox>

        <WriteInput content placeholder="내용을 입력해주세요" required={true} type="text" />      
        
        <WriteButtonBox>
          <Button>취소</Button>
          <Button disabled={"disabled"} type="submit">완료</Button>
        </WriteButtonBox>
      </fieldset>
    </Form>
  </section>
}

export function WriteInput({placeholder, type, content, value, accept, required}){
  return <label>
    {
      content ?
      <Textarea placeholder={placeholder} required={required} type={type} /> :
      <Input accept={accept} placeholder={placeholder} required={required} type={type} value={value} />
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