import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RecoilRoot } from "recoil";

import App from './App'

import NotFound from './components/NotFound';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import HotArticles from './pages/HotArticles/HotArticles';
import MyPage from './pages/MyPage';
import Detailarticle from './pages/productdetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import WriteArticle from './pages/WriteArticle';

// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

// const textState = atom({
//   key: 'textState', // unique ID (with respect to other atoms/selectors)
//   default: '', // default value (aka initial value)
// });

// const charCountState = selector({
//   key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//   get: ({get}) => {
//     const text = get(textState);

//     return text.length;
//   },
// });

// function CharacterCount() {
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }

// function CharacterCounter() {
//   return (
//     <div>
//       <TextInput />
//       <CharacterCount />
//     </div>
//   );
// }


// function TextInput() {
//   const [text, setText] = useRecoilState(textState);

//   const onChange = (event) => {
//     setText(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={text} onChange={onChange} />
//       <br />
//       Echo: {text}
//     </div>
//   );
// }




// function App() {
//   return (
//     <RecoilRoot>
//       <CharacterCounter />
//     </RecoilRoot>
//   );
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound title={"페이지에 접근할 수 없습니다."} />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'hotarticles',
        element: <HotArticles />,
      },
      {
        path: 'detailarticle/:id',
        element: <Detailarticle />
      },
      {
        path: 'writearticle',
        element: <WriteArticle />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
)
