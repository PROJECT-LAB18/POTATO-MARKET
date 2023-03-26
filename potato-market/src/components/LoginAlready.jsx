import { useNavigate } from 'react-router-dom';

import styled from "styled-components";

import FormButton from '@/styles/FormButton';

function LoginAlready() {

  const navigate = useNavigate();

  return (
    <Main>
      <h2>이미 로그인 한 사용자 입니다.</h2>
      <div className="link-wrap">
        <FormButton as={"a"} onClick={() => navigate(-1)}>뒤로가기</FormButton>
        <FormButton primary as={"a"} onClick={() => navigate('/signup')}>마이페이지</FormButton>
      </div>
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 886px;
  height: 216px;
  margin: 60px auto;
  h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 24px;
  }
  .link-wrap {
    display: flex;
    gap: 12px;
    a {
      width: auto;
      height: 40px;
      padding: 0px 30px;
      line-height: 40px;
    }
  }
`

export default LoginAlready;