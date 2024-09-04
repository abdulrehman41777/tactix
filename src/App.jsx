import "./App.css";
import { useRoutes } from "react-router-dom";
import superAdmin from "./routes/superAdmin";
import admin from "./routes/admin";
import { useSelector } from "react-redux";
import manager from "./routes/manager";
import logout from "./routes/logout";
import user from "./routes/user";
import rider from "./routes/rider";

function App() {
  const isDark = useSelector((state) => state.appTheme.isDark);
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const mainAdminRole = useRoutes(superAdmin);
  const AdminRole = useRoutes(admin);
  const ManagerRole = useRoutes(manager);
  const UserRole = useRoutes(user);
  const RiderRole = useRoutes(rider);
  const LogoutRole = useRoutes(logout);

  let routes;
  switch (role) {
    case "SuperAdmin":
      routes = mainAdminRole;
      break;
    case "Admin":
      routes = AdminRole;
      break;
    case "Manager":
      routes = ManagerRole;
      break;
    case "User":
      routes = UserRole;
      break;
    case "Rider":
      routes = RiderRole;
      break;
    default:
      routes = LogoutRole;
      break;
  }

  return <div data-theme={isDark ? "dark" : "light"}>{routes}</div>;
}

export default App;
