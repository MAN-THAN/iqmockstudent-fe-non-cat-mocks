import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import {
  SubHeading,
  BootstrapButton,
  MyButton,
  SubmitButton,
} from "../styleSheets/Style";
import { Typography, Stack, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../styleSheets/centerMain.css";
import Calc from "./Calculator";
import { useAuth } from "../services/Context";
import Keyboard from "./Keypad";
import ContentDrawer from "./ContentDrawer";
import QuestionPaper from "./QuestionPaper";
import InstructionButton from "./InstructionButton";

function CenterMain(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { seconds, stopTimer, startTimer, resetTimer, isActive } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); //state store select options index
  const [inputVal, setInputVal] = useState(null); //if have iinput box data store in this state
  const [Data, setData] = useState([]); //Main mock data get state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // set indexing for display the question
  const attemptID = localStorage.getItem("attemptID"); // User attempt id (This api trigger in use context pageb that create a attempt id)
  const [AnswerStatus, setAnswerStatus] = useState([]); // Answer status of user

  //Timer code

  useEffect(() => {
    startTimer();
    if (isActive === false) {
      checkSessionAccess()
    }
    return () => {
      resetTimer();
    };
  }, [params.type, isActive]);

  const getMinutes = () => {
    return Math.floor(seconds / 60);
  };

  const getSeconds = () => {
    return seconds % 60;
  };


  // Function for getting a keyboard value from keyboard component
  function handleKeyboardValue(inputValue) {
    setInputVal(inputValue);
  }

  // fetching main data
  useEffect(() => {
    setLoading(true);
    setSelectedQuestionIndex(0);
    fetch(
      `http://43.204.36.216:5000/api/admin/v1/mocks/${params.mockid}/${params.type}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.type]);
  console.log(Data);

  // fetching answers status
  const fetchAnswersStatus = async () => {
    const url = `http://43.204.36.216:8000/api/student/v1/mocks/answerstatus/${attemptID}/${params.type}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("data===>", json.data, attemptID);
    setAnswerStatus(json.data);
  };
  useEffect(() => {
    fetchAnswersStatus();
  }, []);
  console.log(AnswerStatus);

  // post answers Api trigger on mark and review  button
  const handlePostData = async (clickType) => {
    console.log(clickType);
    const studentAnswer = inputVal ? inputVal : Data[selectedQuestionIndex].options[selectedAnswer];
    const updatedData = [...Data];
    updatedData[selectedQuestionIndex].selectedAnswer = selectedAnswer;

    const data = {
      question_id: Data[selectedQuestionIndex]._id,
      question: Data[selectedQuestionIndex].question,
      topic: Data[selectedQuestionIndex].topic,
      subtopic: Data[selectedQuestionIndex].subtopic,
      difficulty: Data[selectedQuestionIndex].difficulty,
      correctAnswer: Data[selectedQuestionIndex].correctAnswer,
      studentAnswer,
      duration: 30,
    };

    const url = `http://43.204.36.216:8000/api/student/v1/mocks/${attemptID}/${params.type}/${selectedQuestionIndex}/${clickType}`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("data===>", json, attemptID);
    nextInd();
    fetchAnswersStatus();
  };

  // function for get index
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
  };
  // button for next func
  const nextInd = () => {
    if (selectedQuestionIndex === Data.length - 1) {
      // Show message or disable button

      return;
    }

    setSelectedQuestionIndex(selectedQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  // Session access of student checking

  const checkSessionAccess = async (subject) => {
    const url = `http://43.204.36.216:8000/api/student/v1/mocks/${attemptID}/${params.type}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    const json = await response.json();

    // console.log("data===>", json, attemptID);
    // console.log(json.allow);
    // console.log("is active",isActive ,"json.allow", json.allow ,"params.type",params.type) 

    if (json.allow === true && isActive === false && params.type == "varc") {
      navigate(`/main/${params.mockid}/lrdi`);
    }
    else if (json.allow === true && isActive === false && params.type == "lrdi") {
      navigate(`/main/${params.mockid}/quants`);
    }
    else {
      alert("You can not move to other sections, Please complete this first");
    }
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
                    onClick={() => navigate(`/main/${params.mockid}/varc`)}
                  >
                    Verbal Ability
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    onClick={() => checkSessionAccess(`lrdi`)}
                  >
                    LR DI
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    onClick={() => checkSessionAccess(`quants`)}
                  >
                    Quant
                  </BootstrapButton>
                </Stack>

                <div>
                  <Tooltip title="Full screen" role="button">
                    <span>
                      <img
                        src={require("../images/Open vector.png")}
                        width="60"
                        className="img-fluid p-2"
                        onClick={() => props.fullScreen()}
                        alt="arrow-icon"
                      />
                    </span>
                  </Tooltip>

                  <Tooltip title="Calculator">
                    <span role="button">
                      <Calc />
                    </span>
                  </Tooltip>

                  <span className="timer" style={{ color: "#FF0103" }}>
                    {getMinutes()}:
                    {getSeconds() < 10 ? `0${getSeconds()}` : getSeconds()}
                    {seconds === 0 && stopTimer()}
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
            <div className="col-7 overflow-auto ">
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
            <div className="col-5  text-justify">
              <div className="container p-3 rightContent">
                <Typography variant="paragraph fw-bold">
                  Question : {selectedQuestionIndex + 1}
                  <br />
                  {Data.length > 0 && Data[selectedQuestionIndex].question}
                </Typography>
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {Data.length > 0 &&
                    (Data[selectedQuestionIndex].type === "0" ||
                      Data[selectedQuestionIndex].type === null ? (
                      <>
                        <Keyboard onValueChange={handleKeyboardValue} />
                      </>
                    ) : (
                      Data[selectedQuestionIndex].options.map(
                        (option, index) => (
                          <li key={index}>
                            <input
                              type="radio"
                              name="answer"
                              value={index}
                              checked={
                                Data[selectedQuestionIndex].selectedAnswer ===
                                index
                              }
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setSelectedAnswer(value);
                                const updatedData = [...Data];
                                updatedData[
                                  selectedQuestionIndex
                                ].selectedAnswer = value;
                                setData(updatedData);
                              }}
                            />
                            <label htmlFor={index}>
                              <small>{option}</small>
                            </label>
                          </li>
                        )
                      )
                    ))}
                </ul>
              </div>
            </div>

            {/* Bottom button div */}
            <div className="d-flex justify-content-between align-items-center pt-2">
              <div>
                <MyButton
                  variant="contained"

                  onClick={() => {
                    handlePostData("review");
                  }}
                >
                  Mark for Review & Next
                </MyButton>
                <MyButton
                  variant="contained"
                  onClick={() => setSelectedAnswer(null)}
                >
                  Clear Response
                </MyButton>
              </div>

              <div className="">
                <BootstrapButton
                  variant="contained "

                  onClick={() => {
                    handlePostData("save");
                  }}
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
            <div className="row ">
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  py: 1,
                }}
              >
                {" "}
                You are viewing <b>Verbal Ability</b> section
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
              <div className="row row-cols-6 gap-2  pe-4 gap-1 justify-content-center ">
                {AnswerStatus &&
                  AnswerStatus.map((item, index) => {
                    return (
                      <div className="col">
                        <Avatar
                          key={item.series}
                          onClick={() => handleQuestionClick(index)}
                          sx={{
                            bgcolor:
                              item.stage === 0
                                ? "white"
                                : item.stage === 1
                                  ? "var(--green)"
                                  : item.stage === 2
                                    ? "red"
                                    : item.stage === 3
                                      ? "var(--blue)"
                                      : item.stage === 4
                                        ? "black"
                                        : "",
                            color: "black",
                            p: 3,
                            borderRadius: "10px",
                            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer",
                            // margin: "2px",
                          }}
                          variant="square"
                        >
                          {index + 1}
                        </Avatar>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Modal for questions and instructions */}

            <div className="row justify-content-center my-2 ">
              <QuestionPaper question_paper={Data} />
              <InstructionButton />
              <SubmitButton variant="contained">Submit</SubmitButton>
            </div>

            <div className="row gap-3 my-2  g-3 text-start align-content-center justify-content-center align-self-bottom  markingNotation">
              <div className="row">
                {" "}
                <div className="col">
                  <img
                    src={require("../images/Vector 1.png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Answered</b>
                </div>
                <div className="col">
                  <img
                    src={require("../images/Vector 1 (1).png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b>Not Answered</b>
                </div>
              </div>

              <div className="row ">
                <div className="col">
                  <img
                    src={require("../images/Ellipse 12.png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b>Marked</b>
                </div>
                <div className="col">
                  <img
                    src={require("../images/Rectangle 88.jpg")}
                    className="img-fluid shadow-lg"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Not Visited</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterMain;