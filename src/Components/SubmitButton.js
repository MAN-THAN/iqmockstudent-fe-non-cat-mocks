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
import { useParams } from "react-router";
import { SubmitButton } from "../styleSheets/Style";
import { Puff } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  textAlign: "",
  height: 250,
  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2,
  overflowY: "scroll",
};

export default function ButtonSubmit() {
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleConfirmOpen = () => setOpenConfirm(true)
  const handleConfirmClose = () => setOpenConfirm(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const [Loader, setLoader] = useState(true);

  const FinalSubmitTest = () => { 
    handleOpen();
    // final submit api call
  }
  return (
    <span>
      <SubmitButton
        sx={{ width: "100%", marginTop: "1em" }}
        disabled={params.type === "varc" || params.type === "lrdi" ? true : false}
        variant="contained"
        onClick={() => handleConfirmOpen()}
      >
        Submit
      </SubmitButton>
      {/* Confirm modal */}
      <Modal open={openConfirm} onClose={handleConfirmClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex justify-content-center">
            <SubHeading className="m-5 ps-3">Do you really want to submit? </SubHeading>
          </div>
          <div className="d-flex justify-content-center" style={{marginTop : "0.5em"}}>
            <MyButton variant="contained" sx={{ bgcolor: "red" }} onClick={ handleConfirmClose }>
              No
            </MyButton>
            <MyButton variant="contained" sx={{ bgcolor: "green" }} onClick={ FinalSubmitTest }>
              Yes
            </MyButton>
          </div>
        </Box>
      </Modal>
      {/* Submitting Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex justify-content-center">
            <SubHeading className="m-0 ps-3">Test Submitting... </SubHeading>
          </div>
          <div className="d-flex justify-content-center" style={{ marginTop: "1.5em" }}>
            {Loader ? (
              <Puff height="120" width="120" radius={1} color="#4fa94d" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </span>
  );
}
