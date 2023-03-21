import { useState } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';

import FormInput, { FormInputImage } from '../components/FormInput';
import FormInputAddress from '../components/FormInputAddress';
import FormTerms from '../components/FormTerms';
import Popup from '../components/Popup';

import FormButton from '../styles/FormButton';

import { gray3, gray8, primaryColor } from '../styles/Global';

import { auth, db, storage, usersRef } from '@/firebase';

function SignUp() {

  const navigate = useNavigate();
  // 전체 선택 상태
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  // 약관 보기 개별 선택 상태
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [isCheckedThree, setIsCheckedThree] = useState(false);
  const [isCheckedFour, setIsCheckedFour] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [location, setLocation] = useState({});

  const [formState, setFormState] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    Agree: isCheckedThree ? "무료배송, 할인쿠폰 등 혜택/정보 수신 동의함" : "",
  },
  );

  // 회원가입 폼 disabled 조건
  const disabled = !formState.phoneNumber || !formState.email || !formState.password || !formState.confirmPassword || !formState.nickname

  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!isCheckedOne || !isCheckedTwo || !isCheckedFour) {
      alert("필수 이용 약관에 동의하셔야합니다.")
      return;
    }
    const nicknameSnapshot = await usersRef.where("nickname", "==", formState.nickname).get();
    if (!nicknameSnapshot.empty) {
      alert('중복된 닉네임 입니다.')
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(formState.email, formState.password);
      const file = document.querySelector('#profileImage').files[0];
      const uploadRef = storage.ref().child('profileImages/' + (new Date().getTime() + Math.random().toString(36).substr(2, 5)));
      const uploadTask = uploadRef.put(file);
      const profileImageUrl = await uploadTask.then(
        (snapshot) => snapshot.ref.getDownloadURL()
      );
      const userDoc = usersRef.doc(userCredential.user.uid);
      const userBatch = db.batch();
      userBatch.set(userDoc, {
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        nickname: formState.nickname,
        profileImage: profileImageUrl,
        agree: isCheckedThree,
        location: {
          sido: location.sido,
          sigungu: location.sigungu,
          bname: location.bname,
        }
      });
      await userBatch.commit();
      setShowPopup(true);
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
   */
  const handleCheckboxChangeThree = (event) => {
    setIsCheckedThree(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = usersRef.doc(currentUser.uid);
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
                valid={formState.password.length < 8 ? "최소 8자 이상 입력" : ""}
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
                valid={"동일한 비밀번호를 입력"}
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
              <FormInputAddress
                location={location}
                setLocation={setLocation}
              />
            </li>
          </ul>
          <div className="term-list">
            <span className="term-title">이용약관동의</span>
            <div className="term-check">
              <FormTerms all checked={isCheckedAll} onChange={handleCheckboxChangeAll} />
              <FormTerms checked={isCheckedOne} id={"term1"} text={"이용약관 동의 (필수)"} onChange={handleCheckboxChangeOne} />
              <FormTerms checked={isCheckedTwo} id={"term2"} text={"개인정보 수집 · 이용 동의 (필수)"} onChange={handleCheckboxChangeTwo} />
              <FormTerms checked={isCheckedThree} id={"term3"} text={"무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)"} value={formState.agree} onChange={handleCheckboxChangeThree} />
              <FormTerms checked={isCheckedFour} id={"term4"} text={"본인은 만 14세 이상입니다. (필수)"} onChange={handleCheckboxChangeFour} />
            </div>
          </div>
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
        </fieldset>
      </SignUpForm>
      {showPopup &&
        <Popup
          text={"회원가입에 성공했습니다! 어서오세요!"}
          onClose={() => {
            setShowPopup(false);
            navigate(-1);
          }}
        />
      }
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