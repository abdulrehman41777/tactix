import React from "react";
import style from "./piechart.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PieC = () => {
  const data = [
    { name: "Group A", value: 800 },
    { name: "Group B", value: 200 },
    { name: "Group C", value: 100 },
  ];

  const COLORS = ["#4318FF", "#6AD2FF", "#EEF3FA"];
  return (
    <div className={style.piecharts_wrapper}>
      <div className={style.piecharts_head}>
        <h3>Your Pie Chart</h3>
        <select className={style.piecharts_select}>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className={style.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={style.peichart_detail_wrapper}>
        <div className={style.peichart_detail}>
          <div className={style.peichart_detail_name}>
            <span className={style.peichart_detail_first_span}></span>
            <p>files</p>
          </div>
          <h5>62%</h5>
        </div>
        <div className={style.peichart_detail_line}></div>
        <div className={style.peichart_detail}>
          <div className={style.peichart_detail_name}>
            <span className={style.peichart_detail_second_span}></span>
            <p>system</p>
          </div>
          <h5>62%</h5>
        </div>
      </div>
    </div>
  );
};

export default PieC;
