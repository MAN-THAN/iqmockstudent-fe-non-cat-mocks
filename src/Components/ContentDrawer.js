import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Latex from "react-latex-next";



function ContentDrawer(props) {
 

  return (
    <>
      <Box sx={{ padding: 2, color: "black" , height : "100%"}}>
        <CssBaseline />

        <div style={{height : "100%"}}>
          <iframe style={{ width: "100%", height: "100%" }} src={props.question}></iframe>
        </div>

        <div className="container p-2">{props.image}</div>
      </Box>
    </>
  );
}

export default ContentDrawer;
