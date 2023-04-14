import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";

function OnBoarding() {
  return (
    <Box component="main" sx={{ display: "flex" }}>
      <MenuDrawer />
      <h1>OnBoarding</h1>
    </Box>
  );
}

export default OnBoarding;
