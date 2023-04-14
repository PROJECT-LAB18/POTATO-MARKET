import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router";

import { useRecoilState } from "recoil";
import styled from "styled-components";

import FormInput, { FormInputImage } from "../components/FormInput";
import FormInputAddress from "../components/FormInputAddress";
import FormTerms from "../components/FormTerms";
import LoginState from "../components/LoginState";
import Popup from "../components/Popup";
import { auth, db, storage, usersRef } from "../firebase";
import { userId } from "../stores/userAuth";
import FormButton from "../styles/FormButton";
import { gray3, gray8, primaryColor } from "../styles/Global";
import { LocationContext } from "react-router/dist/lib/context";
export interface Location {
  sido: string;
  sigungu: string;
  bname: string;
}

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  nickname: string;
  agree: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [login] = useRecoilState(userId);

  // 전체 선택 상태
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  // 약관 보기 개별 선택 상태

  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [isCheckedThree, setIsCheckedThree] = useState(false);
  const [isCheckedFour, setIsCheckedFour] = useState(false);

  const [location, setLocation] = useState({});

  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    nickname: "",
    agree: isCheckedThree ? "무료배송, 할인쿠폰 등 혜택/정보 수신 동의함" : "",
  });

  const [error, setError] = useState("");

  const [nicknameValid, setNicknameValid] = useState("");

  // 프로필 이미지
  const [profileUrl, setProfileUrl] = useState("");

  // 팝업창
  const [showPopup, setShowPopup] = useState("");

  // disabled 조건
  const disabled =
    !formState.phoneNumber ||
    !formState.email ||
    !formState.password ||
    !formState.confirmPassword ||
    !formState.nickname;

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!isCheckedOne || !isCheckedTwo || !isCheckedFour) {
      setShowPopup("필수 이용 약관에 동의하셔야합니다.");
      return;
    }

    const nicknameSnapshot = await usersRef.where("nickname", "==", formState.nickname).get();
    if (!nicknameSnapshot.empty) {
      setNicknameValid("중복된 닉네임입니다.");
      return;
    } else {
      setNicknameValid("");
    }

    try {
      // Firebase Authentication : 신규 계정 생성
      const userCredential: any = await auth.createUserWithEmailAndPassword(
        formState.email,
        formState.password
      );
      // Firebase Storage : 프로필 사진 storage로 전송 후 업로드 된 url 받아오기
      let profileImageUrl =
        "https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=8d1123dc-f7dd-4439-a8e3-881b1ce4a401"; // 기본 이미지
      if (profileUrl) {
        const uploadRef = storage
          .ref()
          .child(
            "profileImages/" + (new Date().getTime() + Math.random().toString(36).substr(2, 5))
          );

        const response = await fetch(profileUrl);
        const imageBlob = await response.blob();

        const uploadTask: any = uploadRef.put(imageBlob);
        profileImageUrl = await uploadTask.then(
          (snapshot: { ref: { getDownloadURL: () => string } }) => snapshot.ref.getDownloadURL()
        );
      }

      // Firebase FireStore : 회원정보 신규 저장
      const userDoc = usersRef.doc(userCredential.user.uid);
      const userBatch = db.batch();

      userBatch.set(userDoc, {
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        nickname: formState.nickname,
        profileImage: profileImageUrl,
        agree: isCheckedThree,
        location: location,
      });
      await userBatch.commit();
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        isCheckedOne,
        isCheckedTwo,
        isCheckedFour,
        disabled
      );
      setShowPopup(errorMessage);
    }
  };

  //파이어베이스 에러메세지
  const getErrorMessage = (
    error: any,
    isCheckedOne: boolean,
    isCheckedTwo: boolean,
    isCheckedFour: boolean,
    disabled: boolean
  ) => {
    if (disabled) {
      return "모든 필수 항목을 입력해주세요.";
    }
    if (!isCheckedOne || !isCheckedTwo || !isCheckedFour) {
      return "필수 이용 약관에 동의하셔야합니다.";
    }
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "이메일 혹은 비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "회원가입에 실패 하였습니다.";
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChangeAll = (event: { target: { checked: boolean } }) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedOne(isChecked ? true : false);
    setIsCheckedTwo(isChecked ? true : false);
    setIsCheckedThree(isChecked ? true : false);
    setIsCheckedFour(isChecked ? true : false);
  };

  const handleCheckboxChangeOne = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsCheckedOne(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
  };

  const handleCheckboxChangeTwo = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsCheckedTwo(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
  };

  /**
   * 약관 보기 마케팅 수신 동의 (선택)이벤트,
   * firestore user컬렉션 안의 인증 유저uid문서 필드 저장
   */
  interface CheckedChangeEvent extends ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      checked: boolean;
    };
  }

  // handleCheckboxChangeThree 함수의 인수를 CheckedChangeEvent 타입으로 설정
  const handleCheckboxChangeThree = (event: CheckedChangeEvent) => {
    const currentUser = auth.currentUser;

    setIsCheckedThree(event.target.checked);

    if (!event.target.checked) {
      setIsCheckedAll(false);
    }

    if (currentUser) {
      const userDocRef = usersRef.doc(currentUser.uid);
      userDocRef
        .update({
          agree: event.target.checked,
        })
        .catch((error) => {
          setError(error.code);
        });
    }
  };
  const handleCheckboxChangeFour = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsCheckedFour(event.target.checked);
    if (!event.target.checked) {
      setIsCheckedAll(false);
    }
  };
  return (
    <>
      {login !== null ? (
        <LoginState />
      ) : (
        <Section>
          <h2>회원가입</h2>
          <SignUpForm onSubmit={handleSignUp}>
            <fieldset>
              <legend>신규 회원가입 폼</legend>
              <ul className="form-list">
                <li className="form-item">
                  <FormInput
                    label
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
                    value={formState.password}
                    valid={
                      formState.password &&
                      (formState.password.length < 6 || formState.password.length > 8)
                        ? "최소 6자 이상 8자 이하로 입력해주세요."
                        : ""
                    }
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
                    value={formState.confirmPassword}
                    valid={
                      formState.confirmPassword && formState.password !== formState.confirmPassword
                        ? "비밀번호가 일치 하지 않습니다."
                        : ""
                    }
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
                  <FormInputImage profileUrl={profileUrl} setProfileUrl={setProfileUrl} />
                </li>
                <li className="form-item">
                  <FormInputAddress location={location} setLocation={setLocation} />
                </li>
              </ul>
              <div className="term-list">
                <span className="term-title">이용약관동의</span>
                <div className="term-check">
                  <FormTerms all checked={isCheckedAll} onChange={handleCheckboxChangeAll} />
                  <FormTerms
                    checked={isCheckedOne}
                    id={"term1"}
                    text={"이용약관 동의 (필수)"}
                    onChange={handleCheckboxChangeOne}
                  />
                  <FormTerms
                    checked={isCheckedTwo}
                    id={"term2"}
                    text={"개인정보 수집 · 이용 동의 (필수)"}
                    onChange={handleCheckboxChangeTwo}
                  />
                  <FormTerms
                    checked={isCheckedThree}
                    id={"term3"}
                    text={"무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)"}
                    value={formState.agree}
                    onChange={handleCheckboxChangeThree}
                  />
                  <FormTerms
                    checked={isCheckedFour}
                    id={"term4"}
                    text={"본인은 만 14세 이상입니다. (필수)"}
                    onChange={handleCheckboxChangeFour}
                  />
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
              >
                가입하기
              </FormButton>
            </fieldset>
          </SignUpForm>
          {showPopup && (
            <Popup
              text={getErrorMessage(error, isCheckedOne, isCheckedTwo, isCheckedFour, disabled)}
              onClose={() => {
                setShowPopup("");
              }}
            />
          )}
        </Section>
      )}
    </>
  );
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
