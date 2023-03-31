import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitSection } from "../services/Mock_api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SubHeading } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { Puff, InfinitySpin } from "react-loader-spinner";

const Timer = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { initMinute, initSeconds, studentAnswersData } = props;
  const [minutes, setMinutes] = useState(initMinute);
  const [seconds, setSeconds] = useState(initSeconds);
  const COUNTER_KEY_SEC = "my-counter-sec";
  const COUNTER_KEY_MIN = "my-counter-min";
  const attemptID = JSON.parse(window.localStorage.getItem("userData"))?.attemptId;

  // taking the local storage value of timer
  useEffect(() => {
    let countDownTimeSec = window.localStorage.getItem(COUNTER_KEY_SEC) || initSeconds;
    let countDownTimeMin = window.localStorage.getItem(COUNTER_KEY_MIN) || initMinute;
    setSeconds(countDownTimeSec);
    setMinutes(countDownTimeMin);
  }, []);

  // memoize submitSectionFunc using useCallback hook
  const submitSectionFunc = useCallback(async (subject) => {
    const response = await submitSection(attemptID, subject, studentAnswersData);
    if (response.status === 200) {
      window.localStorage.removeItem(COUNTER_KEY_MIN);
      window.localStorage.removeItem(COUNTER_KEY_SEC);
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
  }, [attemptID, navigate, params.mockid, studentAnswersData]);



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
          if (minutes > 0) {
            setMinutes(minutes - 1);
          }
          setSeconds(59);
        }
      } else {
        window.localStorage.setItem(COUNTER_KEY_MIN, minutes);
        window.localStorage.setItem(COUNTER_KEY_SEC, seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
      }, [seconds, minutes, params.type, submitSectionFunc]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    textAlign: "",
    height: 400,
    bgcolor: "white",
    borderRadius: "10px ",
    boxShadow: 24,
    p: 0,
    m: 0,
  };

  return (
    <React.Fragment>
      <span>
        {minutes === 0 && seconds === 0 ? (
          <React.Fragment>
            <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <>
                  {" "}
                  <div style={{ marginTop: "3em" }} className="d-flex justify-content-center">
                    <SubHeading className="m-4 ps-3">Section Submitting... </SubHeading>
                  </div>
                  <div className="d-flex justify-content-center" style={{ marginTop: "1em" }}>
                    <div style={{ marginLeft: "12px" }}>
                      {" "}
                      <InfinitySpin color="blue" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-4 ">
                    <Typography>Please Wait...</Typography>
                  </div>
                </>
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
