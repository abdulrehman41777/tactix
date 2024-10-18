import React from "react";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import YoursOrders from "../pages/YoursOrders/YoursOrders";
import Main from "../pages/Main/Main";
import CreateParcel from "../pages/CreateParcel/CreateParcel";
import Parcel from "../pages/Parcel/Parcel";
import { Navigate } from "react-router-dom";

const user = [
  {
    path: "/",
    element: <Main />,
  },
  // {
  //   path: "/dashboard/main",
  //   element: <Home />,
  // },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/your-orders",
    element: <YoursOrders />,
  },

  {
    path: "/dashboard/create-orders",
    element: <CreateParcel />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/your-orders" />,
  },
];

export default user;
