import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { submitSection } from "../services/Mock_api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SubHeading } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { useTimer } from 'react-timer-hook';
import { Button } from "antd";
import { encode, decode } from "base-64";

const NewTimer = ({
  initMinute,
  initSeconds,
  studentAnswersData,
  mockId,
  type,
}) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(type);
  const [err, setErr] = useState(false);
  const COUNTER_KEY_SEC = "my-counter-sec";
  const COUNTER_KEY_MIN = "my-counter-min";
  const [counterTimeStamp,setCounterTimeStamp] = useState(Number(localStorage.getItem(COUNTER_KEY_MIN))*60+Number(localStorage.getItem(COUNTER_KEY_SEC)));
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds()+counterTimeStamp);
  console.log(counterTimeStamp)
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: ()=>submitSectionFunc(currentSection) });
 
 console.log("$$$$$$$$$$$$",expiryTimestamp.getSeconds())
  const attemptID = localStorage.getItem("attemptId");
  useEffect(() => {
    //alert('2!!!!!');
    console.log('init::',initMinute,initSeconds);
        //  setIsLoaded(true);
          // submitSectionFunc(currentSection).then((res) => {
          //   //console.log(res);
          //   if (res) {
          //     setCounterTimeStamp(initMinute*60+initSeconds);
          //     if (currentSection === "varc") {
          //       setCurrentSection("lrdi");
          //     } else if (currentSection === "lrdi") {
          //       setCurrentSection("quants");
          //     } else if (currentSection === "quants") {
          //       setCurrentSection("");
          //     }
          //     setIsLoaded(false);
          //   }
          // });
      window.localStorage.setItem(COUNTER_KEY_MIN, minutes);
      window.localStorage.setItem(COUNTER_KEY_SEC, seconds);

  }, [seconds, minutes, currentSection]);

  // taking the local storage value of timer
  // useEffect(() => {
  //   if(COUNTER_KEY_MIN && COUNTER_KEY_SEC){
  //     alert("1!!!!");
  //     let countDownTimeSec =
  //       window.localStorage.getItem(COUNTER_KEY_SEC) 
  //     let countDownTimeMin =
  //       window.localStorage.getItem(COUNTER_KEY_MIN)
  //       setCounterTimeStamp(countDownTimeMin*60+countDownTimeSec);
  //       console.log("53",counterTimeStamp);
  //   }
    
  // }, []);
  // //console.log(studentAnswersData);

  const submitSectionFunc = async (subject) => {
    setIsLoaded(true);
    // alert('submitSection');
    console.log("working");
    console.log(studentAnswersData);
    try {
      const uid = JSON.parse(localStorage.getItem("userData"))?._id;
      const response = await submitSection(
        attemptID,
        studentAnswersData,
        uid,
        subject
      );
      //console.log(response);
      if (response?.status == 200) {
        window.localStorage.removeItem(COUNTER_KEY_MIN);
        window.localStorage.removeItem(COUNTER_KEY_SEC);
        window.localStorage.removeItem("questionStatus");
        console.log("Your mock is submitted!!!");
        navigate(`/analysis/${mockId}/${attemptID}/overall`);
        return true;
      }
    } catch (err) {
      //console.log(err);
      setErr(true);
      return false;
    }
  };
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    border: "none",
    height: 400,
    bgcolor: "white",
    borderRadius: "20px ",
    boxShadow: 10,
    p: 0,
    m: 0,
  };

  return (
    <React.Fragment>
      <span>
        {isLoaded ? (
          <React.Fragment>
            <Modal
              open={true}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {!err ? (
                  <>
                    {" "}
                    <div
                      style={{ marginTop: "3em" }}
                      className="d-flex justify-content-center"
                    >
                      <SubHeading className="m-4 ps-3">
                        Submitting Section...{" "}
                      </SubHeading>
                    </div>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: "1em" }}
                    >
                      <div style={{ marginLeft: "12px" }}>
                        {" "}
                        <InfinitySpin color="blue" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4 ">
                      <Typography>Please Wait...</Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{ marginTop: "3em" }}
                      className="d-flex justify-content-center"
                    >
                      <SubHeading className="m-4 ps-3">
                        Submitting Section...{" "}
                      </SubHeading>
                    </div>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: "1em" }}
                    >
                      <div style={{ marginLeft: "12px" }}>
                        {" "}
                        <SubHeading
                          style={{ color: "red" }}
                          className="m-4 ps-3"
                        >
                          Some Error Occurred!!!{" "}
                        </SubHeading>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4 ">
                      <Button onClick={() => window.location.reload()}>
                        Try Again
                      </Button>
                    </div>
                  </>
                )}
              </Box>
            </Modal>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className="Timer">
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            
          </React.Fragment>
        )}
      </span>
    </React.Fragment>
  );
};
export default NewTimer;
