import { Line } from "rc-progress";

const LineProgressBar = ({ progress }) => {
  return (
    <>
      <Line percent={progress} strokeWidth={3} strokeColor="#D8788C" />
    </>
  );
};

export default LineProgressBar;
