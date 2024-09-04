import React, { useState } from "react";
import DSidebar from "../DSidebar/DSidebar";
import style from "./Dlayout.module.css";
import { IoIosMoon } from "react-icons/io";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsBell, BsSunFill } from "react-icons/bs";
import { HiMiniBars3 } from "react-icons/hi2";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";

const Dlayout = ({ children, pageName, search, setSearch }) => {
  const [DarkMode, isDarkMode] = useState(false);
  const [sidebarIsActive, setSidebarIsActive] = useState(false);
  const isDark = useSelector((state) => state.appTheme.isDark);

  // User Data
  const selector = useSelector((state) => state?.userData);
  const User_Data = selector?.data?.user;
  const First_Name = User_Data?.name?.split(" ")[0]?.charAt(0);
  const Second_Name = User_Data?.name?.split(" ")[1]?.charAt(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTheme = () => {
    isDarkMode(!DarkMode);
    dispatch(toggleTheme());
  };

  return (
    <div>
      <DSidebar
        sidebarIsActive={sidebarIsActive}
        setSidebarIsActive={setSidebarIsActive}
      />
      <div className={style.d_body}>
        <header className={style.home_name}>
          <div>
            <p className={style.header_heading}>Pages / {pageName}</p>
            <h1 className={style.header_heading}>{pageName}</h1>
          </div>
          <div className={style.header_right}>
            <div className={style.header_input_wrapper}>
              <BiSearchAlt2 />
              <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <BsBell className={style.icon} />
            <HiMiniBars3
              className={`${style.bars} ${style.icon}`}
              onClick={() => setSidebarIsActive(true)}
            />
            {!isDark ? (
              <BsSunFill
                onClick={handleTheme}
                className={style.icon}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <IoIosMoon
                onClick={handleTheme}
                style={{ cursor: "pointer" }}
                className={style.icon}
              />
            )}
            <h4
              onClick={() => navigate("/dashboard/profile")}
              style={{ textTransform: "uppercase" }}
              title={User_Data?.name}
            >
              {First_Name}
              {Second_Name}
            </h4>
          </div>
        </header>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {children}
          <div className={style.footer_warpper}>
            <p className={style.footer_title}>
              © 2023 Tachyon. All Rights Reserved.
            </p>
            <div className={style.footer_links}>
              <p>Support</p>
              <p>License</p>
              <p>Terms of Use</p>
              <p>Blog</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dlayout;
