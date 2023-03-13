import styled from 'styled-components';

import SignUpInput from '../components/SignUpInput';
import FormButton from '../styles/FormButton';

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
  margin: 10px auto;
  .form-list {
    display: block;
    padding-left: 8px;
    border-top: 2px solid black;
  }
`;

const SignUp = () => {
  return (
    <Section>
      <h2>회원가입</h2>
      <SignUpForm action="" id="signupForm" method="POST" name="signupForm" target="">
        <fieldset>
          <legend>신규 회원가입 폼</legend>
          <ul className="form-list">
            <li className="signup-form__item">
              <label className="signup-form__title" htmlFor="userId">아이디</label>
              <input className="signup-form__input" id="userId" name="userId" placeholder="아이디를 입력해주세요" required="" type="text" />
              <button className="signup-form__button" type="button">중복확인</button>
            </li>
            <li className="signup-form__item">
              <label className="signup-form__title" htmlFor="userPw">비밀번호</label>
              <div>
                <input className="signup-form__input" id="userPw" name="userPw" placeholder="비밀번호를 입력해주세요" required="" type="password" />
                <p className="signup-form__valid" hidden={true}>최소 8자 이상 입력</p>
              </div>
            </li>
            <li className="signup-form__item">
              <label className="signup-form__title" htmlFor="userPw2">비밀번호 확인</label>
              <div>
                <input className="signup-form__input" id="userPw2" name="userPw2" placeholder="비밀번호를 한번 더 입력해주세요" required="" type="password" />
                <p className="signup-form__valid" hidden={true}>동일한 비밀번호를 입력</p>
              </div>
            </li>
            <li className="signup-form__item">
              <label className="signup-form__titled" htmlFor="userName">닉네임</label>
              <input className="signup-form__input" id="userName" name="userName" placeholder="이름을 입력해주세요" required="" type="text" />
            </li>
            <li className="signup-form__item">
              <label className="signup-form__title" htmlFor="userPhone">휴대폰</label>
              <input className="signup-form__input" id="userPhone" name="userPhone" placeholder="숫자만 입력해주세요" required="" type="text" />
              <button className="signup-form__button" type="button">인증번호 받기</button>
            </li>
            <li className="signup-form__item">
              <label className="signup-form__title" htmlFor="userLoca">주소</label>
              <button className="signup-form__button" type="button">주소 검색</button>
            </li>
          </ul>
          <div className="signup-form__terms">
            <span className="signup-form__title">이용약관동의</span>
            <div className="signup-form__check-terms">
              <label className="signup-form__label-check check-all" htmlFor="termsAll">
                <input className="signup-form__input-check" id="termsAll" name="termsAll" type="checkbox" />
                <i className="signup-form__ico-check"></i>
                <span aria-labelledby="termsAll" className="signup-form__text-check--all">전체 동의합니다.
                  <span className="signup-form__text-terms-desc">선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</span>
                </span>
              </label>
              <div className="signup-form__term-wrap">
                <label className="signup-form__label-check" htmlFor="terms1">
                  <input className="signup-form__input-check required" id="terms1" name="terms" type="checkbox" />
                  <i className="signup-form__ico-check"></i>
                  <span aria-labelledby="terms1" className="signup-form__text-check">이용약관 동의 (필수)</span>
                </label>
                <button className="signup-form__btn-terms" type="button">약관보기</button>
              </div>
              <div className="signup-form__term-wrap">
                <label className="signup-form__label-check" htmlFor="terms2">
                  <input className="signup-form__input-check required" id="terms2" name="terms" type="checkbox" />
                  <i className="signup-form__ico-check"></i>
                  <span aria-labelledby="terms2" className="signup-form__text-check">개인정보 수집 · 이용 동의 (필수)</span>
                </label>
                <button className="signup-form__btn-terms" type="button">약관보기</button>
              </div>
              <div className="signup-form__term-wrap">
                <label className="signup-form__label-check" htmlFor="terms4">
                  <input className="signup-form__input-check required" id="terms4" name="terms" type="checkbox" />
                  <i className="signup-form__ico-check"></i>
                  <span aria-labelledby="terms4" className="signup-form__text-check">본인은 만 14세 이상입니다. (필수)</span>
                </label>
                <button className="signup-form__btn-terms" type="button">약관보기</button>
              </div>
            </div>
          </div>
          <FormButton primary type="submit">가입하기</FormButton>
        </fieldset>
      </SignUpForm>
    </Section>
  )
};

export default SignUp;