import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import { Navigate } from "react-router-dom";
import CreateRider from "../pages/CreateRider/CreateRider";
import Main from "../pages/Main/Main";
import AllUsers from "../pages/AllUsers/AllUsers";
import AllRiders from "../pages/All-Rider/All_Rider";
import Parcel from "../pages/Parcel/Parcel";
import CreateParcel from "../pages/CreateParcel/CreateParcel";
import AllGroups from "../pages/AllGroups/AllGroups";
// import CreateUser from "../pages/CreateCustomer/CreateCustomer";
import CreateCustomer from "../pages/CreateCustomer/CreateCustomer";
import CustomerProfile from "../pages/CustomerProfile/CustomerProfile";
import CreateCustomerOrder from "../pages/CreateCustomerOrder/CreateCustomerOrder";

const manager = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/dashboard/",
    element: <Home />, //working
  },
  {
    path: "/dashboard/profile",
    element: <Profile />, //working
  },
  {
    path: "/dashboard/all-user/customer-profile/:id",
    element: <CustomerProfile />, //working
  },
  {
    path: "/dashboard/groups",
    element: <AllGroups />, //working
  },
  {
    path: "/dashboard/groups/all-riders/:id",
    element: <AllRiders />, // working
  },
  {
    path: "/dashboard/parcel",
    element: <Parcel />, //working
  },

  {
    path: "/dashboard/create-orders",
    element: <CreateParcel />, //working
  },
  {
    path: "/dashboard/create-rider/:id",
    element: <CreateRider />, //working
  },
  // {
  //   path: "/dashboard/create-group",
  //   element: <CreateGroups />,
  // },
  {
    path: "/dashboard/all-user",
    element: <AllUsers />, //working
  },
  {
    path: "/dashboard/create-customer",
    element: <CreateCustomer />, //working
  },
  {
    path: "/dashboard/all-user/customer-profile/create-customer-order/:userId/:branchId",
    element: <CreateCustomerOrder />, //working
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/" />,
  },
];

export default manager;
