import { useRecoilState } from "recoil";

import firebase from '@/firebase';
import { userInformation } from "@/stores/userAuth.js"

const auth = firebase.auth();

function LogoutButton() {
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button type="button" onClick={handleLogout}>로그아웃</button>
  )
};

export default LogoutButton;