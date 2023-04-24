import { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RecoilRoot } from "recoil";

const App = lazy(()=> import("./App"));
const NotFound = lazy(()=> import("./components/NotFound"));
const ChatPage = lazy(()=> import("./pages/ChatPage"));
const Home = lazy(()=> import("./pages/Home"));
const HotArticles = lazy(()=> import("./pages/HotArticles"));
const MyPage = lazy(()=> import("./pages/MyPage"));
const Detailarticle = lazy(()=> import("./pages/productdetail"));
const SignIn = lazy(()=> import("./pages/SignIn"));
const SignUp = lazy(()=> import("./pages/SignUp"));
const WriteArticle = lazy(()=> import("./pages/WriteArticle"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound title={"페이지에 접근할 수 없습니다."} />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "hotarticles",
        element: <HotArticles />,
      },
      {
        path: "detailarticle/:id",
        element: <Detailarticle />
      },
      {
        path: "writearticle",
        element: <WriteArticle />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
  <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </RecoilRoot>
)
