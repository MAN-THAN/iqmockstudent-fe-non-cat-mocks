import Box from "@mui/material/Box";
import "../styleSheets/Calculator.css";
import Modal from "@mui/material/Modal";

import React, { Component } from "react";
import { RxCross1 } from 'react-icons/rx';
import Calculator from "awesome-react-calculator";
import { SubHeading } from './../styleSheets/Style';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  textAlign: "center",
  height: 420,
  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2
  ,
};

export default function Calc() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function onResultChange(result) {
    console.log(result);
  }

  return (
    <span>
      <img
        src={require("../images/Icon.png")}
        width="70"
        className="img-fluid p-2"
        alt="arrow-icon"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      
         <div className="d-flex justify-content-between">
         <SubHeading className= "m-0 p-0">Calculator </SubHeading>
        <RxCross1 role="button" onClick={handleClose}/>
         </div>
         
          <div className="container calcContainer" >

          <Calculator  onResultChange={onResultChange} />
          </div>
        </Box>
      </Modal>
    </span>
  );
}
