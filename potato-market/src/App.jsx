import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import firebase from './firebase';
import GlobalStyle from './styles/Global';

import { useRecoilState } from "recoil";
import { userId } from "@/stores/userAuth.js"

function App() {
  const [test,setTest] = useRecoilState(userId);
  
  // 로그인 상태 체크 (로그인/로그아웃/새로고침 시 실행)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // const db = firebase.firestore();
        // const userInfoRef = db.collection("users").doc(user.uid);
        // userInfoRef.get().then((doc) => {
        //   console.log(`로그인상태\nUID : ${user.uid} \n닉네임 : ${doc.data().nickname}`);
        // })
        let uid = user.uid;
        // console.log(`로그인상태\nUID : ${uid}`);
        setTest(uid);
        // console.log(test);
      } else {
        console.log('로그아웃상태');
      }
    });
  }, [test]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Header />
        <LogoutButton />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
export default App;
