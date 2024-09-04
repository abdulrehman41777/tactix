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

const Home = () => {
  return (
    <div>
      <Dlayout pageName={"Main Dashboard"}>
        <div className={style.home_header_wrapper}>
          <div className={style.home_slider_wrapper}>
            <div className={style.home_slider_box}>
              <span className={style.home_slider_span}>
                <ImStatsBars2 />
              </span>
              <div>
                <p>Earning</p>
                <h2>$308.4</h2>
              </div>
            </div>
            <div className={style.home_slider_box}>
              <span className={style.home_slider_span}>
                <BiDollar />
              </span>
              <div>
                <p>Spend This Month</p>
                <h2>$613.4</h2>
              </div>
            </div>
            <div className={style.home_slider_box}>
              <div>
                <p>Sales</p>
                <h2>$613.4</h2>
                <span className={style.Month_growth}>
                  <p>+23%</p> Since Last Month
                </span>
              </div>
            </div>
            <div
              className={style.home_slider_box}
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <p>Spend This Month</p>
                <h2>$613.4</h2>
              </div>
              <img src={flag} alt="no img found" />
            </div>
            <div className={style.home_slider_box}>
              <span className={style.home_slider_span}>
                <GiCheckMark />
              </span>
              <div>
                <p>New Task</p>
                <h2>154</h2>
              </div>
            </div>
            <div className={style.home_slider_box}>
              <span className={style.home_slider_span}>
                <BsFileTextFill />
              </span>
              <div>
                <p>Total Projects</p>
                <h2>1545</h2>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default Home;
