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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  textAlign: "",
  height: 550,
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
  console.log(question_paper);

  return (
    <span>
      <MyButton variant="contained" sx={{ width: "130px" }} onClick={handleOpen}>
        Question Paper
      </MyButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex justify-content-between">
            <SubHeading className="m-0 ps-1">Question Paper </SubHeading>
            <RxCross1 role="button" onClick={handleClose} />
          </div>
          {question_paper.map((e, index) => {
            return (
              <div className="container p-2">
                <Typography variant="paragraph fw-bold" mt='10px'>
                  Question : {index + 1}
                  <br />
                  {question_paper.length > 0 && question_paper[index].question}
                </Typography>
                <ul style={{ listStyleType: "disc", padding: "20px", }}>
                  {question_paper.length > 0 &&
                    question_paper[index].options.map((option, ind) => (
                      <li key={ind}>
                        { option }
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </Box>
      </Modal>
    </span>
  );
}
