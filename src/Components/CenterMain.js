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
import MoonLoader from "react-spinners/MoonLoader";
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
import {
  fetchQuestions,
  fetchAnswerStatus,
  postAnswers,
} from "../services/Mock_api";

function CenterMain() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); //state store select options index
  const [inputVal, setInputVal] = useState(""); //if have iinput box data store in this state
  const [Data, setData] = useState([]); //Main mock data get state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // set indexing for display the question
  const attemptID = JSON.parse(localStorage.getItem("userData"))?.attemptId; // User attempt id (This api trigger in use context pageb that create a attempt id)
  const [AnswerStatus, setAnswerStatus] = useState([]); // Answer status of user
  const [isFullScreen, setFullScreen] = useState(false);
  const [questionStatus, setQuestionStatus] = useState([]);

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
    const fetchMainData = async () => {
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
    fetchMainData();
  }, [params.type]);

  // Function for making stage setting 0

  useEffect(() => {
    setInitialStage();
  }, [Data]);

  const setInitialStage = () => {
    const updatedQuestionStatus = Data.map((item) => ({
      ...item,
      stage: 0,
    }));
    setQuestionStatus(updatedQuestionStatus);
  };

  // Function for setting stages
  // Stage = 0 --> Not Visited
  // Stage = 1 --> Answered
  // Stage = 2 --> Not Answered
  // Stage = 3 --> Mark for review
  // Stage = 4 --> Answered & Mark for review
  console.log(questionStatus);
  // Stage = 0 --> Not Visited
  // Stage = 1 --> Answered
  // Stage = 2 --> Not Answered
  // Stage = 3 --> Mark for review
  // Stage = 4 --> Answered & Mark for review

  const setStage = (buttonType) => {
    const questionType = Data[selectedQuestionIndex].type;
    let studentAnswer;
    let studentAnswerIndex;
    if (questionType === 1) {
      studentAnswerIndex = selectedAnswer !== null ? selectedAnswer : null;
      studentAnswer =
        Data[selectedQuestionIndex].options[studentAnswerIndex] !== undefined
          ? Data[selectedQuestionIndex].options[studentAnswerIndex]
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
      questionStatus.splice(selectedQuestionIndex, 1, newObj);
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
      questionStatus.splice(selectedQuestionIndex, 1, newObj);
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
      questionStatus.splice(selectedQuestionIndex, 1, newObj);
      return nextInd();
    } else {
      const newObj = { ...obj, stage: 2, studentAnswer, studentAnswerIndex };
      questionStatus.splice(selectedQuestionIndex, 1, newObj);
      return nextInd();
    }
  };

  // Function on question render

  const showPreviousValue = () => {
    console.log("manthan", selectedQuestionIndex);
    if (questionStatus.length > 0) {
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

  console.log(inputVal);
  useEffect(() => {
    showPreviousValue();
  }, [selectedQuestionIndex]);

  // fetching answers status
  const fetchingAnswersStatus = async () => {
    const subject_type = params.type;
    const response = await fetchAnswerStatus(attemptID, subject_type);
    console.log(response);
    if (response?.status == 200) {
      const arr = response.data.finalData;
      setAnswerStatus(arr);
      // setSelectedAnswer("studentAnswerIndex" in arr[selectedQuestionIndex] ? arr[selectedQuestionIndex].studentAnswerIndex : "");
    }
  };
  useEffect(() => {
    fetchingAnswersStatus();
  }, [params.type, selectedQuestionIndex]);

  // post answers Api trigger on mark and review  button

  const handlePostData = async (clickType) => {
    const studentAnswer = inputVal
      ? inputVal
      : Data[selectedQuestionIndex].options[selectedAnswer];
    const data = {
      question_id: Data[selectedQuestionIndex]._id,
      studentAnswer: studentAnswer,
      duration: 30,
      studentAnswerIndex: selectedAnswer,
    };
    const subject_type = params.type;
    const response = await postAnswers(
      JSON.stringify(data),
      attemptID,
      subject_type,
      selectedQuestionIndex,
      clickType
    );
    console.log(response);
    if (response?.status == 200) {
      console.log("Answer posted successfully");
    } else {
      console.log("--> error in posting answer");
    }
    await fetchingAnswersStatus();
    nextInd();
  };

  // function for get index
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
  };
  // button for next func
  const nextInd = () => {
    if (selectedQuestionIndex === Data.length - 1) {
      alert("Go to next section");
      return;
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

  // const checkAnswered = () => {
  //   console.log("ammanjbcusacw");
  //   if ("studentAnswer" in AnswerStatus[selectedQuestionIndex]) {
  //     const a = Data[selectedQuestionIndex].options.filter((option, index) => option === AnswerStatus[selectedQuestionIndex].studentAnswer);
  //     console.log(a);
  //   }
  // };

  return loading ? (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MoonLoader color="orange" loading size={50} speedMultiplier={1} />
    </div>
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
                    // disabled={params.type === "quants" || params.type === "lrdi" ? true : false}
                    variant="contained"
                    onClick={() => navigate(`/main/${params.mockid}/varc`)}
                  >
                    Verbal Ability
                  </BootstrapButton>
                  <BootstrapButton
                    // disabled={params.type === "varc" || params.type === "quants" ? true : false}
                    variant="contained"
                    onClick={() => navigate(`/main/${params.mockid}/lrdi`)}
                  >
                    LRDI
                  </BootstrapButton>
                  <BootstrapButton
                    // disabled={params.type === "varc" || params.type === "lrdi" ? true : false}
                    variant="contained"
                    onClick={() => navigate(`/main/${params.mockid}/quants`)}
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
                        <Timer initMinute={3} initSeconds={0} />
                      </>
                    }
                  </div>
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
                {Data.length > 0 && (
                  <div className="text-start">
                    {Data[selectedQuestionIndex].type === 0 ||
                    Data[selectedQuestionIndex].type === null ? (
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
                          {Data[selectedQuestionIndex].options != null &&
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

            {/* Bottom button div */}
            <div className="d-flex justify-content-between align-items-center pt-2">
              <div>
                <MyButton
                  variant="contained"
                  onClick={() => setStage("review")}
                >
                  Mark for Review & Next
                </MyButton>
                <MyButton
                  variant="contained"
                  onClick={() => {
                    const updatedData = [...Data];
                    updatedData[selectedQuestionIndex].selectedAnswer = null; // clear selected answer
                    setInputVal(""); // clear input field value
                    // setData(updatedData);
                    clearResponse();
                  }}
                >
                  Clear Response
                </MyButton>
              </div>

              <div className="">
                <BootstrapButton
                  variant="contained "
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

            <div className=" container mt-3 keyboard">
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
            {/* Modal for questions and instructions */}

            <div className="row   my-2   ">
              <div className="d-flex gap-2 justify-content-center flex-wrap ">
                <QuestionPaper question_paper={Data} />
                <InstructionButton />
              </div>
              <ButtonSubmit />
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

export default CenterMain;
