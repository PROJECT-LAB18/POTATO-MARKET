import { useNavigate } from 'react-router-dom';

import { useRecoilState } from "recoil";
import styled from 'styled-components';

import { toggle } from '../stores/toggle';
import { userId } from '../stores/userAuth';

import firebase from '@/firebase';

const auth = firebase.auth();
const navigate = useNavigate;

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
  const [login, setLogin] = useRecoilState(userId);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLogin(null);
      setShowToggle(false);

    } catch (error) {
      console.error(error);
    }
  }

  return (
   <Button onClick={handleLogout}>로그아웃</Button>
  )
};



export default LogoutButton;