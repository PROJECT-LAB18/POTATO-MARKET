import { Link } from "react-router-dom";

import { useRecoilValue } from "recoil";
import styled from "styled-components";

import toggleBox from "@/assets/header_toggle.svg";
import LogoutButton from "@/components/LogoutButton";
import { userId } from "@/stores/userAuth";

function Toggle() {
  const login = useRecoilValue(userId);

  return (
    <Div>
      {login === null ? (
        <ul>
          <li>
            <Link 
              className="textLink" 
              href="https://potato-market-lab18.web.app/signin" 
              to="/SignIn"
              >
              로그인
            </Link>
          </li>
          <li>
            <Link 
              className="textLink" 
              href="https://potato-market-lab18.web.app/signup" 
              to="/SignUp"
              >
              회원가입
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <LogoutButton />
          </li>
          <li>
            <Link 
              className="textLink" 
              href="https://potato-market-lab18.web.app/myPage" 
              to={"/myPage"}
              >
              마이페이지
            </Link>
          </li>
        </ul>
      )}
    </Div>
  );
}

const Div = styled.div`
  background-image: url(${toggleBox});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 213px;
  height: 135px;
  position: absolute;
  right: 16px;
  top: 53px;
  padding: 32px 40px;
  box-sizing: border-box;
  z-index: 100;

  ul {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 2.2rem;
  }

  .textLink {
    text-decoration: none;
    color: #212325;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Toggle;
