<<<<<<< HEAD
import React from 'react';

import ChatPage from './pages/ChatPage';

 import GlobalStyle from './styles/Global.js';
=======
import React, { useState, useEffect } from 'react';

import firebase from './firebase';
import GlobalStyle from './styles/Global';

>>>>>>> 29342baf7e2098741fd8346cc3624bdd3801704d

function App() {

<<<<<<< HEAD

  return (
    <React.Fragment>
      <GlobalStyle/>
    <ChatPage/>
=======
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in.');
      } else {
        console.log('User is signed out.');
      }
      setIsFirebaseConnected(true);
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      {/* <h2>테스트~</h2> */}
>>>>>>> 29342baf7e2098741fd8346cc3624bdd3801704d
    </React.Fragment>
  );
}
export default App;