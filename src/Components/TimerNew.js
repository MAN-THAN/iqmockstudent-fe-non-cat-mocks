import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { submitSection } from "../services/Mock_api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SubHeading } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { useTimer } from "react-timer-hook";
import { Button } from "antd";
import { Image } from "react-bootstrap";
import { MyButton } from "./../styleSheets/Style";
import { encode, decode } from "base-64";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSectionIndex } from "../store/slices/mockDataSlice";

const NewTimer = ({ expiryTimestamp, mockId }) => {
  const buttonStyle = {
    background: "linear-gradient(91.59deg, #FD4153 18.67%, #F77A5B 98.68%)",
    width: "138px",
    color: "#fff",
    borderRadius: "20px",
  };
  const navigate = useNavigate();
  const [state, setState] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const COUNTER_KEY_SEC = "my-counter-sec";
  const COUNTER_KEY_MIN = "my-counter-min";
  const dispatch = useDispatch();
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
  } = useTimer({
    expiryTimestamp,
    onExpire: () => submitSectionFunc(),
  });
  const attemptID = localStorage.getItem("attemptId");
  //Accessing redux store

  const { isToggleAllowed, studentResponse, sections, currentSectionIndex } = useSelector(
    (state) => state.mockData
  );
  const userData = useSelector(() => state.userData);
  useEffect(() => {
    //alert('2!!!!!');
    // //console.log('init::',initMinute,initSeconds);
    //  setIsLoaded(true);
    // submitSectionFunc(currentSection).then((res) => {
    //   ////console.log(res);
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
    // window.localStorage.setItem(COUNTER_KEY_MIN, minutes);
    // window.localStorage.setItem(COUNTER_KEY_SEC, seconds);
  }, [seconds, minutes]);
  console.log(expiryTimestamp);
  const submitSectionFunc =  (subject) => {
    // alert('submitSection');
    ////console.log("working");
    ////console.log(studentAnswersData);
    if (!isToggleAllowed) {
      setIsLoaded(true);
      // setCounterTimeStamp(2)
      // restart(expiryTimestamp.getSeconds() + 2*60);
      try {
        const uid = userData?._id;
        // const response = await submitSection(
        //   attemptID,
        //   studentAnswersData,
        //   uid,
        //   subject
        // );
        ////console.log(response);
        if (true) {
          // window.localStorage.removeItem(COUNTER_KEY_MIN);
          // window.localStorage.removeItem(COUNTER_KEY_SEC);
          // window.localStorage.removeItem("questionStatus");
          // window.localStorage.removeItem("lastAttemptedQuestionIndex");
          // setState(2);
          // //console.log("Your mock is submitted!!!");
          // navigate(`/analysis/${mockId}/${attemptID}/overall`);
          // return true;
          dispatch(setCurrentSectionIndex(currentSectionIndex+1));
          // window.localStorage.setItem(COUNTER_KEY_MIN, 2);
          setIsLoaded(false);
          // navigate(`/main`);
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
        setState(3);
        //setErr(true);
        return false;
      }
      return;
    }
    // setIsLoaded(true);
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
              {/* <Box sx={style}>
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
              </Box> */}
              <Box sx={style}>
                {state === 1 ? (
                  <>
                    {" "}
                    <div
                      style={{ marginTop: "3em" }}
                      className="d-flex justify-content-center"
                    >
                      <SubHeading className="m-4 ps-3">
                        Submitting Test...{" "}
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
                ) : state === 2 ? (
                  <>
                    {" "}
                    <div
                      className="d-flex justify-content-center"
                      style={{ height: "50%", width: "100%" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          backgroundColor: "#0075FF",
                          width: "100%",
                          borderTopLeftRadius: "10px ",
                          borderTopRightRadius: "10px ",
                        }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Image
                          className="img-fluid text-center ps-4 "
                          src="/Group103.png"
                          alt="no IMage"
                          width={300}
                        ></Image>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                      <SubHeading
                        style={{ fontWeight: "800" }}
                        className="m-4 ps-3"
                      >
                        Thank You!{" "}
                      </SubHeading>
                    </div>
                    <div className="d-flex justify-content-center text-muted">
                      <Typography fontWeight={700}>
                        Congrats! You have completed the Mock test
                      </Typography>
                    </div>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: "1em" }}
                    >
                      <MyButton
                        variant="contained"
                        sx={{
                          ...buttonStyle,
                          background:
                            " linear-gradient(90.38deg, #2400FF 5.86%, #725BFF 99.82%)",
                          borderRadius: "30px",
                        }}
                        onClick={() => {
                          setDone(true);
                          window.localStorage.removeItem("questionStatus");
                          setTimeout(() => {
                            navigate(
                              `/analysis/${mockId}/${attemptID}/overall`,
                              {
                                state: { mockType: "varc" },
                              },
                              3000
                            );
                          });
                        }}
                        disabled={done}
                      >
                        DONE
                      </MyButton>
                    </div>
                  </>
                ) : state === 3 ? (
                  <>
                    <div
                      style={{ marginTop: "3em" }}
                      className="d-flex justify-content-center"
                    >
                      <SubHeading className="m-4 ps-3">
                        Section Submitting...{" "}
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
                ) : (
                  ""
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
