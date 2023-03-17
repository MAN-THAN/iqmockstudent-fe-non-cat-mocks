import { Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BootstrapButton, SubHeading } from "./../styleSheets/Style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Context";




function Terms() {
  const [handleAgree, setHandleAgree] = useState(false);
  const [handleStartText, setHandleStartText] = useState(true);
  const navigate = useNavigate();
  const { createAttemptId, responseReceived, attemptID, buttonLoading } = useAuth();
  const [loader, setLoader] = useState();


  const attempt = localStorage.getItem("attemptID")
  useEffect(() => {
    if (responseReceived || attempt) {
      setHandleAgree(true);
      setHandleStartText(false);
    }

    else {
      setHandleStartText(true);
      setHandleAgree(false);
    }
  }, [responseReceived, attempt]);


  const handleClick = async () => {
    console.log(attemptID);
    localStorage.setItem("attemptID", attemptID);
     navigate(`/main/${process.env.REACT_APP_MOCK_ID}/varc`);

  };

  const agreeAccept = async () => {
    setHandleAgree(true);
    setHandleStartText(false)
    await createAttemptId()
  }

  return (
    <div className="container d-flex-col justify-content-center align-content-center" style={{ marginTop: "5%", height: "100vh" }}>
      <div className="logo container text-center my-4">
        <img src={require("../images/iQuanta.png")} className="img-fuid mx-auto" width={150} alt="" />
      </div>

      <div className="container mt-3 p-4 text-center">
        <SubHeading className="text-center"> Terms & conditions</SubHeading>
        <div className="container d-flex justify-content-center   m-2">
          <div className=" d-flex justify-content-center  " style={{ height: "60vh", width: "75vw" }}>
            <div
              className=" flex-item text-start overflow-auto p-4 "
              style={{
                border: "2px solid black",
                background: "var(--background-color)",
                borderRadius: "0px",
              }}
            >
              <Typography variant="text">
                Every company that manufactures and sells products uses this clause to limit what customers can hold them accountable for.
              </Typography>
              <br /> <br />
              <Typography variant="text">
                Most startup will <b>restrict liability of the following</b>
              </Typography>
              <br /> <br />
              <div className="ps-3">
                <ul style={{ listStylePosition: "outside", paddingLeft: "0px" }}>
                  <li>
                    <Typography variant="text">Lack of enjoyment, since it's subjective and prone to change.</Typography>
                  </li>
                  <li>
                    <Typography variant="text">Damage caused by viruses, spyware, or software damage.</Typography>
                  </li>
                  <li>
                    <Typography variant="text">Damage caused by third parties.</Typography>
                  </li>
                  <li>
                    <Typography variant="text">
                      Modifications and interruptions - while you can include them as a separate clause as covered below, many companies choose to
                      have it as part of their limitation of liability and warranty clause
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="text">
                      Errors and inaccuracies - as with modifications and interruptions, you can choose to include errors and inaccuracies in a
                      separate "corrections" section. However, most companies choose to include it under this clause.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="text">Damage caused by third parties.</Typography>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center  align-self-center gap-5 my-3">
          <BootstrapButton
            variant="contained mx-auto"
            disabled={handleAgree}
            sx={{
              color: handleAgree ? "black" : "white",
              p: 2.5,
              backgroundColor: handleAgree ? "#d2d4d6" : "",
            }}
            onClick={agreeAccept}
          >
            Agree
          </BootstrapButton>



          <BootstrapButton
            variant="contained mx-auto"
            disabled={handleStartText}
            loading={buttonLoading}
            sx={{
              color: "white",
              p: 2.5,
              background: handleStartText ? "#d2d4d6" : "",
            }}
            onClick={handleClick}

          >
            Start Test
          </BootstrapButton>
        </div>
      </div>
    </div>
  );
}

export default Terms;
