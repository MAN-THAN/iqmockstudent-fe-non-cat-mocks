import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitSection } from "../services/Mock_api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SubHeading } from "./../styleSheets/Style";
import { Typography } from "antd";

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
  if (response.status == 200) {
    window.localStorage.removeItem("COUNTER_KEY");
    window.localStorage.removeItem("questionStatus");
    if (subject === "varc") {
      console.log("varc submitted");
      navigate(`/main/${params.mockid}/lrdi`);
   
    } else if (subject === "lrdi") {
      console.log("lrdi submitted");
      navigate(`/main/${params.mockid}/quants`);
    } else if (subject === "quants") {
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
        if (params.type === "varc") {
          submitSectionFunc("varc");
        } else if (params.type === "lrdi") {
          submitSectionFunc("lrdi");
        } else if (params.type === "quants") {
          submitSectionFunc("quants");
        }
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    } else {
      window.localStorage.setItem("COUNTER_KEY", seconds - 1);
    }
  }, 1000);

  return () => {
    clearInterval(myInterval);
  };
}, [seconds, minutes]);
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    textAlign: "",
    height: 200,
    bgcolor: "white",
    borderRadius: "10px ",
    boxShadow: 24,
    p: 2,
    overflowY: "scroll",
  };



  return (
    <React.Fragment>
      <span>
        {minutes === 0 && seconds === 0 ? (
          <React.Fragment>
            <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <div style={{height : "100%", width : '100%'}} className="d-flex justify-content-between align-items-center">
                  <SubHeading style={{textAlign:"center", color : 'red'}} className="m-0 ps-1">Times Up!!!</SubHeading>
                </div>
              </Box>
            </Modal>
          </React.Fragment>
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
