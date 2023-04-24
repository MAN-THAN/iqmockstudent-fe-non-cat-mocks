import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";


function ErrorTracker() {
  return (
    <Box component="main" sx={{ display: "flex" }}>
      <MenuDrawer />
      <h1>Erorr tracker</h1>
    </Box>
  )
}

export default ErrorTracker