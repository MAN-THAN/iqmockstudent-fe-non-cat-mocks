import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { Component } from "react";
import { RxCross1 } from "react-icons/rx";
import { SubHeading } from "./../styleSheets/Style";
import { MyButton } from "./../styleSheets/Style";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Image } from "antd";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  textAlign: "",
  height: 400,
  bgcolor: "white",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 2,
  backroundSize: "cover",
  backgroundRepeat: "no-repeat",
  objectfit: "cover",
};

export default function ImageButton({ src }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <img
        src={src}
        alt=""
        className="img-fluid hover-zoom"
        width="100%"
        style={{ cursor: "pointer", transition: "all 0.4s" }}
        onClick={handleOpen}
      />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Image src={src} alt="" height="100%" width="100%" style={{ cursor: "pointer", transition: "all 0.4s" }} />
        </Box>
      </Modal>
    </span>
  );
}
