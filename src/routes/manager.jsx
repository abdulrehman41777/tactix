import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Manager from "../pages/manager/Manager";
import { Navigate } from "react-router-dom";
import CreateRider from "../pages/CreateRider/CreateRider";
import Branches from "../pages/Branches/Branches";
import Main from "../pages/Main/Main";
import AllUsers from "../pages/AllUsers/AllUsers";
import AllRiders from "../pages/All-Rider/All_Rider";
import Parcel from "../pages/Parcel/Parcel";
import AddTax from "../pages/AddTax/AddTax";
import Parcel_Status from "../pages/Rider_Parcel/Rider_Parcel";
import CreateParcel from "../pages/CreateParcel/CreateParcel";

const manager = [
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
    path: "/dashboard/customer",
    element: <Manager />,
  },
  {
    path: "/dashboard/all-riders",
    element: <AllRiders />,
  },
  {
    path: "/dashboard/parcel",
    element: <Parcel />,
  },
  {
    path: "/dashboard/add-tax",
    element: <AddTax />,
  },
  {
    path: "/parcel-status/",
    element: <Parcel_Status />,
  },
  {
    path: "/dashboard/create-orders",
    element: <CreateParcel />,
  },
  {
    path: "/dashboard/create-rider",
    element: <CreateRider />,
  },
  {
    path: "/dashboard/all-user",
    element: <AllUsers />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/" />,
  },
];

export default manager;
