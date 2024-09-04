import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import style from "./barC.module.css";
import { HiMiniChartBarSquare } from "react-icons/hi2";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BarC = () => {
  return (
    <div className={style.barChart_wrapper}>
      <div>
        <h3>Weekly Revenue</h3>
        <div className={style.bar_icon}>
          <HiMiniChartBarSquare />
        </div>
      </div>
      <div className={style.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="uv" fill="#7655FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarC;
