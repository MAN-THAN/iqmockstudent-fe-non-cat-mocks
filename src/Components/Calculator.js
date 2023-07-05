import Box from "@mui/material/Box";
import "../styleSheets/Calculator.css";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { SubHeading } from "./../styleSheets/Style";
import { PaperComponent } from "./PaperCompo";
import { Dialog } from "@mui/material";
import CatExamCalculator from "../Common-comp/newCalculator";

const style = {
  cursor: "move",
  width: "auto",
  textAlign: "center",
  height: "auto",
  background: "none",
  borderRadius: 3,
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  zIndex: 1000,
};

export default function Calc() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <img
        src={require("../images/Icon.png")}
        width="70"
        role="button"
        className="img-fluid p-2"
        alt="arrow-icon"
        onClick={handleOpen}
      />
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
          <div>
            <CatExamCalculator
              Comp={<RxCross1 role="button" onClick={handleClose} />}
            />
          </div>
        </Box>
      </Dialog>
    </span>
  );
}
