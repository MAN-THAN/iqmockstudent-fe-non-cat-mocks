import React from "react";
import MenuDrawer from "../Components/MenuDrawer";
import HeaderNew from "../Components/HeaderNew";
import { Box, Typography } from "@mui/material";
import { typographyStyles } from "../styleSheets/StyleNew";
import MultipleSelect from "../Components/DropdownComp";

function ErrorTracker() {
  const Subjects = [
    {
      name: "Varc",
    },
    {
      name: "Quants",
    },
    {
      name: "LRdi",
    },
    {
      name: "MBA",
    },
    {
      name: "MIA",
    },
  ];

  return (
    <Box component="main" sx={{ display: "flex" }}>
      <MenuDrawer />

      <Box sx={{ flexGrow: 1, p: 2, width: "calc(100% - 240px)" }}>
        <Box component="header">
          <HeaderNew />
        </Box>

        <Box component="div" sx={{mt:4}}>
          <MultipleSelect options={Subjects} />
          <Typography
            sx={{
              ...typographyStyles.mainHeading,
              pt:2
            }}
          >
            {" "}
            Error Tracker
          </Typography>
        </Box>


        <Box component="main" sx={{display:"flex", width:"100%",}}>
        <Box sx={{backgroundColor:"transparent", flexBasis:"40%", borderRight:"2px solid #928F8F "}}>
            
        </Box>
        <Box sx={{backgroundColor:"", flexBasis:"60%"}}>jnkml</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorTracker;
