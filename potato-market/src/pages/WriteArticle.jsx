import { useRecoilState } from "recoil";
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import WriteForm from '@/components/WriteForm';
import { userId } from "@/stores/userAuth.js"
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';
import { CustomButton } from "./productdetail";
function WriteArticle(){
  const [login,setLogin] = useRecoilState(userId);
  const navigate = useNavigate();
  return (
    <Main className="wrapper">
      <ContainerGlobalStyle />
      {login==null?
      (
      <>
        <h2 className="error-massage">로그인 후 사용해주세요.</h2>
        <div className="button-div">
         <CustomButton onClick={
          ()=>{navigate('/signin')}
         } red>확인</CustomButton>
         <CustomButton onClick={
          ()=>{navigate(-1)}
         }>취소</CustomButton>
        </div>
      </>
      ):
      
      (
        <>
          <h2 className="articleTitle">게시글 작성</h2>
          <WriteForm />
        </>
      ) 
      }
    </Main>  
  )
}

const Main = styled.main`
  display:flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;
  width: 886px;
  margin-left: auto;
  margin-right: auto;
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

export default WriteArticle;