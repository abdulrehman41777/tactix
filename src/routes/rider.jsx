import React from "react";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Main from "../pages/Main/Main";
import Rider_Parcel from "../pages/Rider_Parcel/Rider_Parcel";

const rider = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dashboard/",
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
];

export default rider;
