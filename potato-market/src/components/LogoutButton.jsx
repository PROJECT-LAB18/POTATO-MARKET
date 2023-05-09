import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";

import styled from "styled-components";

import firebase from "@/api/firebase";
import { toggle } from "@/stores/toggle";
import { userId, userInformation } from "@/stores/userAuth.js"

const auth = firebase.auth();

function LogoutButton() {
  const setShowToggle = useSetRecoilState(toggle);
  const setUserInfo = useSetRecoilState(userInformation);
  const setUserUid = useSetRecoilState(userId);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserUid(null);
      setUserInfo({
        location: "",
        agree: "",
        email: "",
        nickname: "",
        phoneNumber: "",
        profileImage: "",
      });
      setShowToggle(false);
      navigate("/");
    } catch (error) {
      // console.error(error);
    }
  }

  return <Button onClick={handleLogout}>로그아웃</Button>;
};

const Button = styled.button`
  background-color: transparent;
  font-size: 1.125rem;
	font-weight: 700;
  border: 0;
  color: #212325;
  padding: 0;
  cursor: pointer;
`;

export default LogoutButton;