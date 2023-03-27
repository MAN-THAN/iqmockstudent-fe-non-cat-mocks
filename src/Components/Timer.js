import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitSection } from "../services/Mock_api";

const Timer = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { initMinute, initSeconds, studentAnswersData } = props;
  const [minutes, setMinutes] = useState(initMinute);
  const [seconds, setSeconds] = useState(initSeconds);
  const COUNTER_KEY = "my-counter";
  const attemptID = JSON.parse(window.localStorage.getItem("userData"))?.attemptId;

  // taking the local storage value of timer
  useEffect(() => {
    let countDownTime = window.localStorage.getItem(COUNTER_KEY) || 0;
    setSeconds(countDownTime);
  }, []);

  // submitting section wise
  const submitSectionFunc = async (subject) => {
    const response = await submitSection(attemptID, subject, studentAnswersData);
    if (response?.status == 200) {
      if (subject === "varc") {
        window.localStorage.removeItem("questionStatus");
        console.log("varc submitted");
        navigate(`/main/${params.mockid}/lrdi`);
      } else if (subject === "lrdi") {
        window.localStorage.removeItem("questionStatus");
        console.log("lrdi submitted");
        navigate(`/main/${params.mockid}/quants`);
      } else if (subject === "quants") {
         window.localStorage.removeItem("questionStatus");
        console.log("Your mock is submitted!!!");
        navigate(`/analysis/${attemptID}/overall`);
      }
    }
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
            submitSectionFunc("varc");
          }
          if (params.type === "lrdi") {
            submitSectionFunc("lrdi");
          }
          if (params.type === "quants") {
            submitSectionFunc("quants");
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
