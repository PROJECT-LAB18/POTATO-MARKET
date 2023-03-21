import styled from 'styled-components';

import WriteForm from '@/components/WriteForm';
import { useRecoilState } from "recoil";
import { userId } from "@/stores/userAuth.js"
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';
function WriteArticle(){
  const [login, setLogin] = useRecoilState(userId);
  
  return (
    <Main className="wrapper">
      <ContainerGlobalStyle />
      {login==null?
      (<h1>로그인하고 사용해라</h1>):
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
  width: 886px;
  margin-left: auto;
  margin-right: auto;
`

export default WriteArticle;