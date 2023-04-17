import React, { useEffect } from "react";
import MenuDrawer from "../Components/MenuDrawer";
import Box from "@mui/material/Box";
import MainHeader from "../Components/MainHeader";
import LineChart1 from "../Components/LineGraph1";
import LoginForm from "../Components/LoginForm";
import { Button } from "@mui/material";
import { useState } from "react";

function OnBoarding() {
  const [percentile, setPercentile] = useState(80);
  const [userData, setUserData] = useState();
  const [isUserVerified, setUserVerified] = useState(false);
  console.log(userData);
  useEffect(() => { 
    if (userData) { 
      setUserVerified(true)
    }
  }, [userData])
  const handleSubmit = () => { 
    
  }
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 6,
        paddingLeft: 6,
        paddingRight: 6,
        width: "100vw",
        height: "100vh",
        background: "url(/onboarding_image.png)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box>
        <MainHeader />
      </Box>
      <Box sx={{ width: "100%", height: "100%" }}>
        <LineChart1 percentile={percentile} />
      </Box>
      <Box sx={{ position: "absolute", top: "17%", zIndex: 100 }}>
        <LoginForm setUserData={setUserData} />
      </Box>
      <Box sx={{position : "absolute", bottom : "28.5%", right : 50}}>
        <Button
          startIcon={<img alt="rocket" width="20px" height="20px" src="/rocket.png" />}
          sx={{ background: "linear-gradient(to bottom, #306DF8, #661FCF)" }}
          variant="contained"
          style={{ borderRadius: "25px", padding: "14px" }}
          disabled={!isUserVerified}
          onClick={ handleSubmit }
        >
          Start Mock
        </Button>
      </Box>
    </Box>
  );
}

export default OnBoarding;
