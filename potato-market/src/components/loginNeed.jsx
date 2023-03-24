import { useNavigate } from 'react-router-dom';

import styled from "styled-components";

import { CustomButton } from "../pages/productdetail";


function LoginNeed(){

  const navigate = useNavigate();

  return ( 
    <Main>
    <h2 className="error-massage">로그인 후 사용해주세요.</h2>
    <div className="button-div">
     <CustomButton onClick={
      ()=>{navigate('/signin')}
     } red>확인</CustomButton>
     <CustomButton onClick={
      ()=>{navigate(-1)}
     }>취소</CustomButton>
    </div>
  </Main>
  )
}

const Main = styled.main`
  display:flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;
  width: 886px;
  height: 216px;
  margin:60px auto;
  & .error-massage{
    font-size:32px;
    font-weight: 700;
    margin-bottom:24px;
  }
  & .button-div{
    display:flex;
    gap:12px;
  }
`

export default LoginNeed;