import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Admin from "../pages/admin/Admin";
import { Navigate } from "react-router-dom";
import CreateManager from "../pages/CreateManager/CreateManager";
import Branches from "../pages/Branches/Branches";
import Main from "../pages/Main/Main";
import AllUsers from "../pages/AllUsers/AllUsers";
import AllRiders from "../pages/All-Rider/All_Rider";
import Parcel from "../pages/Parcel/Parcel";
import AddTax from "../pages/AddTax/AddTax";
import AllGroups from "../pages/AllGroups/AllGroups";

const admin = [
  {
    path: "/",
    element: <Main />, // working
  },
  {
    path: "/dashboard/",
    element: <Home />, // working
  },
  {
    path: "/dashboard/manager",
    element: <Admin />, // working
  },
  {
    path: "/dashboard/create-manager",
    element: <CreateManager />, // working
  },

  {
    path: "/dashboard/groups",
    element: <AllGroups />, // working
  },
  {
    path: "/dashboard/groups/all-riders/:id",
    element: <AllRiders />, // working
  },
  {
    path: "/dashboard/all-user",
    element: <AllUsers />, // working
  },

  {
    path: "/dashboard/parcel",
    element: <Parcel />, // working
  },

  {
    path: "/dashboard/profile",
    element: <Profile />, // working
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/" />,
  },
];

export default admin;
