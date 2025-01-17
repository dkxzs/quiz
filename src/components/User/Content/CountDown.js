import { useEffect, useState } from "react";

const CountDown = (props) => {
  const { onTimeUp } = props;
  const [count, setCount] = useState(300);

  useEffect(() => {
    if (count === 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  const toHHMMSS = (secs) => {
    let sec_num = parseInt(secs, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  return <div className="countdown-container">{toHHMMSS(count)}</div>;
};

export default CountDown;
