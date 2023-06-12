import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getVerified } from "../services/Mock_api";
import Modal from "@mui/material/Modal";
import { SubHeading } from "./../styleSheets/Style";
import { MyButton } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { SubmitButton } from "../styleSheets/Style";
import { InfinitySpin } from "react-loader-spinner";
import { Image } from "react-bootstrap";
import { submitSection } from "../services/Mock_api";
import { Button } from "antd";
import Box from "@mui/material/Box";

const MainUserAuth = () => {
  const navigate = useNavigate();
  const { email, otp, mockId, setId } = useParams();
  const [loader, setLoader] = useState(true);
  const temp = { email: "john@example.com", otp: "49858", setId: "xyx", mockId: "6430e9e837185e086ad69368" };
  const [openModal, setModal] = useState(false);
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
  const buttonStyle = {
    background: "linear-gradient(91.59deg, #FD4153 18.67%, #F77A5B 98.68%)",
    width: "138px",
    color: "#fff",
    borderRadius: "20px",
  };

  // Checking mobile or desktop view

  useEffect(() => {
    const isMobileOrTablet = window.matchMedia("(max-width:1000px)").matches;
    console.log(isMobileOrTablet);
    if (isMobileOrTablet) {
      navigate("/mobileErrorPage");
    } else {
      const storedQuestionStatus = JSON.parse(localStorage.getItem("questionStatus"));
      if (storedQuestionStatus) {
        console.log(storedQuestionStatus);
        setModal(true);
      } else {
        startVerification();
      }
    }
  }, []);

  //  resume mock(if question data is present)
  const resumeMock = () => {
    const storedQuestionStatus = JSON.parse(localStorage.getItem("questionStatus"));
    const prevMockId = JSON.parse(localStorage.getItem("currMockId"));
    const type = storedQuestionStatus[0].section;
    console.log(type);
    if (type === "VARC") {
      navigate(`/main`, {
        state: {
          mockId: prevMockId,
          type: "varc",
        },
      });
    } else if (type === "LRDI") {
      navigate(`/main`, {
        state: {
          mockId: prevMockId,
          type: "lrdi",
        },
      });
    } else if (type === "QUANTS") {
      navigate(`/main`, {
        state: {
          mockId: prevMockId,
          type: "quants",
        },
      });
    }
  };

  // Removing question data

  const eraseQuestionData = () => { 
    localStorage.clear();
    startVerification();
    // api call
  }

  // Function for VERIFICATION
  const startVerification = async () => {
    console.log("verifying");
    try {
      const response = await getVerified(email, otp, mockId);
      console.log(response);
      if (response?.status == 200) {
        localStorage.setItem("auth_token", response?.data?.accessToken);
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        const arr_length = response?.data?.attemptList?.length;
        if (arr_length == 0) {
          console.log("New user");
          navigate(`/onboarding`, {
            state: {
              mockId: mockId,
              setId: setId,
            },
          });
        } else {
          console.log("already attempted");
          showToastMessageForAnalysis();
          const Last_attempt_id = response?.data.attemptList[0];
          setTimeout(() => {
            navigate(`/analysis/${mockId}/${Last_attempt_id}/overall`);
          }, 4000);
        }
      }
    } catch (err) {
      showToastMessage(err?.response?.data?.message);
      console.log(err);
    }
  };
  const showToastMessageForAnalysis = () => {
    toast.info("You have already attempted this mock, redirecting to your Analysis", {
      position: toast.POSITION.TOP_CENTER,
    });
    return null;
  };
  const showToastMessage = (msg) => {
    toast.error(msg == undefined ? "Some error occurred! Please reload the page." : msg, {
      position: toast.POSITION.TOP_CENTER,
    });
    return setLoader(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "95vh", justifyContent: "center", alignItems: "center" }}>
        {loader ? (
          <>
            {" "}
            <RingLoader color="var(--orange)" size="150px" />
            <h5 className="loader_title" style={{ textAlign: "center", marginTop: "1em" }}>
              Authenticating..... Please wait!
            </h5>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex justify-content-center">
            <Box
              component="img"
              sx={{
                height: 200,
                width: 600,
              }}
              alt="no IMage"
              src="/ModalImage.png"
            />
          </div>
          <div className="d-flex justify-content-center">
            <SubHeading style={{ color: "#494949", fontWeight: "550", fontSize: "16px" }} className="ps-5">
              You have not completed your previous mock, press continue to resume or discard to erase your data.
            </SubHeading>
          </div>
          <div className="d-flex justify-content-evenly" style={{ marginTop: "1.8em" }}>
            <MyButton
              variant="contained"
              sx={{
                bgcolor: "#EBEBEB",
                color: "black",
                borderRadius: "20px",
                ":hover": { background: "#EBEBEB", color: "black" },
                width: "138px",
              }}
              onClick={() => eraseQuestionData()}
            >
              Discard
            </MyButton>
            <MyButton variant="contained" style={buttonStyle} onClick={() => resumeMock()}>
              Continue
            </MyButton>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default MainUserAuth;
