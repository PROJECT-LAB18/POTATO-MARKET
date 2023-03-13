import React from 'react';

import { RecoilRoot } from 'recoil';

import ChatPage from './pages/ChatPage';
import GlobalStyle from './styles/Global';


function App() {


  return (
    <React.Fragment>
      <RecoilRoot>
      <GlobalStyle/>
    <ChatPage/>
        
      </RecoilRoot>
    </React.Fragment>
  );
}
export default App;