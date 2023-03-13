import React, { useState, useEffect } from 'react';


import firebase from './firebase';
import Productdetail from './pages/productdetail';
import GlobalStyle from './styles/Global';


function App() {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(isFirebaseConnected+'User is signed in.');
      } else {
        console.log('User is signed out.');
      }
      setIsFirebaseConnected(true);
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Productdetail/>
    </React.Fragment>
  );
}
export default App;
