import SuperAdmin from "../pages/super-admin/SuperAdmin";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Admin from "../pages/admin/Admin";
import Manager from "../pages/manager/Manager";
import { Navigate } from "react-router-dom";
import CreateAdmin from "../pages/createAdmin/CreateAdmin";
import Branches from "../pages/Branches/Branches";
import Main from "../pages/Main/Main";
import AllUsers from "../pages/AllUsers/AllUsers";
import AddCountries from "../pages/AddCountries/AddCountries";
import Parcel from "../pages/Parcel/Parcel";
import AddTax from "../pages/AddTax/AddTax";

const superAdmin = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dashboard/",
    element: <Home />,
  },
  {
    path: "/dashboard/admin",
    element: <SuperAdmin />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },

  {
    path: "/dashboard/create-admin/:id",
    element: <CreateAdmin />,
  },
  {
    path: "/dashboard/manager",
    element: <Admin />,
  },
  {
    path: "/dashboard/countries",
    element: <AddCountries />,
  },
  {
    path: "/dashboard/all-user",
    element: <AllUsers />,
  },
  {
    path: "/dashboard/customer",
    element: <Manager />,
  },
  {
    path: "/dashboard/branch",
    element: <Branches />,
  },
  {
    path: "/dashboard/add-tax",
    element: <AddTax />,
  },
  {
    path: "/dashboard/parcel",
    element: <Parcel />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/" />,
  },
];

export default superAdmin;
