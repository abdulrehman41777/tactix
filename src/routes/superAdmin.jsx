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
    element: <Main />,
  },
  {
    path: "/dashboard/",
    element: <Home />,
  },
  {
    path: "/dashboard/admin", // Not using
    element: <SuperAdmin />,
  },
  {
    path: "/dashboard/branch/admins",
    element: <BranchAdmins />,
  },
  {
    path: "/dashboard/branch/groups",
    element: <AllGroups />,
  },
  {
    path: "/dashboard/branch/groups/all-riders/:id",
    element: <AllRiders />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },

  {
    path: "/dashboard/create-admin",
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
    path: "/dashboard/all-riders/:id",
    element: <AllRiders />,
  },

  {
    path: "/dashboard/groups",
    element: <AllGroups />,
  },

  {
    path: "/dashboard/branch",
    element: <Branches />,
  },
  {
    path: "/dashboard/branch/single-branch/:id",
    element: <SingleBranch />,
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
