import SuperAdmin from "../pages/super-admin/SuperAdmin";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Admin from "../pages/admin/Admin";
import { Navigate } from "react-router-dom";
import CreateAdmin from "../pages/createAdmin/CreateAdmin";
import Branches from "../pages/Branches/Branches";
import Main from "../pages/Main/Main";
import AllUsers from "../pages/AllUsers/AllUsers";
import AddCountries from "../pages/AddCountries/AddCountries";
import Parcel from "../pages/Parcel/Parcel";
import AddTax from "../pages/AddTax/AddTax";
import AllRiders from "../pages/All-Rider/All_Rider";
import AllGroups from "../pages/AllGroups/AllGroups";
import SingleBranch from "../pages/SingleBranch/SingleBranch";
import BranchAdmins from "../pages/BranchAdmins/BranchAdmins";

const superAdmin = [
  {
    path: "/",
    element: <Main />, // working
  },
  {
    path: "/dashboard/",
    element: <Home />, // working
  },

  {
    path: "/dashboard/branch",
    element: <Branches />, // working
  },

  {
    path: "/dashboard/branch/single-branch/:id",
    element: <SingleBranch />, // working
  },

  {
    path: "/dashboard/branch/admins",
    element: <BranchAdmins />, // working
  },

  {
    path: "/dashboard/branch/groups",
    element: <AllGroups />, // working
  },
  {
    path: "/dashboard/branch/groups/all-riders/:id",
    element: <AllRiders />, // working
  },
  {
    path: "/dashboard/profile",
    element: <Profile />, // working
  },

  {
    path: "/dashboard/create-admin",
    element: <CreateAdmin />, // working
  },
  {
    path: "/dashboard/branch/users",
    element: <AllUsers />, // pending
  },

  {
    path: "/dashboard/parcel",
    element: <Parcel />, // working
  },

  {
    path: "*",
    element: <Navigate to="/dashboard/" />,
  },
];

export default superAdmin;
