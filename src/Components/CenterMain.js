import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { SubHeading, BootstrapButton, MyButton, SubmitButton } from "../styleSheets/Style";
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
import { useAuth } from "../services/Context";
import ContentDrawer from "./ContentDrawer";
import QuestionPaper from "./QuestionPaper";
import InstructionButton from "./InstructionButton";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import Timer from "./Timer";

function CenterMain(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); //state store select options index
  const [inputVal, setInputVal] = useState(""); //if have iinput box data store in this state
  const [Data, setData] = useState([]); //Main mock data get state
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // set indexing for display the question
  const attemptID = localStorage.getItem("attemptID"); // User attempt id (This api trigger in use context pageb that create a attempt id)
  const [AnswerStatus, setAnswerStatus] = useState([]); // Answer status of user
  const [studentAnswer, SetStudentAnswer] = useState();

  // Function for getting a keyboard value from keyboard component

  const handleKeyPress = (key) => {
    setInputVal((prevInput) => prevInput + key);
    const updatedData = [...Data];
    updatedData[selectedQuestionIndex].selectedAnswer = inputVal + key;
    setData(updatedData);
  };

  const handleBackspace = () => {
    setInputVal((prevInput) => prevInput.slice(0, -1));
    const updatedData = [...Data];
    updatedData[selectedQuestionIndex].selectedAnswer = inputVal.slice(0, -1);
    setData(updatedData);
  };

  // fetching main data
  useEffect(() => {
    setLoading(true);
    setSelectedQuestionIndex(0);
    fetch(`https://us-central1-iqmock.cloudfunctions.net/app/api/admin/v1/mocks/${params.mockid}/${params.type}`)
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.type]);

  // fetching answers status
  const fetchAnswersStatus = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/answerstatus/${attemptID}/${params.type}`;

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    // console.log("data===>", json.data, attemptID);
    setAnswerStatus(json.data);
  };
  useEffect(() => {
    fetchAnswersStatus();
    // console.log(AnswerStatus);
  }, []);

  // post answers Api trigger on mark and review  button

  const handlePostData = async (clickType) => {
    const studentAnswer = inputVal ? inputVal : Data[selectedQuestionIndex].options[selectedAnswer];

    const data = {
      question_id: Data[selectedQuestionIndex]._id,
      studentAnswer: studentAnswer,
      duration: 30,
    };

    const url = `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/${attemptID}/${params.type}/${selectedQuestionIndex}/${clickType}`;
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
    setInputVal("");
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

  const checkSessionAccess = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/${attemptID}/${params.type}`;

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    const json = await response.json();

    // console.log("data===>", json, attemptID);
    // console.log(json.allow);

    // console.log("is active",isActive ,"json.allow", json.allow ,"params.type",params.type)

    // if (json.allow === true && isActive === false && params.type == "varc") {
    //   navigate(`/main/${params.mockid}/lrdi`);
    // } else if (json.allow === true && isActive === false && params.type == "lrdi") {
    //   navigate(`/main/${params.mockid}/quants`);
    // } else {
    //   alert("You can not move to other sections, Please complete this first");
    // }
  };
  console.log("selected===>", selectedAnswer);

  return loading ? (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="container-fluid bg-white h-100">
      <div className="row p-3 pe-1 h-100 ">
        {/* Left main container */}
        <div className="col-9">
          <div className="row py-2">
            <div className="container ">
              <SubHeading sx={{ color: "black", textAlign: "start", pl: 1 }}>Section</SubHeading>
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

                <div>
                  <Tooltip title="Full screen" role="button">
                    <span>
                      <img
                        src={require("../images/Open vector.png")}
                        width="70"
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

                  <span className="timer fs-6 p-3 ms-2   fw-bold" style={{ color: "#FF0103", borderRadius: "30px" }}>
                    {<Timer initMinute={40} initSeconds={0} />}
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
            <div className={Data.length > 0 && Data[selectedQuestionIndex].isPara === "Yes" ? "col-7 overflow-auto" : "d-none"}>
              <div className="container leftContent">
                {
                  <ContentDrawer
                    question={
                      Data.length > 0 && Data[selectedQuestionIndex].isPara === "Yes" ? Data[selectedQuestionIndex].paragraph : "No paragraph"
                    }
                    image={
                      Data.length > 0 && // Check if Data array has at least one element
                      Data[selectedQuestionIndex].image
                        ? Data[selectedQuestionIndex].image.map((item) => {
                            return <img src={item} alt="" className="img-fluid " width={150} />;
                          })
                        : null
                    }
                  />
                }
              </div>
            </div>
            {/*  right side question  div */}
            <div className={Data.length > 0 && Data[selectedQuestionIndex].isPara === "Yes" ? "col-5 text-justify" : "col-12  text-justify"}>
              <div className="container p-3 rightContent overflow-auto">
                <Typography variant="paragraph fw-bold">
                  Question : {selectedQuestionIndex + 1}
                  <br />
                  {Data.length > 0 && <Latex>{Data[selectedQuestionIndex].question}</Latex>}
                </Typography>
                <br /> <br />
                {Data.length > 0 && (
                  <div className="text-start">
                    {Data[selectedQuestionIndex].type === "0" || Data[selectedQuestionIndex].type === null ? (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Enter Answer"
                          variant="outlined"
                          value={"selectedAnswer" in Data[selectedQuestionIndex] ? Data[selectedQuestionIndex].selectedAnswer : inputVal}
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
                          value={Data[selectedQuestionIndex]?.selectedAnswer || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedAnswer(parseInt(value));
                            const updatedData = [...Data];
                            updatedData[selectedQuestionIndex].selectedAnswer = value;
                            setData(updatedData);
                          }}
                        >
                          {Data[selectedQuestionIndex].options !== null &&
                            Data[selectedQuestionIndex].options.map((option, index) => (
                              <FormControlLabel key={index} value={index} control={<Radio />} label={<small>{option}</small>} />
                            ))}
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
                  onClick={() => {
                    handlePostData("review");
                  }}
                >
                  Mark for Review & Next
                </MyButton>
                <MyButton
                  variant="contained"
                  onClick={() => {
                    const updatedData = [...Data];
                    updatedData[selectedQuestionIndex].selectedAnswer = null; // clear selected answer
                    setInputVal(""); // clear input field value
                    setData(updatedData);
                  }}
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
              <div className="row row-cols-md-4  row-cols-sm-3 row-cols-lg-4 row-cols-xxl-5  pe-4 gap-2  justify-content-center ">
                {AnswerStatus &&
                  AnswerStatus.map((item, index) => {
                    return (
                      <div className="col">
                        <Box
                          component="div"
                          onClick={() => handleQuestionClick(index)}
                          sx={{
                            width: "60px",
                            p: 2,

                            height: "50px",
                            cursor: "pointer",
                            backgroundImage: `url(${
                              item.stage === 0
                                ? "/Rectangle88.jpg"
                                : item.stage === 1
                                ? "/green.png"
                                : item.stage === 2
                                ? "/orange.png"
                                : item.stage === 3
                                ? "/answered.png"
                                : "/evolution.png"
                            })`,
                            backgroundSize: "cover",
                            objectFit: "cover",
                            fontWeight: "bold",
                            fontSize: "17px",
                          }}
                        >
                          {" "}
                          <span>{index + 1}</span>
                        </Box>
                      </div>
                      // src={
                      //   item.stage === 0
                      //     ? "/Rectangle 88.jpg"
                      //     : item.stage === 1
                      //     ? "/green.png"
                      //     : item.stage === 2
                      //     ? "/orange.png"
                      //     : item.stage === 3
                      //     ? "/answered.png"
                      //     :
                      //     "/evolution.png"
                      // }
                    );
                  })}
              </div>
            </div>
            {/* Modal for questions and instructions */}

            <div className="row justify-content-center my-2   ">
              <div className="d-flex justify-content-center flex-wrap">
                <QuestionPaper question_paper={Data} />
                <InstructionButton />
              </div>
              <SubmitButton disabled={params.type === "varc" || params.type === "lrdi" ? true : false} variant="contained">
                Submit
              </SubmitButton>
            </div>

            <div className="row gap-3 my-2 flex-wrap  text-start align-content-center  align-self-bottom  markingNotation">
              <div className="d-flex flex-wrap  justify-content-center gap-4 ">
                {" "}
                <div className=" flex-item flex-fill ">
                  <img src={require("../images/Vector 1.png")} className="img-fluid" width="20" alt="" /> <b> Answered</b>
                </div>
                <div className="flex-item flex-fill ">
                  <img src={require("../images/Vector 1 (1).png")} className="img-fluid" width="20" alt="" /> <b>Not Answered</b>
                </div>
                <div className="flex-item flex-fill ">
                  <img src={require("../images/Ellipse 12.png")} className="img-fluid" width="20" alt="" /> <b>Marked</b>
                </div>
                <div className="flex-item flex-fill">
                  <img src={require("../images/Rectangle 88.jpg")} className="img-fluid shadow-lg" width="20" alt="" /> <b> Not Visited {} </b>
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
