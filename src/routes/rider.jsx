import React from "react";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Main from "../pages/Main/Main";
import Rider_Parcel from "../pages/Rider_Parcel/Rider_Parcel";
import { Navigate } from "react-router-dom";

const rider = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dashboard/main",
    element: <Home />,
  },
  {
    path: "/dashboard/rider-parcel",
    element: <Rider_Parcel />,
  },

  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/main" />,
  },
];

export default rider;
