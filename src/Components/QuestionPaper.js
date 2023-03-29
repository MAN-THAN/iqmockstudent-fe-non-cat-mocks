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
import Fade from "@mui/material/Fade";

import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundImage: "url('/QuestionsPaper.jpg')",
  backroundSize: "300px 100px",
  backgroundRepeat: "no-repeat",
  width: 750,
  textAlign: "",
  height: 650,
  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2,
  overflowY: "scroll",
};

export default function QuestionPaper({ question_paper }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  function onResultChange(result) {
    console.log(result);
  }

  return (
    <span>
      <MyButton
        variant="contained"
        height="41"
        sx={{
          width: "150px",
          margin: 0,
          marginTop: "1em",
          ":hover": { boxShadow: 5 },
        }}
        onClick={handleOpen}
      >
        Question Paper
      </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="d-flex text-center">
              <SubHeading className="m-0 ps-1 fw-bold text-center">
                Question Paper{" "}
              </SubHeading>
              {/* <RxCross1 role="button" onClick={handleClose} /> */}
            </div>
            <br />
            {question_paper?.map((e, index) => {
              return (
                <div className="container p-2 ">
                  <Typography variant="paragraph fw-bold">
                    Question : {index + 1}
                  </Typography>
                  <br />
                  <Typography variant="paragraph fw-bold">
                    {Boolean(e.question) === true && (
                      <Latex>{e.question}</Latex>
                    )}
                  </Typography>

                  <ul
                    style={{
                      listStyleType: "disc",
                      padding: "10px",
                      margin: "0",
                    }}
                  >
                    {e.options !== null &&
                      e.options.map((option, ind) => (
                        <li key={ind}>
                          <Latex>{option}</Latex>
                        </li>
                      ))}
                  </ul>
                  <hr />
                </div>
              );
            })}
          </Box>
        </Fade>
      </Modal>
    </span>
  );
}
