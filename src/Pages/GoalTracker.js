import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";

function GoalTracker() {
  return (
    <Box component="main" sx={{ display: "flex" }}>
    <MenuDrawer />
    <h1>GoalTracker</h1>
  </Box>

  )
}

export default GoalTracker