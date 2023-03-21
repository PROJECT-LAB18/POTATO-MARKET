import { useState } from 'react';
import { useNavigate } from 'react-router';

import { usersRef } from '../firebase';

import styled from 'styled-components';

import FormInput, { FormInputLocation, FormInputImage } from '../components/FormInput';
import FormTerms from '../components/FormTerms';
import Postcode from '../components/Postcode';
import FormButton from '../styles/FormButton';

import { gray3, gray8 ,primaryColor} from '../styles/Global';

import firebase from '@/firebase';
import Popup from '../components/Popup';

function SignUp() {
  
  const navigate = useNavigate();
  // 전체 선택 상태  
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  
  //약관 보기 개별 선택 상태
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [isCheckedThree, setIsCheckedThree] = useState(false);
  const [isCheckedFour, setIsCheckedFour] = useState(false);

  // 회원가입 가능 상태 조절 예정
  const [confirmState, setConfirmState] = useState(false);


  const [formState, setFormState] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    Agree: isCheckedThree ? "무료배송, 할인쿠폰 등 혜택/정보 수신 동의함":"",

    // profileImage: '',
    // location: "",
  });


  
  const [error, setError] = useState("");
  
  const [nicknameValid, setNicknameValid] = useState("");
  
  // disabled 조건
  const disabled = !formState.phoneNumber || !formState.email || !formState.password || !formState.confirmPassword || !formState.nickname
  
  //팝업창
  const [showPopup, setShowPopup] = useState(false);
  
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    // const currentUserUid = firebase.auth().currentUser.uid;
    // const usersRef = firebase.db().collection("users");
    

    if( !isCheckedOne || !isCheckedTwo || !isCheckedFour){
      setShowPopup("필수 이용 약관에 동의하셔야합니다.")
    }else {
      setShowPopup(true);
    }
    const nicknameSnapshot = await usersRef.where("nickname", "==", formState.nickname).get();
    if (!nicknameSnapshot.empty) {
      setNicknameValid("중복된 닉네임입니다.");
      return;
    }else { 
      setNicknameValid("")
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
        agree: isCheckedThree,
        
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




  const handleCheckboxChangeAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedOne(isChecked ? true : false);
    setIsCheckedTwo(isChecked ? true : false);
    setIsCheckedThree(isChecked ? true : false);
    setIsCheckedFour(isChecked ? true : false);

  };

  const handleCheckboxChangeOne = (event) => {
    setIsCheckedOne(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
  };

  const handleCheckboxChangeTwo = (event) => {
    setIsCheckedTwo(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
  };



  /**
   * 약관 보기 마케팅 수신 동의 (선택)이벤트,
   * firestore user컬렉션 안의 인증 유저uid문서 필드 저장 
   *  
   */
  const handleCheckboxChangeThree = (event) => {
    setIsCheckedThree(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const db = firebase.firestore();
      const userDocRef = db.collection("users").doc(currentUser.uid);
      userDocRef.update({
        agree: event.target.checked
      }, { merge: true })
        .catch((error) => {
          setError(error.message);
        });
    }
  };
  
  
  const handleCheckboxChangeFour = (event) => {
    setIsCheckedFour(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
  };
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
                valid ={formState.password && (formState.password.length < 6 || formState.password.length > 8) ? "최소 6자 이상 8자 이하로 입력해주세요." : ""} 
                onChange={handleInputChange}
              />
            </li>
            <li className="form-item">
              <FormInput
                label
                id={"confirmPassword"}
                placeholder={"비밀번호를 한번 더 입력해주세요"}
                text={"비밀번호 확인"}
                valid={formState.confirmPassword && (formState.password !== formState.confirmPassword) ? "비밀번호가 일치 하지 않습니다." : ""}
                type={"password"}
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
                valid={nicknameValid}
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
              <FormTerms all checked={isCheckedAll} onChange={handleCheckboxChangeAll}/>            
              <FormTerms id={"term1"} text={"이용약관 동의 (필수)"}   checked={isCheckedOne} onChange={handleCheckboxChangeOne}/>
              <FormTerms id={"term2"} text={"개인정보 수집 · 이용 동의 (필수)"}   checked={isCheckedTwo} onChange={handleCheckboxChangeTwo}/>
              <FormTerms id={"term3"} text={"무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)"}  value={formState.agree} checked={isCheckedThree} onChange={handleCheckboxChangeThree}/>
              <FormTerms id={"term4"} text={"본인은 만 14세 이상입니다. (필수)"}  checked={isCheckedFour} onChange={handleCheckboxChangeFour}/>
            </div>
          </div>
          <div>
            {showPopup && <Popup/>}
          <FormButton
            primary
            disabled={disabled}
            type="submit"
            style={{
              backgroundColor: disabled ? gray3 : primaryColor,
              pointerEvents: disabled ? "none" : "auto",
            }}
            onClick={handleSignUp}
            >가입하기</FormButton>
          </div>
              
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