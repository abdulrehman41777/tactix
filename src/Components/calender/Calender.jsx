import Calendar from "react-calendar";
import "./Celender.css";

const Calender = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "99%",
        background: "var(--light-primary-background)",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <Calendar />
    </div>
  );
};

export default Calender;
