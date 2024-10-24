import React from "react";
import logo from "../../assets/main/logo=.png";
import style from "./Dsidebar.module.css";
import { AiFillHome } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { BiGitBranch, BiSolidLogOut } from "react-icons/bi";
import { logout } from "../../redux/features/authState";
import { BsBox2Fill, BsPeopleFill } from "react-icons/bs";
import {
  MdOutlineAddCircle,
} from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdPersonAdd } from "react-icons/io";


const DSidebar = ({ sidebarIsActive, setSidebarIsActive }) => {
  const selector = useSelector((state) => state?.userData);
  const dispatch = useDispatch();
  const role = selector?.data?.user?.role[0];

  const branchID = selector?.data?.user.branchID


  const superAdmin = [
    {
      path: "/dashboard/main",
      name: "Main Dashboard",
      icon: <AiFillHome />,
    },

    {
      path: "/dashboard/parcel",
      name: "All Parcel",
      icon: <BsBox2Fill />,
    },

    {
      path: "/dashboard/branch",
      name: "Branch",
      icon: <BiGitBranch />,
    },
    {
      path: "/dashboard/create-admin",
      name: "Create Admin",
      icon: <IoMdPersonAdd />,
    },
    {
      path: "/dashboard/All-admin",
      name: "All Admin",
      icon: <GrUserAdmin />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <CgProfile />,
    },

  ];

  const admin = [
    {
      path: "/dashboard/main",
      name: "Main Dashboard",
      icon: <AiFillHome />,
    },

    {
      path: "/dashboard/manager",
      name: "Manager",
      icon: <RiAdminFill />,
    },

    {
      path: "/dashboard/groups",
      name: "All Groups",
      icon: <BsPeopleFill />,
    },
    {
      path: "/dashboard/create-manager",
      name: "Create Manager",
      icon: <BsPeopleFill />,
    },

    {
      path: "/dashboard/parcel",
      name: "All Parcel",
      icon: <BsBox2Fill />,
    },
    {
      path: "/dashboard/all-user",
      name: "All Users",
      icon: <BsPeopleFill />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
  ];

  const unAssignedAdmin = [
    {
      path: "/dashboard/main",
      name: "Main Dashboard",
      icon: <AiFillHome />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
  ]

  const manager = [
    {
      path: "/dashboard",
      name: "Main Dashboard",
      icon: <AiFillHome />,
    },

    {
      path: "/dashboard/all-user",
      name: "Customers",
      icon: <BsPeopleFill />,
    },
    {
      path: "/dashboard/groups",
      name: "Driver Crew",
      icon: <BsPeopleFill />,
    },


    {
      path: "/dashboard/parcel",
      name: "All Parcel",
      icon: <BsBox2Fill />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
  ];
  const user = [


    {
      path: "/dashboard/your-orders",
      name: "Your Orders",
      icon: <ImTruck />,
    },
    {
      path: "/dashboard/create-orders",
      name: "Add Parcel",
      icon: <MdOutlineAddCircle />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
  ];
  const rider = [
    {
      path: "/dashboard/",
      name: "Main Dashboard",
      icon: <AiFillHome />,
    },
    {
      path: "/dashboard/rider-group-parcel",
      name: "Crew Parcels",
      icon: <BsBox2Fill />,
    },
    {
      path: "/dashboard/rider-parcel",
      name: "Your Parcels",
      icon: <BsBox2Fill />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
  ];

  let sideLinks = [];

  if (role === "SuperAdmin") {
    sideLinks = superAdmin;
  } else if (role === "Admin") {
    if (branchID && branchID !== null) {
      sideLinks = admin;
    } else {
      sideLinks = unAssignedAdmin
    }
  } else if (role === "Manager") {
    sideLinks = manager;
  } else if (role === "User") {
    sideLinks = user;
  } else if (role === "Rider") {
    sideLinks = rider;
  }
  return (
    <div
      className={
        sidebarIsActive ? style.sidebar_wrapper_active : style.sidebar_wrapper
      }
    >
      <div
        className={style.close_sidebar}
        onClick={() => setSidebarIsActive(false)}
        style={{ color: "var(--light-heading)" }}
      >
        <IoMdClose />
      </div>
      <div className={style.Dsidebar_img}>
        <img src={logo} alt="" />
      </div>
      <div>
        <ul className={style.sidebar_ul}>

          {
            sideLinks?.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item?.path}
                  className={({ isActive }) =>
                    isActive ? `${style.li_active}` : `${style.li}`
                  }
                >
                  <div className={style.inner_link}>
                    {item?.icon}
                    <p>{item?.name}</p>
                  </div>
                </NavLink>
              </li>
            ))}

          <li onClick={() => dispatch(logout())}>
            <NavLink
              to="/dashboard/login"
              className={({ isActive }) =>
                isActive ? `${style.li_active}` : `${style.li}`
              }
            >
              <div className={style.inner_link}>
                <BiSolidLogOut className={style.icons} />
                <p>Logout</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DSidebar;
