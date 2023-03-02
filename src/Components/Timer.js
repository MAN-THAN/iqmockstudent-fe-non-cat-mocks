import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Timer = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { initMinute = 0, initSeconds = 10 } = props;
  const [minutes, setMinutes] = useState(initMinute);
  const [seconds, setSeconds] = useState(initSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          //   clearInterval(myInterval);
          if (params.type === "varc") {
            navigate(`/main/${params.mockid}/lrdi`);
          }
          if (params.type === "lrdi") {
            navigate(`/main/${params.mockid}/quants`);
          }
          if (params.type === "quants") {
            //final submit api call
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <React.Fragment>
      <div>
        {minutes === 0 && seconds === 0 ? (
          <React.Fragment></React.Fragment>
        ) : (
          <React.Fragment>
            <span className="Timer">
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default Timer;
