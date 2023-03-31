import Box from "@mui/material/Box";
import "../styleSheets/Calculator.css";
import Modal from "@mui/material/Modal";
import React, { Component } from "react";
import { RxCross1 } from "react-icons/rx";
import Calculator from "awesome-react-calculator";
import Backdrop from "@mui/material/Backdrop";
import { SubHeading } from "./../styleSheets/Style";
import { PaperComponent } from "./PaperCompo";
import { Dialog } from "@mui/material";

const style = {
  cursor : "move",
  width: 360,
  textAlign: "center",
  height: 420,
  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2,
  zIndex: 1000,
};

export default function Calc() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <img src={require("../images/Icon.png")} width="70" role="button" className="img-fluid p-2" alt="arrow-icon" onClick={handleOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 10000 }}
        hideBackdrop={true}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Box sx={style} id="draggable-dialog-title">
          <div className="d-flex justify-content-between">
            <SubHeading className="m-0 p-0">Calculator </SubHeading>
            <RxCross1 role="button" onClick={handleClose} />
          </div>

          <div className="container calcContainer">
            <Calculator />
          </div>
        </Box>
      </Dialog>
    </span>
  );
}
