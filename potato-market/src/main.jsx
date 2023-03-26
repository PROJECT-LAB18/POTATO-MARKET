// import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RecoilRoot } from "recoil";

import App from './App'

import NotFound from './components/NotFound';
import ChatPage from './pages/ChatPage';
import Home from './pages/Home';
import HotArticles from './pages/HotArticles/HotArticles';
import MyPage from './pages/MyPage';
import Detailarticle from './pages/productdetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import WriteArticle from './pages/WriteArticle';

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
