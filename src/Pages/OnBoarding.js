import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import MainHeader from "../Components/MainHeader";
import LineChart1 from "../Components/LineGraph1";
import LoginForm from "../Components/LoginForm";
import { useState } from "react";

function OnBoarding() {
  const [percentile, setPercentile] = useState(80);
  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", paddingTop: 6, paddingLeft : 6, paddingRight : 6, width: "100vw", height: "100vh", background: "url(/onboarding_image.png)",overflow : "hidden", position : "relative" }}
    >
      <Box>
        <MainHeader />
      </Box>
      <Box sx={{width : "100%", height : "100%",}}>
        <LineChart1 percentile={ percentile } />
      </Box>
      <Box sx={{position : "absolute", top : "17%", zIndex :100}}>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default OnBoarding;
