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
import { discardMock } from "../services/Mock_api";
import { Last } from "react-bootstrap/esm/PageItem";

const MainUserAuth = () => {
  const navigate = useNavigate();
  const { email, otp, mockId, setId } = useParams(); // send DATA TO VERIFICATION API FOR
  const [loader, setLoader] = useState(true);
  const temp = {
    email: "john@example.com",
    otp: "49858",
    setId: "xyx",
    mockId: "6430e9e837185e086ad69368",
  };
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

  useEffect(() => {
    const isMobileOrTablet = window.matchMedia("(max-width:1000px)").matches;
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (isMobileOrTablet) {
      navigate("/mobileErrorPage");
    } 
    else if (userData && userData?.email === email) {
      const storedQuestionStatus = JSON.parse(
        localStorage.getItem("questionStatus")
      );
      if (storedQuestionStatus) {
        setModal(true);
      } else {
        startVerification(); // ?doubtfu;!!!!!!!
      }
    } else if (userData && userData?.email !== email) {
      // cross user(User trying to log in with different account)
      showToastMessage("New Login Detected!");
      // //alert("maNTHAN")
      startVerification();
    } else {
      startVerification();
    }
  }, []);



  //resume mock(if question data is present)

  const resumeMock = () => {
    //alert("resume mock")
    const storedQuestionStatus = JSON.parse(
      localStorage.getItem("questionStatus")
    );
    const prevMockId = localStorage.getItem("currMockId");
    const prevAttemptId = localStorage.getItem("attemptId");
    const type = storedQuestionStatus[0].section;
    //console.log(type);
    navigate(`/main`, {
      state: {
        mockId: prevMockId,
        attemptId: prevAttemptId,}
      })
  };

  // Removing question data

  const eraseQuestionData = async () => {
    const prevAttemptId = localStorage.getItem("attemptId");
    const uid = JSON.parse(localStorage.getItem("userData"))?._id;
    // localStorage.clear();
    setModal(false);
    setLoader(true);
    try {
      const res = await discardMock(prevAttemptId, uid);
      if (res?.status == 200) {
        localStorage.clear();
        setLoader(false);
        showToastMessageForDiscard();
        setTimeout(() => {
        window.location.href = "https://www.iquanta.in/cat-mock-test";
      }, 2000);
      }
    } catch (err) {
      showToastMessage(err?.response?.data?.message);
      ////console.log(err);
    }
  };

  // Function for VERIFICATION
  const startVerification = async () => {
    ////console.log("verifying");
    try {
     // alert('start called');
      localStorage.clear();
      const response = await getVerified(email, otp, mockId);
      //console.log("start verification", response);
      if (response?.status == 200) {
        localStorage.setItem("auth_token", response?.data?.accessToken);
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        const arr_length = response?.data?.attemptList?.length;
        //console.log(arr_length);
        if (arr_length == 0) {
          ////console.log("New user");
          navigate(`/instructions`, {
            state: {
              mockId: mockId,
              setId: setId,
            },
          });
        } else {
          ////console.log("already attempted");
          //alert('!!')
          const Last_attempt_id_Obj =
            response.data.attemptList.length > 0 &&
            response?.data?.attemptList[0];
            const sectionType = Last_attempt_id_Obj.sectionName
            const isSectionSubmitted = Last_attempt_id_Obj?.isSubmitted;
          if (isSectionSubmitted) {
            showToastMessageForAnalysis();
            setTimeout(() => {
              navigate(
                `/analysis/${mockId}/${Last_attempt_id_Obj.attemptId}/overall`
              );
            }, 2000);
          } else {
            // setting mock data from api to localstorage
            const mockData = Last_attempt_id_Obj.mockData;
            
            if (mockData) {
              localStorage.setItem("questionStatus", JSON.stringify(mockData));
              localStorage.setItem("currMockId", mockId);
              localStorage.setItem("attemptId", Last_attempt_id_Obj.attemptId);
              localStorage.setItem("sectionType",sectionType);
              localStorage.setItem("lastAttemptedQuestionIndex",Last_attempt_id_Obj.lastAttemptedQuestionIndex);
              localStorage.setItem(
                "my-counter-min",
                Last_attempt_id_Obj?.timer.minutes
              );
              localStorage.setItem(
                "my-counter-sec",
                Last_attempt_id_Obj?.timer.seconds
              );
              setModal(true);
            } else {
              localStorage.clear();
              setTimeout(() => {
                localStorage.clear();
                window.location.href = "https://www.iquanta.in/cat-mock-test";
              }, 2000);
                // window.location.href = "https://www.iquanta.in/cat-mock-test";
            }
          }
        }
      }
    } catch (err) {
      //console.log(err, "231");
      //alert('!!!!')
      showToastMessage(err?.response?.data?.message);
      ////console.log(err);
      // setTimeout(() => {
      //   localStorage.clear();
      //   window.location.href = "https://www.iquanta.in/cat-mock-test";
      // }, 2000);
    }
  };

  const showToastMessageForAnalysis = () => {
    toast.info(
      "You have already attempted this mock, redirecting to your Analysis",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    return null;
  };
  const showToastMessage = (msg) => {
    toast.error(msg == undefined ? "Some error occurred!" : msg, {
      position: toast.POSITION.TOP_CENTER,
    });

    return setLoader(false);
  };
  const showToastMessageForDiscard = () => {
    toast.info(
      "Your Mock has been Discarded",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  return (
    <React.Fragment>
      <ToastContainer autoClose={1500} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "95vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loader ? (
          <>
            {" "}
            <RingLoader color="var(--orange)" size="150px" />
            <h5
              className="loader_title"
              style={{ textAlign: "center", marginTop: "1em" }}
            >
              Authenticating..... Please wait!
            </h5>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <div className="d-flex justify-content-center p-4">
            <SubHeading
              style={{ color: "red", fontWeight: "700", fontSize: "16px" }}
            >
              You have not completed your previous mock, press continue to
              resume or press discard.
            </SubHeading>
          </div>
          <div className="d-flex justify-content-evenly">
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
            <MyButton
              variant="contained"
              style={buttonStyle}
              onClick={() => resumeMock()}
            >
              Continue
            </MyButton>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default MainUserAuth;
