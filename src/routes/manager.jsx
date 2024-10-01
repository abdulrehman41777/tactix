import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
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
import CreateGroups from "../pages/CreateGroups/CreateGroups";
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
    element: <Home />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/all-user/customer-profile/:id",
    element: <CustomerProfile />,
  },
  {
    path: "/dashboard/groups",
    element: <AllGroups />,
  },
  {
    path: "/dashboard/all-riders/:id",
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
    path: "/dashboard/create-rider/:id",
    element: <CreateRider />,
  },
  {
    path: "/dashboard/group-rider/:id",
    element: <CreateRider />,
  },
  {
    path: "/dashboard/create-group",
    element: <CreateGroups />,
  },
  {
    path: "/dashboard/all-user",
    element: <AllUsers />,
  },
  {
    path: "/dashboard/create-customer",
    element: <CreateCustomer />,
  },
  {
    path: "/dashboard/all-user/customer-profile/create-customer-order/:userId/:branchId",
    element: <CreateCustomerOrder />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/" />,
  },
];

export default manager;
