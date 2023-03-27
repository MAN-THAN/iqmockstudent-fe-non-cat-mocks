import { Link, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BootstrapButton, SubHeading } from "./../styleSheets/Style";
import { useNavigate } from "react-router-dom";

function Instructions() {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate(`/terms`);
  };

  return (
    <div className="container ">
      <div className="logo container text-center my-4">
        <img
          src={require("../images/iQuanta.png")}
          className="img-fuid mx-auto "
          width={150}
          alt="no img"
        />
      </div>

      <div className="container border-2 mt-3 p-4 text-center ">
        <SubHeading className="text-center"> Instructions</SubHeading>
        <div
          className="container m-2 p-4 mx-auto overflow-auto text-start"
          style={{
            border: "2px solid black",
            background: "var(--background-color)",
            height: "30em",
          }}
        >
          <Typography variant="paragraph">General instructions:</Typography>
          <ol className="fw-bold">
            <li className="mt-3">
              <Typography variant="paragraph">
                The clock has been set on the server and countdown timer at top
                right corner of your screen will display the remaining time for
                you to complete the exam. When the clock runs out the exams ends
                by default- you are not required to end or submit your exam
              </Typography>
            </li>
            <li className="mt-3">
              <Typography variant="paragraph">
                The questions palette at the right of screen shows one of the
                following status of each of the questions numbered
              </Typography>

              <ul className="list-unstyled">
                <li>
                  <div className="d-flex pt-3 align-items-center">
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
                </li>
                <li>
                  <div className="d-flex pt-3 align-items-center">
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
                </li>
                <li>
                  <div className="d-flex align-items-center pt-3">
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
                </li>
                <li>
                  {" "}
                  <div className="d-flex pt-3 align-items-center">
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
                </li>
                <li>
                  {" "}
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
                      This question has been answered and marked for review.
                      This will be considered for evaluation
                    </Typography>
                  </div>
                </li>
                <li className="mt-2">
                  <Typography>
                    The Marked for Review status simply acts as a reminder that
                    you have set to look at the question again. If an answer is
                    selected for a question that is Marked for Review, the
                    answer will be considered in the final evaluation
                  </Typography>
                  <Typography>Navigation to a question</Typography>
                </li>
              </ul>
            </li>

            <li className="mt-3  ">
              <Typography variant="paragraph">
                To select a question to answer, you can do one of the following:
              </Typography>
              <ul className="list-unstyled">
                <li className="mt-2">
                  <Typography>
                    {" "}
                    Click on the question number on the question palette at the
                    right of your screen to go to that numbered question
                    directly. Note that using this option does NOT save your
                    answer to the current question
                  </Typography>
                </li>
                <li className="mt-2">
                  <Typography>
                    {" "}
                    Click on Save and Next to save answer to current question,
                    mark it for review, and to go to the next question in
                    sequence
                  </Typography>
                </li>
              
              </ul>
            </li>
            <li className="mt-3">
                  <Typography variant="paragraph">
                    {" "}
                    You can view the entire paper by clicking on the All
                    Questions button
                  </Typography>
                  <ul className="list-unstyled">
                    <li> <Typography  sx={{ my: "10px" }}>
              Answering questions
            </Typography></li>
                  </ul>
            </li>
           
            <li className="mt-3">
              <Typography variant="paragraph">
                For multiple choice type question
              </Typography>
              <ol className="fw-lighter list-inline "style={{listStyleType:"lower-alpha"}}>
                <li className="mt-2">
                  {" "}
                  <Typography>
                    To select your answer, click on one of the option buttons
                  </Typography>{" "}
                </li>
                <li className="mt-2">
                  <Typography>
                    To change your answer, click the another desired option
                    button
                  </Typography>{" "}
                </li>
                <li className="mt-2">
                  {" "}
                  <Typography>
                    To save your answer, you MUST click on save
                  </Typography>{" "}
                </li>
                <li className="mt-2">
                  {" "}
                  <Typography>
                    {" "}
                    To deselect a chosen answer, click on the chosen option
                    again or click on the Clear Response button
                  </Typography>
                </li>
                <li className="mt-2">
                  {" "}
                  <Typography>
                    To mark a question for review click on Mark for Review &
                    Next If an answer is selected for a question that is Marked
                    for Review, the answer will be considered in the final
                    evaluation
                  </Typography>{" "}
                </li>
              </ol>
            </li>

            <li className="mt-3">
              <Typography variant="paragraph">
                {" "}
                To change an answer to a question, first select the question and
                then click on the new answer option followed by a click on the
                save button
              </Typography>
            </li>
            <li className="mt-3">
              <Typography variant="paragraph">
                Questions that are saved or marked for review after answering
                will ONLY be considered for evaluation
              </Typography>
            </li>
            <li className="my-3">
              <Typography variant="paragraph">
                If quiz is paused, quiz can be continued from where left off
                within scheduled time
              </Typography>
            </li>
            <Typography  sx={{color:"black"}}>Navigation through sections :</Typography>
            <li className="mt-3">
              <Typography variant="paragraph">
                {" "}
                Sections in this question paper are displayed on the top bar of
                the screen. Questions in a section can be viewed by clicking on
                the section name. The section you are currently viewing is
                highlighted
              </Typography>
            </li>
            <li className="mt-3">
              <Typography variant="paragraph">
                {" "}
                After clicking the save button on the last question for a
                section,you will automatically be taken to the first question of
                the next section{" "}
              </Typography>
            </li>
            <li className="mt-3">
              <Typography variant="paragraph">
                {" "}
                You can move the mouse cursor over the section names to view the
                status of the questions for that section
              </Typography>
            </li>
            <li className="mt-3">
              <Typography variant="paragraph">
                You can shuffle between sections and questions anytime during
                the examination as per your convenience
              </Typography>
            </li>
          </ol>
        </div>
        <BootstrapButton
          height="30"
          variant="contained mx-auto"
          sx={{ color: "white", p: 3, my: 2 ,borderRadius:"30px"}}
          onClick={handleClick}
        
        >
          Next
        </BootstrapButton>
      </div>
    </div>
  );
}

export default Instructions;

