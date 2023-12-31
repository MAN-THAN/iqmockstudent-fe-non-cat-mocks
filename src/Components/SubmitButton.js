import Box from "@mui/material/Box";
import "../styleSheets/Calculator.css";
import Modal from "@mui/material/Modal";
import React from "react";
import { SubHeading } from "./../styleSheets/Style";
import { MyButton } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { SubmitButton } from "../styleSheets/Style";
import { InfinitySpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { submitSection } from "../services/Mock_api";
import { Button } from "antd";

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

export default function ButtonSubmit({ studentAnswersData, mockId, type }) {
  const buttonStyle = {
    background: "linear-gradient(91.59deg, #FD4153 18.67%, #F77A5B 98.68%)",
    width: "138px",
    color: "#fff",
    borderRadius: "20px",
  };
  const [openConfirm, setOpenConfirm] = useState(false);
  const [state, setState] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const attemptID = localStorage.getItem("attemptId");
  const uid = JSON.parse(localStorage.getItem("userData"))?._id;
  const [done,setDone]=useState(false);
  const submitSectionFunc = async () => {
    setState(1);
    try {
      const response = await submitSection(
        attemptID,
        studentAnswersData,
        uid,
        type
      );
      //console.log(response);
      if (response?.status == 200) {
        window.localStorage.removeItem("my-counter-sec");
        window.localStorage.removeItem("my-counter-min");
        window.localStorage.removeItem("questionStatus");
        setState(2);
      }
    } catch (err) {
      //console.log(err);
      setState(3);
    }
  };

  return (
    <span>
      <SubmitButton
        sx={{
          width: "96%",
          marginTop: "1em",
          backgroundColor: "#EBEBEB",
          ":disabled": {
            background: "#D9D9D9",
            color:"white"
          },
        }}
        disabled={openConfirm}
        variant="contained"
        onClick={() => setOpenConfirm(true)}
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
                  sx={{
                    bgcolor: "#EBEBEB",
                    color: "black",
                    borderRadius: "20px",
                    ":hover": { background: "#EBEBEB", color: "black" },
                  }}
                  onClick={() => setOpenConfirm(false)}
                >
                  Have a doubt? Back to test
                </MyButton>
                <MyButton
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => submitSectionFunc()}
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
                <SubHeading style={{ fontWeight: "800" }} className="m-4 ps-3">
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
                    setDone(true)
                    window.localStorage.removeItem("questionStatus");
                    setTimeout(()=>{
                      navigate(`/analysis/${mockId}/${attemptID}/overall`, {
                        state: { mockType: type },
                    })},3000)
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
                  <SubHeading style={{ color: "red" }} className="m-4 ps-3">
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
    </span>
  );
}
