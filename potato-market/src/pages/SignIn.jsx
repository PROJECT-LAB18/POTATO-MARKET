import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        console.log("로그인완");
      } else {
        console.log("님가입안했음");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section>
      <h2>로그인</h2>
      <LoginForm id="loginForm" onSubmit={handleLogin}>
        <fieldset>
          <legend>회원 로그인 폼</legend>
          <ul className="form-list">
            {/* <li>
              <FormInput id={"userPhoneNumber"} placeholder={"핸드폰 번호를 입력해주세요"} text={"핸드폰 번호"} type={"number"} />
            </li> */}
            <li>
              <FormInput id={"userEmail"} placeholder={"이메일을 입력해주세요"} text={"아이디"} type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} />
            </li>
            <li>
              <FormInput id={"userPW"} placeholder={"비밀번호를 입력해주세요"} text={"비밀번호"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
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