import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import firebase from './firebase';

import GlobalStyle from './styles/Global';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인상태 저장 예정

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log('로그인상태', uid);
      } else {
        console.log('로그아웃상태');
      }
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App">
        <Header />
        <LogoutButton />
        <Outlet />
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default App;
