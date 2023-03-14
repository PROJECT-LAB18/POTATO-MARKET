import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import firebase from './firebase';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/Global';

function App() {


  return (
    <React.Fragment>
      <GlobalStyle />
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