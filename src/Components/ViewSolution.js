import React, { useState, useEffect } from "react";
import {
  SubHeading,
  BootstrapButton,
  MyButton,
  SubmitButton,
} from "../styleSheets/Style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography, Stack, TextField, Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../styleSheets/centerMain.css";
import Calc from "./Calculator";
import ContentDrawer from "./ContentDrawer";
import Latex from "react-latex-next";

function ViewSolution() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); //state store select options index
  const [Data, setData] = useState([]); //Main mock data get state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // set indexing for display the question
  const attemptID = params.attemptID; // User attempt id (This api trigger in use context pageb that create a attempt id)
  const [AnswerStatus, setAnswerStatus] = useState([]); // Answer status of user
  const [isFullScreen, setFullScreen] = useState(false);

  //Function for full screen :
  const handleFullScreen = () => {
    const element = document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreen(false);
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
      setFullScreen(true);
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
      setFullScreen(true);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
      setFullScreen(true);
    }
  };
  // Function for getting a keyboard value from keyboard component

  // fetching main data
  useEffect(() => {
    setLoading(true);
    setSelectedQuestionIndex(0);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/student/v1/quizs/${process.env.REACT_APP_MOCK_ID}/${params.mocktype}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(true);
      });
  }, [params.mocktype]);

  // fetching answers status
  
  useEffect(() => {
    const fetchAnswersStatus = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/answerstatus/${params.attemptId}/${params.mocktype}`;
  
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        const json = await response.json();
        const arr = json.finalData;
        console.log("data===>", arr, attemptID);
        setAnswerStatus(arr);
  
        setSelectedAnswer(arr[selectedQuestionIndex].studentAnswerIndex);
      } catch (err) {
        console.log(err);
      } finally {
        //  checkAnswered()
      }
    };
    fetchAnswersStatus();
  },[params.mocktype]);
 


  useEffect(() => {
    if (AnswerStatus.length > 0) {
      setSelectedAnswer(AnswerStatus[selectedQuestionIndex].studentAnswerIndex);
    } else {
      setSelectedAnswer(null);
    }
  }, [, selectedQuestionIndex, selectedAnswer]);

  // function for get index
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
  };

  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="container-fluid bg-white h-100">
      <div className="row p-3 pe-1 h-100 ">
        {/* Left main container */}
        <div className="col-9">
          <div className="row py-2">
            <div className="container ">
              <SubHeading sx={{ color: "black", textAlign: "start", pl: 1 }}>
                Section
              </SubHeading>
              <div className="d-flex justify-content-between align-items-baseline py-1">
                <Stack spacing={2} direction="row">
                  <BootstrapButton
                    variant="contained"
                    onClick={() =>
                      navigate(`/viewsolutions/${params.attemptId}/varc`)
                    }
                  >
                    Verbal Ability
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    onClick={() =>
                      navigate(`/viewsolutions/${params.attemptId}/lrdi`)
                    }
                  >
                    LRDI
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    onClick={() =>
                      navigate(`/viewsolutions/${params.attemptId}/varc`)
                    }
                  >
                    Quant
                  </BootstrapButton>
                </Stack>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span>
                    <Tooltip
                      title={isFullScreen ? "Exit full screen" : "Full screen"}
                    >
                      <img
                        src={
                          isFullScreen
                            ? "/Group28.jpg"
                            : require("../images/Open vector.png")
                        }
                        width="70"
                        className="img-fluid p-2"
                        onClick={handleFullScreen}
                        alt="arrow-icon"
                        role="button"
                      />
                    </Tooltip>
                  </span>
                  <span role="button" className="visually-hidden">
                    <Tooltip title="Calculator">
                      <Calc />
                    </Tooltip>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row px-1 py-4"
            style={{
              background: "var(--light-background)",
              borderRadius: "30px",
            }}
          >
            {/* left side content div */}
            <div
              className={
                Data.length > 0 && Data[selectedQuestionIndex].isPara === "Yes"
                  ? "col-7 overflow-auto"
                  : "d-none"
              }
            >
              <div className="container leftContent">
                {
                  <ContentDrawer
                    question={
                      Data.length > 0 &&
                      Data[selectedQuestionIndex].isPara === "Yes"
                        ? Data[selectedQuestionIndex].paragraph
                        : "No paragraph"
                    }
                    image={
                      Data.length > 0 && // Check if Data array has at least one element
                      Data[selectedQuestionIndex].image
                        ? Data[selectedQuestionIndex].image.map((item) => {
                            return (
                              <img
                                src={item}
                                alt=""
                                className="img-fluid "
                                width={150}
                              />
                            );
                          })
                        : null
                    }
                  />
                }
              </div>
            </div>
            {/*  right side question  div */}
            <div
              className={
                Data.length > 0 && Data[selectedQuestionIndex].isPara === "Yes"
                  ? "col-5 text-justify"
                  : "col-12  text-justify"
              }
            >
              <div className="container p-3 rightContent overflow-auto">
                <Typography variant="paragraph fw-bold">
                  Question : {selectedQuestionIndex + 1}
                  <br />
                  {Data.length > 0 && (
                    <Latex>{Data[selectedQuestionIndex].question}</Latex>
                  )}
                </Typography>
                <br /> <br />
                <Typography variant="paragraph fw-bold">
                  Your Answer:
                </Typography>
                <br />
                {Data.length > 0 && (
                  <div className="text-start">
                    {Data[selectedQuestionIndex].type === 0 ||
                    Data[selectedQuestionIndex].type === null ? (
                      <TextField
                        id="outlined-basic"
                        label="Enter Answer"
                        variant="outlined"
                        value={
                          AnswerStatus[selectedQuestionIndex].studentAnswer
                        }
                        inputRef={(input) => input && input.focus()}
                        disabled={true}
                        sx={{
                          my: 3,
                          color: "black",
                          width: "400px",
                          "& label.Mui-focused": {
                            color: "black",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "var(--orange)",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "var(--orange)",
                            },
                            "&:hover fieldset": {
                              borderColor: "var(--orange)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange)",
                            },
                          },
                        }}
                      />
                    ) : (
                      <FormControl key={selectedQuestionIndex}>
                        <br />

                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name={`answer_${selectedQuestionIndex}`}
                          value={selectedAnswer}
                        >
                          {Data[selectedQuestionIndex].options !== null &&
                            Data[selectedQuestionIndex].options.map(
                              (option, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={index}
                                  control={<Radio />}
                                  label={<small>{option}</small>}
                                
                                />
                              )
                            )}
                        </RadioGroup>
                      </FormControl>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Bottom button div */}e
            <div className="d-flex justify-content-between align-items-center pt-2">
              <div>
                <MyButton disabled={true} variant="contained">
                  Mark for Review & Next
                </MyButton>
                <MyButton disabled={true} variant="contained">
                  Clear Response
                </MyButton>
              </div>

              <div className="">
                <BootstrapButton
                  variant="contained "
                  disabled={true}
                  sx={{ fontSize: "13px", color: "white" }}
                >
                  Save & Next
                </BootstrapButton>
              </div>
            </div>
          </div>
        </div>

        {/* Right main */}
        <div className="col-3 justify-content-center align-content-center mx-auto">
          <div className="container rightMain  p-3 ">
            <div className="row  ">
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  py: 1,
                }}
              >
                {" "}
                You are viewing{" "}
                <b>
                  {params.mocktype === "varc"
                    ? "Verbal Ability"
                    : params.mocktype === "lrdi"
                    ? "Lrdi"
                    : "Quants"}
                </b>{" "}
                section
              </Typography>

              <SubHeading
                sx={{
                  color: "black",
                  textAlign: "center",
                  pl: 1,
                  fontSize: "19px",
                }}
              >
                QUESTION PALETTE
              </SubHeading>
            </div>

            <div className=" container mt-3 keyboard">
              <div className="row row-cols-md-4  row-cols-sm-3 row-cols-lg-4 row-cols-xxl-5  pe-0 gap-2  justify-content-center ">
                {AnswerStatus.length > 0 &&
                  AnswerStatus.map((item, index) => {
                    return (
                      <div className="col">
                        <Box
                          component="div"
                          onClick={() => handleQuestionClick(index)}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "45px",
                            p: 2,
                            height: "45px",
                            cursor: "pointer",
                            backgroundImage: `url(${
                              item.stage === 0
                                ? "/BL.png"
                                : item.stage === 1
                                ? "/Answered.png"
                                : item.stage === 2
                                ? "/NotAnswered.png"
                                : item.stage === 3
                                ? "/MarkedforReview.png"
                                : "/Answered&MarkedReview.png"
                            })`,
                            backgroundSize: "cover",
                            objectFit: "cover",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          <span style={{ position: "relative", bottom: "4px" }}>
                            {index + 1}
                          </span>
                        </Box>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Modal for questions and instructions */}

            <div className="row   my-2   ">
              <div className="d-flex gap-2 justify-content-center flex-wrap ">
                <MyButton
                  variant="contained"
                  sx={{ width: "150px", margin: 0, marginTop: "1em" }}
                  disabled={true}
                >
                  Question Paper
                </MyButton>
                <MyButton
                  variant="contained"
                  sx={{ width: "150px", margin: 0, marginTop: "1em" }}
                  disabled={true}
                >
                  Instructions
                </MyButton>
              </div>
              <SubmitButton
                sx={{ width: "100%", marginTop: "1em" }}
                disabled={true}
                variant="contained"
              >
                Submit
              </SubmitButton>
            </div>

            <div className="row gap-3 my-3  flex-wrap text-start align-content-center  align-self-bottom  markingNotation">
              <div className="d-flex flex-wrap justify-content-center gap-4 ">
                {" "}
                <div className=" flex-item flex-fill ">
                  <img
                    src={require("../images/Vector 1.png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Answered</b>
                </div>
                <div className="flex-item flex-fill ">
                  <img
                    src={require("../images/Vector 1 (1).png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b>Not Answered</b>
                </div>
                <div className="flex-item flex-fill ">
                  <img
                    src={require("../images/Ellipse 12.png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b>Marked</b>
                </div>
                <div className="flex-item flex-fill">
                  <img
                    src={require("../images/Rectangle 88.jpg")}
                    className="img-fluid shadow-lg"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Not Visited {} </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSolution;
