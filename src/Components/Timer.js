import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Timer = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { initMinute, initSeconds } = props;
  const [minutes, setMinutes] = useState(initMinute);
  const [seconds, setSeconds] = useState(initSeconds);
  const COUNTER_KEY = "my-counter";
  const attemptID = localStorage.getItem("attemptID");

  // taking the local storage value of timer=
  useEffect(() => {
    let countDownTime = window.localStorage.getItem(COUNTER_KEY) || 0;
    setSeconds(countDownTime);
    console.log("onload");
    
  }, []);

  const submitSectionFunc = async (subject) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/${attemptID}/${subject}/final`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    console.log(response);
    const json = await response.json();
    console.log(json?.success);
    // if (json?.success === true) {
    //   if (subject === "varc") {
    //     console.log("varc submitted");
    //     navigate(`/main/${params.mockid}/lrdi`);
    //   } else if (subject === "lrdi") {
    //     console.log("lrdi submitted");
    //     navigate(`/main/${params.mockid}/quants`);
    //   } else if (subject === "quants") {
    //     console.log("Your mock is submitted!!!");
    //   }
    // }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          //   clearInterval(myInterval);
          if (params.type === "varc") {
            // submitSectionFunc("varc");
          }
          if (params.type === "lrdi") {
            // submitSectionFunc("lrdi");
          }
          if (params.type === "quants") {
            // submitSectionFunc("quants");
            //final submit api call
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      if (seconds - 1 > 0) {
        // window.localStorage.setItem(COUNTER_KEY, seconds - 1);
      } else {
        window.localStorage.removeItem(COUNTER_KEY);
        clearInterval(myInterval);
        
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <React.Fragment>
      <span>
        {minutes === 0 && seconds === 0 ? (
          <React.Fragment></React.Fragment>
        ) : (
          <React.Fragment>
            <span className="Timer">
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </React.Fragment>
        )}
      </span>
    </React.Fragment>
  );
};
export default Timer;