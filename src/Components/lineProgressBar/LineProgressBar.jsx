import { Line } from "rc-progress";

const LineProgressBar = ({ progress }) => {
  return (
    <>
      <Line percent={progress} strokeWidth={3} strokeColor="#422AFB" />
    </>
  );
};

export default LineProgressBar;
