import React from "react";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import YoursOrders from "../pages/YoursOrders/YoursOrders";
import Main from "../pages/Main/Main";
import CreateParcel from "../pages/CreateParcel/CreateParcel";
import Parcel from "../pages/Parcel/Parcel";

const user = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dashboard/",
    element: <Home />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/your-orders",
    element: <YoursOrders />,
  },
  {
    path: "/dashboard/parcel",
    element: <Parcel />,
  },
  {
    path: "/dashboard/create-orders",
    element: <CreateParcel />,
  },
];

export default user;
