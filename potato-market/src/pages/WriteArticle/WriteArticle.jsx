import styled from 'styled-components';

import AddPhoto from './AddPhoto';
import WriteForm from './WriteForm';

import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';
function WriteArticle(){
  return (
    <Main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">게시글 작성</h2>
      <AddPhoto />
      <WriteForm />
    </Main>  
  )
}

const Main = styled.main`
  width: 886px;
  margin-left: auto;
  margin-right: auto;
`

export default WriteArticle;