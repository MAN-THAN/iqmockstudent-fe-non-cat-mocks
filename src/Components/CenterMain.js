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


function CenterMain(props) {
  const navigate = useNavigate();
  const params = useParams();
  const{varcId,lrdiId,quantsId}=useAuth()
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // new data function

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockId=localStorage.getItem("mockId")
  useEffect(() => {
       setSelectedQuestionIndex(0)
    setLoading(true);
    fetch(
      `http://43.204.36.216:5000/api/admin/v1/mocks/${params.id}/${params.type}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        // console.log(Data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.type]);

 

console.log(Data)

  // set indexing for display the question
 const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  // function for get index
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
  };
  // button for next func
  const nextInd = () => {
    setSelectedQuestionIndex(selectedQuestionIndex );
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
                    onClick={() => navigate(`/main/${varcId}/varc/${mockId}`)}
                  >
                    Verbal Ability
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    onClick={() => navigate(`/main/${lrdiId}/lrdi/${mockId}`)}
                  >
                    LR DI
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    onClick={() => navigate(`/main/${quantsId}/quants/${mockId}`)}
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

                  {/* <span className="timer" style={{color:"#FF0103"}}>{currentTime}</span> */}
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
                {/* <ContentDrawer content={"vghbjnk"} question={Data[selectedQuestionIndex].explanations} /> */}
              </div>
            </div>
            {/*  right side question  div */}
            <div className="col-5  text-justify">
              <div className="container p-3 rightContent">
                <Typography variant="paragraph fw-bold">
                  Question : {selectedQuestionIndex + 1}
                  <br />
                  {Data.length>0 && Data[selectedQuestionIndex].question}
                </Typography>
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {/* {Data.length > 0 ? Data[selectedQuestionIndex].type === "0" ? (
                    <TextField
                      id="outlined-basic"
                      label="Enter Answer"
                      variant="outlined"
                      sx={{ my: 3, color: "black" }}
                      fullWidth
                    />
                  ) : (
                    Data[selectedQuestionIndex].options.map((option, index) => (
                      <li key={index}>
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option.id}
                          onChange={(e) =>
                            setSelectedAnswer(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor={index}>
                          <small>{option}</small>
                        </label>
                      </li>
                    ))
                  )} */}

                  {Data.length > 0 && Data[selectedQuestionIndex].options.map((option,index)=>{
                    console.log(index)
                    return (
                      <li key={index}>
                        <input
                          type="radio"
                          name="options"
                          value={index}
                          checked={selectedAnswer === index}
                          onChange={(e) =>
                            setSelectedAnswer(parseInt(e.target.value))
                          }
                        />  
                      
                          <small>{option}</small>
                       
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* Bottom button div */}
            <div className="d-flex justify-content-between align-items-center pt-2">
              <div>
                <MyButton variant="contained" onClick={nextInd}>
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
                {Data &&
                  Data.map((item, index) => {
                    return (
                      <div className="col">
                        <Avatar
                          key={item.series}
                          onClick={() => handleQuestionClick(index)}
                          sx={{
                            bgcolor:
                              selectedQuestionIndex === index
                                ? "#9169C2"
                                : "#FFFFFF",
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

            <div className="row justify-content-center my-2 ">
              <MyButton variant="contained" sx={{ width: "130px" }}>
                Question Paper
              </MyButton>
              <MyButton variant="contained" sx={{ width: "130px" }}>
                Instructions
              </MyButton>
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
