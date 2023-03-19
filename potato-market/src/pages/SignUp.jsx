import { useState } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import FormInput, { FormInputLocation, FormInputImage } from '../components/FormInput';
import FormTerms from '../components/FormTerms';
import Postcode from '../components/Postcode';
import FormButton from '../styles/FormButton';

import { gray8 } from '../styles/Global';

import firebase from '@/firebase';

function SignUp() {

  const navigate = useNavigate();

  // 회원가입 가능 상태 조절 예정
  const [confirmState, setConfirmState] = useState(false);

  const [formState, setFormState] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    // profileImage: '',
    // location: "",
  });

  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(formState.email, formState.password);
      const db = firebase.firestore();
      await db.collection("users").doc(userCredential.user.uid).set({
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        nickname: formState.nickname,
      });
      navigate(-1);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const data = [
    { id: 1, title: '선택 1' },
    { id: 2, title: '선택 2' },
    { id: 3, title: '선택 3' },
    { id: 4, title: '선택 4' }
  ];

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  }

  return (
    <Section>
      <h2>회원가입</h2>
      <SignUpForm onSubmit={handleSignUp}>
        <fieldset>
          <legend>신규 회원가입 폼</legend>

          {/* 에러메세지 확인용 */}
          {error && <p style={{ backgroundColor: 'yellow' }}>{error}</p>}

          <ul className="form-list">
            <li className="form-item">
              <FormInput
                label
                button={"인증번호 받기"}
                id={"phoneNumber"}
                placeholder={"숫자만 입력해주세요"}
                text={"휴대폰"}
                type={"tel"}
                value={formState.phoneNumber}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-item">
              <FormInput
                label
                button={"인증번호 받기"}
                id={"email"}
                placeholder={"이메일을 입력해주세요"}
                text={"이메일"}
                type={"email"}
                value={formState.email}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-item">
              <FormInput
                label
                id={"password"}
                placeholder={"비밀번호를 입력해주세요"}
                text={"비밀번호"}
                type={"password"}
                valid={"최소 8자 이상 입력"}
                value={formState.password}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-item">
              <FormInput
                label
                id={"confirmPassword"}
                placeholder={"비밀번호를 한번 더 입력해주세요"}
                text={"비밀번호 확인"}
                type={"password"}
                // valid={"동일한 비밀번호를 입력"}
                value={formState.confirmPassword}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-item">
              <FormInput
                label
                id={"nickname"}
                placeholder={"닉네임을 입력해주세요"}
                text={"닉네임"}
                type={"text"}
                value={formState.nickname}
                onChange={handleInputChange}
              />
            </li>
            <li className="form-item">
              <FormInputImage />
            </li>
            <li className="form-item">
              {/* <FormInputLocation process={"search"} /> */}
              <Postcode />
            </li>
            <li className="form-item">
              <FormInputLocation process={"detail"} />
            </li>
          </ul>
          <div className="term-list">
            <span className="term-title">이용약관동의</span>
            <div className="term-check">
              <FormTerms
                all
                checked={checkItems.length === data.length}
                onCheck={(checked) => handleAllCheck(checked)}
              />
              {data.map((item) => (
                <FormTerms
                  key={item.id}
                  checked={checkItems.includes(item.id)}
                  id={item.id}
                  text={item.title}
                  onCheck={(checked) => handleSingleCheck(checked, item.id)}
                />
              ))}
            </div>
          </div>
          <FormButton
            primary
            // disabled={!formState.phoneNumber}
            type="submit"
          >가입하기</FormButton>
        </fieldset>
      </SignUpForm>
    </Section >
  )
};

const Section = styled.section`
  padding: 80px 0 40px;
  h2 {
    line-height: 36px;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
  }
`;

const SignUpForm = styled.form`
  position: relative;
  width: 640px;
  margin: 44px auto;
  .form-list {
    display: block;
    border-top: 2px solid black;
  }
  .form-item {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 84px;
    padding: 20px 0;
    box-sizing: border-box;
  }
  .term-list {
    display: flex;
    gap: 8px;
    padding: 12px 0 20px;
    margin-bottom: 40px;
    border-top: 1px solid black;
    border-bottom: 1px solid ${gray8};
  }
  .term-title {
    flex-shrink: 0;
    width: 139px;
    font-weight: 700;
    line-height: 32px;
  }
  .term-check {
    width: 100%;
  }
  @media screen and (max-width: 700px) {
    width: calc(100% - 60px);
    margin: 44px 30px;
    .form-item {
      flex-direction: column;
    }
    .term-list {
      flex-direction: column;
    }
  }
`;

export default SignUp;