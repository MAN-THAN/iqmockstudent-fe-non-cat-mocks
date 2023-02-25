import { Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BootstrapButton, SubHeading } from "./../styleSheets/Style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Context";

function Instructions() {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate(`/terms`);
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="logo container text-center my-4">
        <img
          src={require("../images/iQuanta.png")}
          className="img-fuid mx-auto"
          width={150}
          alt=""
        />
      </div>

      <div className="container border-2 mt-3 p-4 text-center ">
        <SubHeading className="text-center"> Instructions</SubHeading>
        <div
          className="container m-2 mx-auto "
          style={{
            border: "2px solid black",
            background: "var(--background-color)",
          }}
        >
          <div className="my-3 p-3 rounded ">
            <div className="d-flex text-muted pt-3 align-items-center">
              <img
                src={require("../images/Rectangle 88.jpg")}
                className="img-fluid bd-placeholder-img flex-shrink-0 me-2 shadow-lg"
                width={40}
                height={40}
                alt=""
              />

              <Typography variant="paragraph" className="text-start">
                {" "}
                This question has not been visited yet
              </Typography>
            </div>

            <div className="d-flex text-muted pt-3 align-items-center">
              <img
                src={require("../images/orange.png")}
                className="img-fuid bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={40}
                height={40}
                alt=""
              />
              <Typography variant="paragraph" className="text-start">
                {" "}
                This question has been visited, but not answered.
              </Typography>
            </div>
            <div className="d-flex text-muted align-items-center pt-3">
              <img
                src={require("../images/green.png")}
                className="img-fuid bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={40}
                height={40}
                alt=""
              />

              <Typography variant="paragraph" className="text-start">
                {" "}
                This question has been answered and will be considered for
                evaluation
              </Typography>
            </div>
            <div className="d-flex text-muted pt-3 align-items-center">
              <img
                src={require("../images/answered.png")}
                className="img-fuid bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={40}
                height={40}
                alt=""
              />
              <Typography variant="paragraph" className="text-start">
                {" "}
                This question has been marked for review and has not been
                answered
              </Typography>
            </div>
            <div className="d-flex  pt-3 align-items-center">
              <img
                src={require("../images/evolution.png")}
                className="img-fuid bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={40}
                height={40}
                alt=""
              />
              <Typography variant="paragraph" className="text-start">
                {" "}
                This question has been answered and marked for review. This will
                be considered for evaluation
              </Typography>
            </div>
          </div>
        </div>
        <BootstrapButton
          variant="contained mx-auto"
          sx={{ color: "white", p: 3, my: 2 }}
          onClick={handleClick}
        >
          Next
        </BootstrapButton>
      </div>
    </div>
  );
}

export default Instructions;
