import React, { useState, useEffect } from 'react';

import firebase from './firebase';
import Header from './pages/Header';
import GlobalStyle from './styles/Global';


function App() {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

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
      <Header/>
    </React.Fragment>
  );
}
export default App;
