import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";

function ContentDrawer(props) {
 
  return (
    <Box sx={{ padding:2,color:"black"}}>
      <CssBaseline />
        <Typography variant="paragraph fw-bold">{props.question}</Typography>
        <br />
        <small >
        {props.content}
        </small>
       
    </Box>
  );
}

export default ContentDrawer;
