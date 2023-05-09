import { useEffect, lazy, Suspense } from "react";

import { Outlet } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState  } from "recoil";

import { auth, db } from "@/api/firebase";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { onChat } from "@/stores/onChat";
import { userId, userInformation } from "@/stores/userAuth.js"
import GlobalStyle from "@/styles/Global";

const Comment = lazy(() => import("./components/comment"));

function App() {
  const [userUid, setUserUid] = useRecoilState(userId);
  const chat = useRecoilValue(onChat);
  const setUserInfo = useSetRecoilState (userInformation);

  // 로그인 상태 체크 (로그인/로그아웃/새로고침 시 실행)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const userInfoRef = db.collection("users").doc(user.uid);
        userInfoRef.get().then((doc) => {
          setUserUid(user.uid);
          setUserInfo({
            location: doc.data().location,
            agree: doc.data().agree,
            email: doc.data().email,
            nickname: doc.data().nickname,
            phoneNumber: doc.data().phoneNumber,
            profileImage: doc.data().profileImage,
          });
        });
      } 
    });
  }, [setUserInfo, setUserUid, userUid]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Header />
        {chat && (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Comment />
          </Suspense>
        )}
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
export default App;