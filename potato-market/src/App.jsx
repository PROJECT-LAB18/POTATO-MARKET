import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import firebase from './firebase';
import HotArticles from './pages/HotArticles/HotArticles';
import WriteArticle from './pages/WriteArticle';

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
      <div className="App">
        <Header />
        <WriteArticle/>
        <HotArticles />
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default App;
