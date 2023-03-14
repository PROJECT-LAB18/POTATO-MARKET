import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import firebase from './firebase';
import Productdetail from './pages/productdetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
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
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route element={<SignIn />} path="/signin" />
            <Route element={<SignUp />} path="/signup" />
          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;
