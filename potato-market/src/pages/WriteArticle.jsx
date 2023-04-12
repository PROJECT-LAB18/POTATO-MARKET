import { useRecoilState } from "recoil";
import styled from 'styled-components';

import LoginState from "../components/LoginState";

import WriteForm from '@/components/WriteForm';
import { userId } from "@/stores/userAuth"
import { ContainerGlobalStyle } from '@/styles/ContainerGlobalStyle';

function WriteArticle() {
  const [login, setLogin] = useRecoilState(userId);
  return (
    <>
      <ContainerGlobalStyle />
      {login == null ? <LoginState state="login" /> :
        (<Main className="wrapper">
          <h2 className="articleTitle">게시글 작성</h2>
          <WriteForm />
        </Main>)}
    </>
  )
}

const Main = styled.main`
  display:flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;
  width: 886px;
  margin: 0 auto;
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