import React from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./home.module.css";
import { ImStatsBars2 } from "react-icons/im";
import { BiDollar } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import flag from "../../assets/home/sidebar-flag.png";
import { BsFileTextFill } from "react-icons/bs";
import LineC from "../../Components/lineChart/LineC";
import BarC from "../../Components/barCharts/BarC";
import Task from "../../Components/task/Task";
import Calender from "../../Components/calender/Calender";
import Visitors from "../../Components/Visitors/Visitors";
import PieChart from "../../Components/PieChart/PieChart";
import { useSelector } from "react-redux";

const Home = () => {

  const selector = useSelector((state) => state?.userData);
  const userID = selector?.data?.user?._id;
  const branchName = selector?.data?.user.branchName

  const role = selector?.data?.user?.role[0];

  return (
    <Dlayout pageName={role !== "SuperAdmin" ? branchName : "Main Dashboard"}>
      <div className={style.home_header_wrapper}>

        {
          role === "User" ? '' : <div className={style.home_slider_wrapper}>
            <div className={style.home_slider_box}>

              {
                role === "SuperAdmin" && (
                  <div>
                    <p>Total Branches</p>
                    <h2>18</h2>
                  </div>
                )
              }

              {
                role === "Admin" && (
                  <div>
                    <p>Total Rider Groups</p>
                    <h2>18</h2>
                  </div>
                )
              }

              {
                role === "Manager" && (
                  <div>
                    <p>Total Rider Groups</p>
                    <h2>7</h2>
                  </div>
                )
              }

              {
                role === "Rider" && (
                  <div>
                    <p>Total Completed Parcels</p>
                    <h2>18</h2>
                  </div>
                )
              }
            </div>
            <div className={style.home_slider_box}>

              {
                role === "SuperAdmin" && (
                  <div>
                    <p>Completed Parcels</p>
                    <h2>20K+</h2>
                  </div>
                )
              }

              {
                role === "Admin" && (
                  <div>
                    <p>Completed Parcels</p>
                    <h2>5K+</h2>
                  </div>
                )
              }

              {
                role === "Manager" && (
                  <div>
                    <p>Completed Parcels</p>
                    <h2>5K+</h2>
                  </div>
                )
              }
              {
                role === "Rider" && (
                  <div>
                    <p>Un Assigned Group Parcels</p>
                    <h2>18</h2>
                  </div>
                )
              }
            </div>
            <div className={style.home_slider_box}>
              {
                role === "SuperAdmin" && (
                  <div>
                    <p>Total Rider Groups</p>
                    <h2>40</h2>
                  </div>
                )
              }

              {
                role === "Admin" && (
                  <div>
                    <p>Total Managers</p>
                    <h2>5</h2>
                  </div>
                )
              }

              {
                role === "Manager" && (
                  <div>
                    <p>Pending Parcels</p>
                    <h2>5</h2>
                  </div>
                )
              }
              {
                role === "Rider" && (
                  <div>
                    <p>Up-Coming Parcels For Delivery</p>
                    <h2>24</h2>
                  </div>
                )
              }
            </div>
            <div
              className={style.home_slider_box}
              style={{ justifyContent: "space-between" }}
            >
              {
                role === "SuperAdmin" && (
                  <div>
                    <p>Total Customers</p>
                    <h2>40</h2>
                  </div>
                )
              }

              {
                role === "Admin" && (
                  <div>
                    <p>Total Branch Customers</p>
                    <h2>5</h2>
                  </div>
                )
              }

              {
                role === "Manager" && (
                  <div>
                    <p>Total Branch Customers</p>
                    <h2>5</h2>
                  </div>
                )
              }
              {
                role === "Rider" && (
                  <div>
                    <p>Total Riders In Your Group</p>
                    <h2>11</h2>
                  </div>
                )
              }
            </div>
          </div>
        }


        <div className={style.first_bars_row}>
          <LineC />
          <BarC />
        </div>
        <div className={style.second_bars_row}>
          <Task />
          <Calender />
          <Visitors />
          <PieChart />
        </div>
      </div>
    </Dlayout>
  );
};

export default Home;
