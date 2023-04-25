import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const InfoCard = ({ iconPath, label, value, infoIconPath, background }) => {
  return (
    <Card
      sx={{
        width: "14.146em",
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5em 0",
        borderRadius: "0.9em",
        background
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 0, alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <img src={iconPath} className="img-fluid" width={27.48} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <Typography sx={{ fontSize: "23.52px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>{ value }%</Typography>
          <Typography sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}>{ label }</Typography>
        </Box>
        {infoIconPath && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <img src={infoIconPath} className="img-fluid" />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export const TempCompo = ({ studentAttempted, attemptedCorrect, duration, avgTimeSpent, topperDuration }) => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", alignItems: "center", justifyContent: "space-around", width: "80%" }}>
        <InfoCard iconPath="/click 1.svg" label="Student Attempted" value={studentAttempted} infoIconPath="/info1.svg" />
        <InfoCard iconPath="/checked 1.svg" label="Attempted Correct" value={attemptedCorrect} infoIconPath="/info1.svg" />
        <InfoCard iconPath="/chronometer 1.svg" label="Time spent by you" value={duration} infoIconPath="/info1.svg" />
        <InfoCard iconPath="/chronometer 1.svg" label="Average Time Spent" value={avgTimeSpent} infoIconPath="/info1.svg" />
        <InfoCard iconPath="/chronometer 1.svg" label="Time Spent by Topper" value={ topperDuration } infoIconPath="/info1.svg" background={"var(--dark-blue)"} />
      </Box>
    </React.Fragment>
  );
};
