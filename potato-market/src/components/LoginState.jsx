import { useNavigate } from 'react-router-dom';

import { useRecoilState } from "recoil";

import styled from "styled-components";

import { userId } from '@/stores/userAuth';
import { CustomButton } from "@/styles/CustomButton";

function LoginState() {

  const [login] = useRecoilState(userId);
  const navigate = useNavigate();

  return (
    <Main>
      <h2 className="error-message">
        {login === null ? "로그인 후 사용해주세요." : "이미 로그인 한 사용자 입니다."}
      </h2>
      <div className="button-div">
        {login === null
          ? ( <>
            <CustomButton filled as={"a"} onClick={() => { navigate('/signin') }}>로그인</CustomButton>
            <CustomButton as={"a"} onClick={() => { navigate(-1) }}>뒤로가기</CustomButton>
          </> ) : ( <>
            <CustomButton filled as={"a"} onClick={() => { navigate(-1) }}>뒤로가기</CustomButton>
            <CustomButton as={"a"} onClick={() => { navigate('/mypage') }}>마이페이지</CustomButton>
          </> )
        }
      </div>
    </Main >
  )
};

const Main = styled.main`
  display:flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;
  width: 886px;
  height: 216px;
  margin:60px auto;
  .error-message{
    font-size:32px;
    font-weight: 700;
    margin-bottom:24px;
  }
  & .button-div{
    display:flex;
    gap:12px;
  }
`

export default LoginState;