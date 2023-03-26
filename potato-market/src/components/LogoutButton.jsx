import { useRecoilState } from "recoil";

import styled from 'styled-components';

import { toggle } from '../stores/toggle';

import firebase from '@/firebase';
import { userId, userInformation } from "@/stores/userAuth.js"

const auth = firebase.auth();

const Button = styled.button`
  background-color: transparent;
  font-size: 1.125rem;
	font-weight: 700;
  border: 0;
  color: #212325;
  padding: 0;
  cursor: pointer;
`

function LogoutButton() {

  const [showToggle, setShowToggle] = useRecoilState(toggle);
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  const [userUid, setUserUid] = useRecoilState(userId);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserUid(null);
      setUserInfo(null);
      setShowToggle(false);
      window.location.replace("/");

    } catch (error) {
      console.error(error);
    }
  }
  return (
   <Button onClick={handleLogout}>로그아웃</Button>
  )
};

export default LogoutButton;