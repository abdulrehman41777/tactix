import { Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Main from "../pages/Main/Main";
import Forgot_Pass from "../pages/ForgotPass/Forgot_Pass";
import New_Pass from "../pages/ForgotPass/New_Pass";

const logout = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dashboard/login",
    element: <Login />,
  },
  {
    path: "/dashboard/sign-up",
    element: <SignUp />,
  },
  {
    path: "/dashboard/forgot-password",
    element: <Forgot_Pass />,
  },
  {
    path: "/dashboard/new-password",
    element: <New_Pass />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/login" />,
  },
];

export default logout;
