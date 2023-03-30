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
import ClipLoader from "react-spinners/ClipLoader";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../styleSheets/centerMain.css";
import Calc from "./Calculator";
import ContentDrawer from "./ContentDrawer";
import QuestionPaper from "./QuestionPaper";
import InstructionButton from "./InstructionButton";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import Timer from "./Timer";
import ButtonSubmit from "./SubmitButton";
import { fetchQuestions } from "../services/Mock_api";
import { Space, Spin } from "antd";
import { useRef } from "react";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

function CenterMain() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); //state store select options index
  const [inputVal, setInputVal] = useState(null); //if have iinput box data store in this state
  const [Data, setData] = useState([]); //Main mock data get state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // set indexing for display the question
  const [isFullScreen, setFullScreen] = useState(false);
  const [questionStatus, setQuestionStatus] = useState(null);

  // syncing question status with local

  useEffect(() => {
    if (questionStatus?.length > 0) {
      localStorage.setItem("questionStatus", JSON.stringify(questionStatus));
      console.log("putting ibnto local");
    }
  }, [questionStatus]);

  // for storing previous value of question index
  const prevQuestionIndex = useRef(null);

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

  const handleKeyPress = (key) => {
    setInputVal((prevInput) => prevInput + key);
    const updatedData = [...Data];
    updatedData[selectedQuestionIndex].selectedAnswer = inputVal + key;
    // setData(updatedData);
  };

  const handleBackspace = () => {
    setInputVal((prevInput) => prevInput.slice(0, -1));
    const updatedData = [...Data];
    updatedData[selectedQuestionIndex].selectedAnswer = inputVal.slice(0, -1);
    // setData(updatedData);
  };

  // fetching main data
  useEffect(() => {
    setLoading(true);
    setSelectedQuestionIndex(0);
    const mockId = params.mockid;
    const subject_type = params.type;
    const fetchDataFromApi = async () => {
      const response = await fetchQuestions(mockId, subject_type);
      console.log(response);
      if (response?.status == 200) {
        setData(response.data.data);
        setLoading(false);
      } else {
        console.error("Error in  fetching data");
        setLoading(true);
      }
    };
    const storedQuestionStatus = JSON.parse(
      localStorage.getItem("questionStatus")
    );
    console.log("storedQuestionStatus", storedQuestionStatus);
    if (storedQuestionStatus === null) {
      fetchDataFromApi();
    } else {
      console.log("setting from local");
      setQuestionStatus(storedQuestionStatus);
      setLoading(false);
    }
  }, [params.type]);

  // Function for making stage 0 in Question status(Only when data fetching from api)

  useEffect(() => {
    const storedQuestionStatus = JSON.parse(
      localStorage.getItem("questionStatus")
    );
    if (storedQuestionStatus === null) {
      setInitialStage();
    }
  }, [Data]);

  const setInitialStage = () => {
    const updatedQuestionStatus = Data?.map((item) => ({
      ...item,
      stage: 0,
    }));
    setQuestionStatus(updatedQuestionStatus);
  };

  // Function for setting different stages(accrd to student input)
  console.log("data", Data);
  console.log("questionStatus", questionStatus);
  // Stage = 0 --> Not Visited
  // Stage = 1 --> Answered
  // Stage = 2 --> Not Answered
  // Stage = 3 --> Mark for review
  // Stage = 4 --> Answered & Mark for review
  const setStage = (buttonType) => {
    const questionType = questionStatus[selectedQuestionIndex].type;
    let studentAnswer;
    let studentAnswerIndex;
    if (questionType === 1) {
      studentAnswerIndex = selectedAnswer !== null ? selectedAnswer : null;
      studentAnswer =
        questionStatus[selectedQuestionIndex].options[studentAnswerIndex] !==
        undefined
          ? questionStatus[selectedQuestionIndex].options[studentAnswerIndex]
          : null;
    }
    if (questionType === 0) {
      studentAnswer = inputVal;
    }

    const obj = questionStatus[selectedQuestionIndex];
    if (
      studentAnswer !== null &&
      studentAnswer !== "" &&
      studentAnswerIndex !== null &&
      buttonType === "save"
    ) {
      const newObj = {
        ...obj,
        stage: 1,
        studentAnswer,
        studentAnswerIndex,
        duration: 10,
      };
      console.log(newObj);
      let arr = [...questionStatus];
      arr.splice(selectedQuestionIndex, 1, newObj);
      setQuestionStatus(arr);
      return nextInd();
    } else if (
      (studentAnswer === null || studentAnswer === "") &&
      buttonType === "review"
    ) {
      const newObj = {
        ...obj,
        stage: 3,
        studentAnswer,
        studentAnswerIndex,
        duration: 10,
      };
      console.log(newObj);
      let arr = [...questionStatus];
      arr.splice(selectedQuestionIndex, 1, newObj);
      setQuestionStatus(arr);
      return nextInd();
    } else if (
      studentAnswer !== null &&
      studentAnswer !== "" &&
      studentAnswerIndex !== null &&
      buttonType === "review"
    ) {
      const newObj = {
        ...obj,
        stage: 4,
        studentAnswer,
        studentAnswerIndex,
        duration: 10,
      };
      console.log(newObj);
      let arr = [...questionStatus];
      arr.splice(selectedQuestionIndex, 1, newObj);
      setQuestionStatus(arr);
      return nextInd();
    } else {
      const newObj = { ...obj, stage: 2, studentAnswer, studentAnswerIndex };
      let arr = [...questionStatus];
      arr.splice(selectedQuestionIndex, 1, newObj);
      setQuestionStatus(arr);
      return nextInd();
    }
  };

  // Function showing prev value(If any) on question render

  const showPreviousValue = () => {
    console.log("currentQueIndex", selectedQuestionIndex);
    if (questionStatus?.length > 0) {
      if ("studentAnswerIndex" in questionStatus[selectedQuestionIndex]) {
        if (questionStatus[selectedQuestionIndex].options === null) {
          setInputVal(questionStatus[selectedQuestionIndex].studentAnswer);
        }
        setSelectedAnswer(
          questionStatus[selectedQuestionIndex].studentAnswerIndex
        );
      } else if (
        questionStatus[selectedQuestionIndex].studentAnswerIndex === null
      ) {
        setSelectedAnswer(null);
      } else {
        setSelectedAnswer(null);
        setInputVal("");
      }
    }
  };
  useEffect(() => {
    showPreviousValue();
  }, [selectedQuestionIndex]);

  // Function setting stage "Not Answered" on just changing selectedQuestionIndex

  useEffect(() => {
    const settingStage2 = () => {
      if (questionStatus?.length > 0) {
        console.log("prevQueIndex", prevQuestionIndex.current);
        const preQuestionIndex = prevQuestionIndex.current;
        const obj = questionStatus[preQuestionIndex];
        if (obj?.stage === 0) {
          const newObj = {
            ...obj,
            stage: 2,
          };
          console.log(newObj);
          let arr = [...questionStatus];
          arr.splice(preQuestionIndex, 1, newObj);
          setQuestionStatus(arr);
        }
      }
    };
    settingStage2();
  }, [selectedQuestionIndex]);

  console.log("inputVal-->", inputVal);
  console.log("selectedAnswer", selectedAnswer);

  // function for get index
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
    prevQuestionIndex.current = selectedQuestionIndex;
  };
  // button for next func
  const nextInd = () => {
    if (selectedQuestionIndex === questionStatus.length - 1) {
      alert("You can not go to next section!!!");
      return false;
    }
    setSelectedQuestionIndex(selectedQuestionIndex + 1);
    setSelectedAnswer(null);
    setInputVal("");
  };

  // clear Response
  const clearResponse = () => {
    setSelectedAnswer("");
    setInputVal("");
  };


  

  return loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "80vh",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <ClipLoader

 color="var(--orange)" loading size={50} speedMultiplier={1} /> */}
      <div className="flex-item">
        <img src="/TryThisOne.gif" className="img-fluid" alt="" width={130} />
      </div>
    </div>
  ) : (
    <div className="container-fluid bg-white">
      <div className="row p-3 pe-1" style={{height:"100%"}}>
        {/* Left main container */}
        <div className="col-9 " style={{height:"100%"}}>
          <div className="row ">
            <div className="container">
              <SubHeading sx={{ color: "black", textAlign: "start", pl: 1 }}>
                Section
              </SubHeading>
              <div className="d-flex justify-content-between align-items-baseline py-1">
                <Stack spacing={2} direction="row">
                  <BootstrapButton
                    height="41"
                    sx={{ borderRadius: "20px" }}
                    disabled={
                      params.type === "quants" || params.type === "lrdi"
                        ? true
                        : false
                    }
                    variant="contained"
                  >
                    Verbal Ability
                  </BootstrapButton>
                  <BootstrapButton
                    height="41"
                    disabled={
                      params.type === "varc" || params.type === "quants"
                        ? true
                        : false
                    }
                    variant="contained"
                    sx={{ borderRadius: "20px" }}
                  >
                    LRDI
                  </BootstrapButton>
                  <BootstrapButton
                    height="41"
                    disabled={
                      params.type === "varc" || params.type === "lrdi"
                        ? true
                        : false
                    }
                    variant="contained"
                    sx={{ borderRadius: "20px" }}
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
                  <span role="button">
                    <Tooltip title="Calculator">
                      <Calc />
                    </Tooltip>
                  </span>

                  <div
                    className="timer fw-bold"
                    style={{
                      color: "#FF0103",
                      borderRadius: "18px",
                      height: "50px",
                      width: "100px",
                      textAlign: "center",
                      paddingTop: "3px",
                      marginTop: "6px",
                      marginLeft: "8px",
                    }}
                  >
                    {
                      <>
                        <div style={{ color: "black", fontSize: "14px" }}>
                          Time Left
                        </div>
                        <Timer
                          initMinute={3}
                          initSeconds={0}
                          studentAnswersData={questionStatus}
                        />
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row px-1 py-4  mt-2"
              style={{
              background: "var(--light-background)",
               borderRadius: "30px",
               height:"70vh"
             
            }}
          >
            {/* left side content div */}
            <div
              className={
                questionStatus?.length > 0 &&
                questionStatus[selectedQuestionIndex]?.isPara === "Yes"
                  ? "col-7 overflow-auto" 
                  : "d-none"
              }
            >
              <div className="container leftContent">
                {
                  <ContentDrawer
                    question={
                      questionStatus?.length > 0 &&
                      questionStatus[selectedQuestionIndex].isPara === "Yes"
                        ? questionStatus[selectedQuestionIndex].paragraph
                        : "No paragraph"
                    }
                    image={
                      questionStatus?.length > 0 && // Check if Data array has at least one element
                      questionStatus[selectedQuestionIndex]?.image
                        ? questionStatus[selectedQuestionIndex]?.image.map(
                            (item) => {
                              return (
                                <img
                                  src={item}
                                  alt=""
                                  className="img-fluid "
                                  width={150}
                                />
                              );
                            }
                          )
                        : null
                    }
                  />
                }
              </div>
            </div>
            {/*  right side question  div */}
            <div
              className={
                questionStatus?.length > 0 &&
                questionStatus[selectedQuestionIndex].isPara === "Yes"
                  ? "col-5 text-justify"
                  : "col-12  text-justify"
              }
            >
              <div className="container p-3 rightContent overflow-auto">
                <Typography variant="paragraph fw-bold">
                  Question : {selectedQuestionIndex + 1}
                  <br />
                  {questionStatus?.length > 0 && <Latex>{questionStatus[selectedQuestionIndex]?.question}</Latex>}
                </Typography>
                <br /> <br />
                {questionStatus?.length > 0 && (
                  <div className="text-start">
                    {questionStatus[selectedQuestionIndex]?.type === 0 ||
                    questionStatus[selectedQuestionIndex]?.type === null ? (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Enter Answer"
                          variant="outlined"
                          value={inputVal !== "" ? inputVal : ""}
                          onChange={(e) => setInputVal(e.target.value)}
                          inputRef={(input) => input && input.focus()}
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
                        <div className="keys  p-3 rounded shadow">
                          <div className="d-flex gap-2 fs-5 m-2 ">
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "30px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("1")}
                            >
                              1
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "30px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("2")}
                            >
                              2
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("3")}
                            >
                              3
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("4")}
                            >
                              4
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("5")}
                            >
                              5
                            </BootstrapButton>
                          </div>
                          <div className="d-flex gap-2 fs-5 m-2 ">
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("6")}
                            >
                              6
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("7")}
                            >
                              7
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("8")}
                            >
                              8
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("9")}
                            >
                              9
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("0")}
                            >
                              0
                            </BootstrapButton>
                          </div>
                          <div className="d-flex gap-2 fs-5 m-2 ">
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress(".")}
                            >
                              .
                            </BootstrapButton>
                            <BootstrapButton
                              sx={{ width: "auto", p: 1, borderRadius: "25px" }}
                              variant="contained"
                              onClick={() => handleKeyPress("-")}
                            >
                              -
                            </BootstrapButton>

                            <BootstrapButton
                              sx={{
                                width: "151px",
                                p: 1,
                                borderRadius: "25px",
                              }}
                              variant="contained"
                              onClick={() => handleBackspace()}
                            >
                              Backspace
                            </BootstrapButton>
                          </div>
                        </div>
                      </>
                    ) : (
                      <FormControl key={selectedQuestionIndex}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name={`answer_${selectedQuestionIndex}`}
                          value={
                            selectedAnswer !== undefined ? selectedAnswer : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedAnswer(parseInt(value));
                            // const updatedData = [...Data];
                            // updatedData[selectedQuestionIndex].selectedAnswer = value;
                            // // setData(updatedData);
                          }}
                        >
                          {questionStatus[selectedQuestionIndex]?.options !=
                            null &&
                            questionStatus[selectedQuestionIndex]?.options.map(
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

            {/* Bottom button div */}
            <div className="d-flex justify-content-between py-3 align-items-center ">
              <div>
                <MyButton
                  variant="contained"
                  height="41"
                  onClick={() => setStage("review")}
                >
                  Mark for Review & Next
                </MyButton>
                <MyButton
                  variant="contained"
                  height="41"
                  onClick={() => {
                    clearResponse();
                  }}
                >
                  Clear Response
                </MyButton>
              </div>

              <div className="">
                <BootstrapButton
                  variant="contained "
                  height="41"
                  onClick={() => setStage("save")}
                  sx={{ fontSize: "13px", color: "white" }}
                  disabled={false}
                >
                  Save & Next
                </BootstrapButton>
              </div>
            </div>
          </div>
        </div>

        {/* Right main */}
        <div className="col-3 justify-content-center align-content-bottom mx-auto"   >
          <div className="d-flex flex-column gap-1 p-2 rightMain">
            <div className="flex-item flex-fill py-2">
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
                  {params.type === "varc"
                    ? "Verbal Ability"
                    : params.type === "lrdi"
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
           
           {/* Question pallete */}
            <div className="flex-item mt-2 flex-fill ">
            <div className=" container keyboard ">
              <div className="row row-cols-md-4  row-cols-sm-3 row-cols-lg-4 row-cols-xxl-5  pe-0 gap-2  justify-content-center ">
                {questionStatus &&
                  questionStatus.map((item, index) => {
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
            </div>

            {/* Modal for questions and instructions */}
            <div className="flex-item flex-fill">
              <div className="d-flex gap-2 justify-content-center flex-wrap ">
                <QuestionPaper question_paper={questionStatus} />
                <InstructionButton />
              </div>
              <ButtonSubmit studentAnswersData={questionStatus} />
            </div>

            <div className=" flex-item flex-fill  p-3 mt-3 markingNotation align-self-bottom">
              <div className="d-flex   flex-wrap row-gap-3  text-start ">
                {" "}
                <div className=" flex-item  " style={{ flexBasis: "50%" }}>
                  <img
                    src={require("../images/Vector 1.png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Answered</b>
                </div>
                <div className="flex-item  " style={{ flexBasis: "50%" }}>
                  <img
                    src={require("../images/Vector 1 (1).png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b>Not Answered</b>
                </div>
                <div className="flex-item  " style={{ flexBasis: "50%" }}>
                  <img
                    src={require("../images/Ellipse 12.png")}
                    className="img-fluid"
                    width="20"
                    alt=""
                  />{" "}
                  <b>Marked for Review</b>
                </div>
                <div className="flex-item " style={{ flexBasis: "50%" }}>
                  <img
                    src="/BL.png"
                    className="img-fluid shadow-lg"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Not Visited {} </b>
                </div>
                <div className="flex-item " style={{ flexBasis: "100%" }}>
                  <img
                    src="/Answered&MarkedReview.png"
                    className="img-fluid shadow-lg"
                    width="20"
                    alt=""
                  />{" "}
                  <b> Answered & Marked for review </b>
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
