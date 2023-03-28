import Box from "@mui/material/Box";
import "../styleSheets/Calculator.css";
import Modal from "@mui/material/Modal";
import React, { Component } from "react";
import { RxCross1 } from "react-icons/rx";
import Calculator from "awesome-react-calculator";
import { SubHeading } from "./../styleSheets/Style";
import { MyButton } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { useState } from "react";
import Keyboard from "./Keypad";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useParams } from "react-router";
import { SubmitButton } from "../styleSheets/Style";
import { Puff, InfinitySpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  textAlign: "",
  height: 400,
  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 0,
  m: 0,
};



export default function ButtonSubmit() {
    const buttonStyle = {
    background: "linear-gradient(91.59deg, #FD4153 18.67%, #F77A5B 98.68%)",
    width: "138px",
    color: "#fff",
    borderRadius:"20px"
  };

  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [state, setState] = useState(0);
  const handleConfirmOpen = () => setOpenConfirm(true);
  const handleConfirmClose = () => setOpenConfirm(false);
   const params = useParams();
  const [Loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const attemptID = JSON.parse(localStorage.getItem("userData"))?.attemptId;

  const submitSectionFunc = async (subject) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/student/v1/mocks/${attemptID}/${subject}/final`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    console.log(response);
    const json = await response.json();
    console.log(json?.success);
    // if (json?.success === true) {
    //   if (subject === "varc") {
    //     console.log("varc submitted");
    //     navigate(`/main/${params.mockid}/lrdi`);
    //   } else if (subject === "lrdi") {
    //     console.log("lrdi submitted");
    //     navigate(`/main/${params.mockid}/quants`);
    //   } else if (subject === "quants") {
    //     console.log("Your mock is submitted!!!");
    //   }
    // }
  };
  const FinalSubmitTest = () => {
    setState(1);
    setTimeout(() => setState(2), 2000);
  };

  const goToAnalyse = async () => {
    handleConfirmClose();
    setState(0);
    navigate(`/analysis/${attemptID}/overall`);
  
  }
  
  return (
    <span>
      <SubmitButton
        sx={{ width: "96%", marginTop: "1em" , background: params.type === "varc" || params.type === "lrdi" ? "#EBEBEB" : ""}}
        disabled={
          params.type === "varc" || params.type === "lrdi" ? true : false
        }
    
        variant="contained"
        onClick={() => handleConfirmOpen()}
      >
        Submit
      </SubmitButton>
      {/* Confirm modal */}
      <Modal
        open={openConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {state === 0 ? (
            <>
              <div className="d-flex justify-content-center">
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 600,
                  }}
                  alt="no IMage"
                  src="/ModalImage.png"
               
                />
              </div>
              <div className="d-flex justify-content-center">
                <SubHeading
                  style={{ color: "#494949", fontWeight: "700" }}
                  className="ps-3"
                >
                  Are you sure to submit your test?{" "}
                </SubHeading>
              </div>
              <div
                className="d-flex justify-content-evenly"
                style={{ marginTop: "1.8em" }}
              >
                <MyButton
                  variant="contained"
                  sx={{ bgcolor: "#EBEBEB", color: "black", borderRadius:"20px", ":hover":{ background:"#EBEBEB", color:"black" } }}
                  onClick={handleConfirmClose}
                >
                  Have a doubt? Back to test
                </MyButton>
                <MyButton
                  variant="contained"
                  style={buttonStyle}
                  onClick={FinalSubmitTest}
                >
                  Submit
                </MyButton>
              </div>
            </>
          ) : state === 1 ? (
            <>
              {" "}
              <div
                style={{ marginTop: "3em" }}
                className="d-flex justify-content-center"
              >
                <SubHeading className="m-4 ps-3">
                  Test Submitting...{" "}
                </SubHeading>
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "1em" }}
              >
                {Loader ? (
                  <div style={{ marginLeft: "12px" }}>
                    {" "}
                    <InfinitySpin color="blue" />
                  </div>
                ) : (
                  ""
                )}
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
                <SubHeading style={{ fontWeight: "800" }} className="m-4 ps-3">
                  Thank You!{" "}
                </SubHeading>
              </div>
              <div className="d-flex justify-content-center text-muted">
                <Typography  fontWeight={700}>
                  Congrats! You have completed the Mock test
                </Typography>
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "1em" }}
              >
                <MyButton
                  variant="contained"
                  sx={{...buttonStyle,background:" linear-gradient(90.38deg, #2400FF 5.86%, #725BFF 99.82%)",  borderRadius:"30px"}}
                  onClick={ goToAnalyse}
                >
                  DONE
                </MyButton>
              </div>
            </>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </span>
  );
}
