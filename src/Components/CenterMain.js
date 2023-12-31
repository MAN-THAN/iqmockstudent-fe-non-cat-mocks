import React, { useState, useEffect, useRef } from "react";
import { SubHeading, BootstrapButton, MyButton } from "../styleSheets/Style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography, Stack, TextField, Box, ButtonBase } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import { PuffLoader } from "react-spinners";
import ImageButton from "./ImageButton";
import NewTimer from "./TimerNew";
import { useDispatch, useSelector } from "react-redux";
import { addMockData } from "../store/slices/mockDataSlice";
import { addStudentResponse , setCurrentSectionIndex} from "../store/slices/mockDataSlice";
import Button from "@mui/material/Button";

function CenterMain() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null); //state store select options index
  const [inputVal, setInputVal] = useState(null); //if have iinput box data store in this state
  const [Data, setData] = useState([]); //Main mock data get state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // set indexing for display the question
  const [isFullScreen, setFullScreen] = useState(false);
  const [questionStatus, setQuestionStatus] = useState(null);
  const { state } = useLocation();
  const [sectionName, setSectionName] = useState(null);
  const [sectionTime, setSectionTime] = useState(null);
  const COUNTER_KEY_SEC = "my-counter-sec";
  const COUNTER_KEY_MIN = "my-counter-min";
  //console.log("Question status", questionStatus);
  // Redux store access
  const dispatch = useDispatch();
  const {
    mockname,
    sections,
    isToggleAllowed,
    isCalculatorAllowed,
    studentResponse,
    currentSectionIndex
  } = useSelector((state) => state.mockData);
  console.log(currentSectionIndex, "currentSectionIndex");

  // syncing question status with redux store
  useEffect(() => {
    if (questionStatus?.length > 0) {
      let arr = [...studentResponse];
      arr.splice(currentSectionIndex, 1, { questions: questionStatus });
      console.log(arr);
      dispatch(addStudentResponse(arr));
    }
  }, [questionStatus]);
  console.log(questionStatus);
  console.log(studentResponse);
  console.log(currentSectionIndex);

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
  //console.log(sectionName, sectionTime);

  // fetching main data
  // useEffect(() => {
  //   setLoading(true);
  //   let question = localStorage.getItem("lastAttemptedQuestionIndex");
  //   //console.log("question:", question);
  //   if (question == "undefined" || question == "null") {
  //     setSelectedQuestionIndex(0);
  //   } else {
  //     setSelectedQuestionIndex(
  //       Number(localStorage.getItem("lastAttemptedQuestionIndex"))
  //     );
  //   }
  //   const fetchMockDataFromStore = () => {
  //     // const uid = JSON.parse(localStorage.getItem("userData"))?._id;
  //     // const response = await fetchQuestions(state.attemptId, uid);
  //     window.localStorage.setItem(COUNTER_KEY_MIN, 100);
  //     //console.log(response);
  //     // if (response?.status === 200) {
  //     //   localStorage.setItem("sectionType", response.data.sectionsName[0]);
  //     //   setData(response.data.data[0][response.data.sectionsName]);
  //     //   setSectionName(response.data.sectionsName[0]);
  //     //   setSectionTime(response.data.sectionsTime[0]);

  //     //   localStorage.setItem("my-counter-sec", 0);
  //     //   setLoading(false);
  //     //   prevQuestionIndex.current = null;
  //     // } else {
  //     //   console.error("Error in  fetching data");
  //     //   setLoading(true);
  //     // }

  //   };
  //   // setData(sections[currentSectionIndex].questions);
  //   // const storedQuestionStatu = JSON.parse(
  //   //   localStorage.getItem("questionStatus")
  //   // );
  //   // if (storedQuestionStatu === null) {
  //   //   setInitialStage();
  //   // }
  //   // const storedQuestionStatus = localStorage.getItem("questionStatus")
  //   //   ? JSON.parse(localStorage.getItem("questionStatus"))
  //   //   : null;
  //   //console.log("storedQuestionStatus", storedQuestionStatus);
  //   if (studentResponse) {
  //     setQuestionStatus(studentResponse[currentSectionIndex].questions);
  //     console.log("get from redux store(local)");
  //   } else {
  //     fetchMockDataFromStore();
  //   }

  //   // setLoading(false);
  //   //console.log("getting data from local storage");
  // }, []);
  // console.log(localStorage.getItem(COUNTER_KEY_MIN));
  // fetching mock data from store
  useEffect(() => {
    if (studentResponse) {
      setQuestionStatus(studentResponse[currentSectionIndex].questions);
      setSectionName(studentResponse[currentSectionIndex].name);
      setInputVal("");
      setSelectedAnswer(null);
      setSelectedQuestionIndex(0);
      setLoading(false);
    }
  }, [currentSectionIndex]);
  // console.log(sectionName);
  // console.log(questionStatus);
  // console.log(studentResponse);

  // Function for making stage 0 in Question status(Only when data fetching from api)

  // useEffect(() => {
  //   const storedQuestionStatus = JSON.parse(
  //     localStorage.getItem("questionStatus")
  //   );
  //   if (storedQuestionStatus === null) {
  //     setInitialStage();
  //   }
  // }, [Data]);

  const setInitialStage = () => {
    // const updatedQuestionStatus = Data?.map((item) => ({
    //   ...item,
    //   stage: 0,
    // }));

    setQuestionStatus(sections[currentSectionIndex].questions);
    setInputVal("");
    setSelectedAnswer(null);
  };

  // Function for setting different stages(accrd to student input)
  // //console.log("data", Data);
  // //console.log("questionStatus", questionStatus);
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
        duration: count,
      };
      //console.log(newObj);
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
        duration: count,
      };
      //console.log(newObj);
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
        duration: count,
      };
      //console.log(newObj);
      let arr = [...questionStatus];
      arr.splice(selectedQuestionIndex, 1, newObj);
      setQuestionStatus(arr);
      return nextInd();
    } else {
      const newObj = {
        ...obj,
        stage: 2,
        duration: null,
        studentAnswer,
        studentAnswerIndex,
      };
      let arr = [...questionStatus];
      arr.splice(selectedQuestionIndex, 1, newObj);
      setQuestionStatus(arr);
      return nextInd();
    }
  };

  // Function showing prev value(If any) on question render

  const showPreviousValue = () => {
    //console.log("currentQueIndex", selectedQuestionIndex);
    if (questionStatus?.length > 0) {
      if ("studentAnswer" in questionStatus[selectedQuestionIndex]) {
        if (questionStatus[selectedQuestionIndex].type === 0) {
          setInputVal(questionStatus[selectedQuestionIndex].studentAnswer);
        }
        if (questionStatus[selectedQuestionIndex].type === 1) {
          setSelectedAnswer(
            questionStatus[selectedQuestionIndex].studentAnswerIndex
          );
        }
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
    if (questionStatus) {
      if (questionStatus[selectedQuestionIndex]?.duration) {
        setCount(Number(questionStatus[selectedQuestionIndex]?.duration));
      } else {
        // alert('inside else');
        setCount(0);
      }
    } else {
      setCount(0);
    }
  }, [selectedQuestionIndex, questionStatus]);

  // Function setting stage "Not Answered" on just changing selectedQuestionIndex
  useEffect(() => {
    const settingStage2 = () => {
      if (questionStatus?.length > 0) {
        //console.log("prevQueIndex", prevQuestionIndex.current);
        const preQuestionIndex = prevQuestionIndex.current;
        const obj = questionStatus[preQuestionIndex];
        if (obj?.stage === 0) {
          const newObj = {
            ...obj,
            stage: 2,
            duration: null,
          };
          //console.log(newObj);
          let arr = [...questionStatus];
          arr.splice(preQuestionIndex, 1, newObj);
          setQuestionStatus(arr);
        }
      }
    };
    settingStage2();
  }, [selectedQuestionIndex]);

  // //console.log("inputVal-->", inputVal);
  // //console.log("selectedAnswer", selectedAnswer);
  // function for get index
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
    prevQuestionIndex.current = selectedQuestionIndex;
  };

  // clear Response
  const clearResponse = () => {
    setSelectedAnswer(null);
    setInputVal("");
  };

  // Duration response timer
  const [count, setCount] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    //console.log("Component rendered");
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // button for next func
  const nextInd = () => {
    if (selectedQuestionIndex === questionStatus.length - 1) {
      // alert("You can not go to next section!!!");
      return false;
    }
    setSelectedQuestionIndex(selectedQuestionIndex + 1);
    setSelectedAnswer(null);
    setInputVal("");
  };

  //Restricting User from text selection and Copying

  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    const disableTextSelection = (event) => {
      if (window.getSelection) {
        const selection = window.getSelection();
        if (selection.toString().length !== 0) {
          event.preventDefault();
        }
      }
    };
    const disableKeys = (event) => {
      const disabledKeys = [
        "KeyA",
        "KeyC",
        "KeyX",
        "KeyF",
        "KeyS",
        "KeyD",
        "KeyI",
      ]; // Array of keys to disable

      if (disabledKeys.includes(event.code)) {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", disableRightClick);
    // document.addEventListener("selectstart", disableTextSelection);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      // document.removeEventListener("selectstart", disableTextSelection);
      document.addEventListener("keydown", disableKeys);
    };
  });
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60); //value will be changed later

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
      <PuffLoader color="#202021" loading size={70} speedMultiplier={1} />
    </div>
  ) : (
    <div className="container-fluid bg-white">
      <div
        className="row p-3 pe-1"
        style={{ height: "100%", userSelect: "none" }}
      >
        {/* Left main container */}
        <div className="col-9 " style={{ height: "100%" }}>
          <div className="row ">
            <div className="container">
              <SubHeading sx={{ color: "black", textAlign: "start", pl: 1 }}>
                Sections
              </SubHeading>
              <div className="d-flex justify-content-between align-items-baseline py-1">
                <Stack spacing={2} direction="row">
                  {/* Only one button show in section part */}
                  {sections?.map((section, ind) => {
                    return (
                      <Button
                        key={ind}
                        onClick={() => {
                          dispatch(setCurrentSectionIndex(ind));
                        }}
                        variant="contained"
                        disabled={
                          isToggleAllowed
                            ? false
                            : currentSectionIndex == ind
                            ? false
                            : true
                        }
                        sx={{
                          borderRadius: 3.5,
                          backgroundColor:
                            ind == currentSectionIndex ? "blue" : "#FF9000",
                          boxShadow: 6,
                          fontWeight: 600,
                        }}
                      >
                        {section.name?.toUpperCase()}
                      </Button>
                    );
                  })}
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
                  {isCalculatorAllowed ? (
                    <span role="button">
                      <Tooltip title="Calculator">
                        <Calc />
                      </Tooltip>
                    </span>
                  ) : (
                    <></>
                  )}

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
                        {
                         time ? ( <NewTimer
                          mockId={state.mockId}
                          expiryTimestamp={time}
                        />) : (<></>)
                        }
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row px-1 py-3  mt-2"
            style={{
              background: "var(--light-background)",
              borderRadius: "30px",
              height: "70vh",
            }}
          >
            {/* left side content div */}
            <div
              className={
                questionStatus?.length > 0 &&
                questionStatus[selectedQuestionIndex]?.isPara === "Yes"
                  ? "col-7 "
                  : "d-none"
              }
            >
              <div
                className="p-2"
                style={{ borderRadius: "30px", background: "white" }}
              >
                <div className="leftContent">
                  {
                    <ContentDrawer
                      question={
                        questionStatus?.length > 0 &&
                        questionStatus[selectedQuestionIndex]?.isPara === "Yes"
                          ? questionStatus[selectedQuestionIndex]?.paragraph
                          : "No paragraph"
                      }
                      image={
                        questionStatus?.length > 0 && // Check if Data array has at least one element
                        questionStatus[selectedQuestionIndex]?.image
                          ? questionStatus[selectedQuestionIndex]?.image.map(
                              (item) => {
                                return <ImageButton src={item} />;
                              }
                            )
                          : null
                      }
                    />
                  }
                </div>
              </div>
            </div>
            {/*  right side question  div */}
            <div
              className={
                questionStatus?.length > 0 &&
                questionStatus[selectedQuestionIndex]?.isPara === "Yes"
                  ? "col-5 text-justify"
                  : "col-12  text-justify"
              }
            >
              <div
                className="p-2"
                style={{ borderRadius: "30px", background: "white" }}
              >
                <div className="container p-3 rightContent overflow-auto">
                  <Typography variant="paragraph fw-bold">
                    Question : {selectedQuestionIndex + 1}
                    <br />
                    {questionStatus?.length > 0 && (
                      <div>
                        <Latex>
                          {questionStatus[selectedQuestionIndex]?.question ||
                            ""}
                        </Latex>
                      </div>
                    )}
                  </Typography>
                  {/* <div className="img-wrapper">
                  <img style={{ cursor: "pointer" }} src={questionStatus[selectedQuestionIndex]?.image} className="img-fluid hover-zoom" />
                </div> */}
                  <br />
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
                            // onChange={(e) => setInputVal(e.target.value)}
                            // inputRef={(input) => input && input.focus()}
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
                            autoComplete="off"
                          />
                          <div className="keys p-3 rounded shadow">
                            <div className="d-flex flex-wrap justify-content-center gap-2 fs-4 m-2 ">
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "30px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("1")}
                              >
                                1
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "30px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("2")}
                              >
                                2
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("3")}
                              >
                                3
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("4")}
                              >
                                4
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("5")}
                              >
                                5
                              </BootstrapButton>

                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("6")}
                              >
                                6
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("7")}
                              >
                                7
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("8")}
                              >
                                8
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("9")}
                              >
                                9
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("0")}
                              >
                                0
                              </BootstrapButton>

                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress(".")}
                              >
                                .
                              </BootstrapButton>
                              <BootstrapButton
                                className="flex-item"
                                sx={{
                                  width: "auto",
                                  p: 1,
                                  borderRadius: "25px",
                                }}
                                variant="contained"
                                onClick={() => handleKeyPress("-")}
                              >
                                -
                              </BootstrapButton>

                              <BootstrapButton
                                className="flex-item"
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
                        <FormControl
                          sx={{ width: "100%" }}
                          key={selectedQuestionIndex}
                        >
                          <RadioGroup
                            sx={{ width: "100%" }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name={`answer_${selectedQuestionIndex}`}
                            value={
                              selectedAnswer !== undefined
                                ? selectedAnswer
                                : null
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedAnswer(parseInt(value));
                            }}
                          >
                            {questionStatus[selectedQuestionIndex]?.options !=
                              null &&
                              questionStatus[
                                selectedQuestionIndex
                              ]?.options.map((option, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={index}
                                  control={<Radio />}
                                  sx={{ marginTop: 2 }}
                                  label={
                                    <div>
                                      <small>
                                        <Latex>{option || ""}</Latex>
                                      </small>
                                    </div>
                                  }
                                />
                              ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom button div */}
            <div className="d-flex justify-content-between py-2 align-items-center ">
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
        <div className="col-3 justify-content-center align-content-bottom mx-auto">
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
                You are viewing <b>{sectionName}</b> section
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
                                  ? "/answered.png"
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
                            <span
                              style={{ position: "relative", bottom: "4px" }}
                            >
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
              <ButtonSubmit
                type={sectionName}
                mockId={state.mockId}
                studentAnswersData={questionStatus}
              />
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
