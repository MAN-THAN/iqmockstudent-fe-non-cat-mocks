import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Latex from "react-latex-next";

function ContentDrawer(props) {

  return (
    <Box sx={{ padding: 2, color: "black" }}>
      <CssBaseline />

      <small>
        <Latex>{props.question}</Latex>
      </small>

      <div className="container p-2">{props.image}</div>
    </Box>
  );
}

export default ContentDrawer;
