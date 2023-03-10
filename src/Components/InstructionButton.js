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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 750,
  textAlign: "",
  height: 650,

  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2,
  overflowY: "scroll",
};

export default function InstructionButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  function onResultChange(result) {
    console.log(result);
  }

  return (
    <span>
      <MyButton variant="contained" sx={{ width: "150px", margin : 0, marginTop : '1em' }} onClick={handleOpen}>
        Instructions
      </MyButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex justify-content-between">
            <SubHeading className="m-0 ps-3">Instructions </SubHeading>
            <RxCross1 role="button" onClick={handleClose} />
          </div>
          <Typography>
            <ul style={{ listStyleType: "disc", marginTop: "20px" }}>
              <li style={{ fontWeight: "700" }}>
                {" "}
                The clock has been set on the server and countdown timer at top right corner of your screen will display the remaining time for you to
                complete the exam. When the clock runs out the exams ends by default- you are not required to end or submit your exam
              </li>
              <li style={{ fontWeight: "700", marginTop: "20px" }}>
                The questions palette at the right of screen shows one of the following status of each of the questions numbered
              </li>
              <li style={{ fontWeight: "700", marginTop: "20px" }}>
                The Marked for Review status simply acts as a reminder that you have set to look at the question again. If an answer is selected for a
                question that is Marked for Review, the answer will be considered in the final evaluation
              </li>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}
