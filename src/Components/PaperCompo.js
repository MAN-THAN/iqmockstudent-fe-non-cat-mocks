import * as React from "react";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";


export function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}