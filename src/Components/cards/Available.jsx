import React from "react";
import style from "./available.module.css";
import { useNavigate } from "react-router-dom";
const Available = ({ message, to, isButton, buttonName }) => {
  const navigate = useNavigate();
  return (
    <div className={style.available_wrapper}>
      <h1>{message}</h1>
      {isButton && <button onClick={() => navigate(to)}>{buttonName}</button>}
    </div>
  );
};

export default Available;
