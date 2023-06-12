import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { submitSection } from "../services/Mock_api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SubHeading } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { Button } from "antd";

const Timer = ({ initMinute, initSeconds, studentAnswersData, mockId, type }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [minutes, setMinutes] = useState(initMinute);
  const [seconds, setSeconds] = useState(initSeconds);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(type);
  const [err, setErr] = useState(false);

  const COUNTER_KEY_SEC = "my-counter-sec";
  const COUNTER_KEY_MIN = "my-counter-min";

  const attemptID = JSON.parse(window.localStorage.getItem("attemptId"));

  // taking the local storage value of timer
  useEffect(() => {
    let countDownTimeSec = window.localStorage.getItem(COUNTER_KEY_SEC) || initSeconds;
    let countDownTimeMin = window.localStorage.getItem(COUNTER_KEY_MIN) || initMinute;
    setSeconds(countDownTimeSec);
    setMinutes(countDownTimeMin);
  }, []);
  // console.log(studentAnswersData);
  // memoize submitSectionFunc using useCallback hook

  const submitSectionFunc = async (subject) => {
    console.log("working");
    console.log(studentAnswersData);
    try {
      const response = await submitSection(attemptID, subject, studentAnswersData);
      console.log(response);
      if (response?.status == 200) {
        window.localStorage.removeItem(COUNTER_KEY_MIN);
        window.localStorage.removeItem(COUNTER_KEY_SEC);
        window.localStorage.removeItem("questionStatus");
        if (subject === "varc") {
          console.log("varc submitted");
          navigate(`/main`, {
            state: {
              mockId: mockId,
              type: "lrdi",
            },
          });
        } else if (subject === "lrdi") {
          console.log("lrdi submitted");
          navigate(`/main`, {
            state: {
              mockId: mockId,
              type: "quants",
            },
          });
        } else if (subject === "quants") {
          window.localStorage.removeItem("questionStatus");
          console.log("Your mock is submitted!!!");
          navigate(`/analysis/${mockId}/${attemptID}/overall`);
        }
        return true;
      }
    } catch (err) {
      console.log(err);
      setErr(true);
      return false;
    }
  };
  // [currentSection]

  // console.log(err)
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(myInterval);
          setIsLoaded(true);
          submitSectionFunc(currentSection).then((res) => {
            console.log(res);
            if (res) {
              setMinutes(initMinute);
              setSeconds(initSeconds);
              if (currentSection === "varc") {
                setCurrentSection("lrdi");
              } else if (currentSection === "lrdi") {
                setCurrentSection("quants");
              } else if (currentSection === "quants") {
                setCurrentSection("");
              }
              setIsLoaded(false);
            }
          });
        }
      }

      window.localStorage.setItem(COUNTER_KEY_MIN, minutes);
      window.localStorage.setItem(COUNTER_KEY_SEC, seconds);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds, minutes, currentSection]);

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
            <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                {!err ? (
                  <>
                    {" "}
                    <div style={{ marginTop: "3em" }} className="d-flex justify-content-center">
                      <SubHeading className="m-4 ps-3">Submitting Section... </SubHeading>
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
                ) : (
                  <>
                    <div style={{ marginTop: "3em" }} className="d-flex justify-content-center">
                      <SubHeading className="m-4 ps-3">Submitting Section... </SubHeading>
                    </div>
                    <div className="d-flex justify-content-center" style={{ marginTop: "1em" }}>
                      <div style={{ marginLeft: "12px" }}>
                        {" "}
                        <SubHeading style={{ color: "red" }} className="m-4 ps-3">
                          Some Error Occurred!!!{" "}
                        </SubHeading>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4 ">
                      <Button onClick={() => window.location.reload()}>Try Again</Button>
                    </div>
                  </>
                )}
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
