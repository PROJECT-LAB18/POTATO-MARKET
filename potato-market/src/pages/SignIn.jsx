import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import FormInput from '../components/FormInput';
import FormButton from '../styles/FormButton';

const Section = styled.section`
  padding: 80px 0 70px;
  h2 {
    line-height: 36px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }
`;

const LoginForm = styled.form`
  width: 340px;
  margin: 32px auto 10px;
  .form-list li {
    margin-top: 12px;
  }
  .account-find {
    display: flex;
    justify-content: flex-end;
    margin: 12px 0 28px;
    line-height: 19px;
    font-size: 14px;
    li:nth-child(2)::before {
      content: "|";
      display: inline-block;
      padding: 0 4px;
    }
    a {
      color: black;
      text-decoration: none;
    }
  }
`;

const SignIn = () => {

  const navigate = useNavigate();

  return (
    <Section>
      <h2>로그인</h2>
      <LoginForm action="" id="loginForm" method="POST" target="">
        <fieldset>
          <legend>회원 로그인 폼</legend>
          <ul className="form-list">
            <li>
              <FormInput id={"userId"} placeholder={"아이디를 입력해주세요"} text={"아이디"} type={"text"} />
            </li>
            <li>
              <FormInput id={"userPW"} placeholder={"비밀번호를 입력해주세요"} text={"비밀번호"} type={"password"} />
            </li>
          </ul>
          <ul className="account-find">
            <li><Link to={"#"}>아이디 찾기</Link></li>
            <li><Link to={"#"}>비밀번호 찾기</Link></li>
          </ul>
          <FormButton primary type="submit">로그인</FormButton>
          <FormButton as={"a"} onClick={() => navigate("/signup")}>회원가입</FormButton>
        </fieldset>
      </LoginForm>
    </Section >
  )
};

export default SignIn;