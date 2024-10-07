import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import { Navigate } from "react-router-dom";
import CreateAdmin from "../pages/createAdmin/CreateAdmin";
import Branches from "../pages/Branches/Branches";
import Main from "../pages/Main/Main";
import AllUsers from "../pages/AllUsers/AllUsers";
import Parcel from "../pages/Parcel/Parcel";
import AllRiders from "../pages/All-Rider/All_Rider";
import AllGroups from "../pages/AllGroups/AllGroups";
import SingleBranch from "../pages/SingleBranch/SingleBranch";
import BranchAdmins from "../pages/BranchAdmins/BranchAdmins";
import BranchParcels from "../pages/Parcel/BranchParcels";
import Admin from "../pages/admin/Admin";

const superAdmin = [
  {
    path: "/",
    element: <Main />, // working
  },
  {
    path: "/dashboard/main",
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
    path: "/dashboard/branch/parcels",
    element: <BranchParcels />, // working
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
    path: "/dashboard/All-admin",
    element: <Admin />, // working
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
    element: <Navigate to="/dashboard/main" />,
  },
];

export default superAdmin;
