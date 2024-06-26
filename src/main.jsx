import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import {
  Post,
  Login,
  Signup,
  AllPosts,
  AddPost,
  EditPost,
  Verified,
  Verification,
  ResetPassword,
  Profile,
  MyPost,
} from "./pages/pages.js";
import { AuthLayout } from "./components";
import CreatePassRecovery from "./pages/CreatePassRecovery.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/my-post",
        element: (
          <AuthLayout authentication>
            <MyPost />
          </AuthLayout>
        ),
      },
      {
        path: "/verify",
        element: <Verified />,
      },
      {
        path: "/verification",
        element: <Verification />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/password-recovery",
        element: <CreatePassRecovery />,
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
