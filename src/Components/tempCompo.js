import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const TempCompo = ({ studentAttempted, attemptedCorrect, duration, avgTimeSpent, topperDuration }) => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", alignItems: "center", justifyContent: "space-around", width: "80%" }}>
        {" "}
        <Card
          sx={{
            width: "14.146em",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5em 0",
            borderRadius: "0.9em",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 0, alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/click 1.svg" className="img-fluid" width={27.48} />
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "23.52px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>{ studentAttempted }%</Typography>
              <Typography sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}>Student Attempted</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", cursor: "pointer" }}>
              <img src="/info1.svg" className="img-fluid" />
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "14.146em",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5em 0",
            borderRadius: "0.9em",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/checked 1.svg" className="img-fluid" width={27.48}></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "23.52px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>{ attemptedCorrect }%</Typography>
              <Typography sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}>Attempted Correct</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "14.146em",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5em 0",
            borderRadius: "0.9em",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              {" "}
              <img src="/chronometer 1.svg"></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "23.52px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>{ duration }</Typography>
              <Typography sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}>Time spent by you</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "14.146em",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5em 0",
            borderRadius: "0.9em",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              {" "}
              <img src="/chronometer 1.svg"></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "23.52px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>{ avgTimeSpent }</Typography>
              <Typography sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}>Average Time Spent</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "14.146em",
            boxShadow: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5em 0",
            background: "#3B36DB",
            borderRadius: "0.9em",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              {" "}
              <img src="/chronometer 1.svg" className="img-fluid" width={27.48}></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "23.52px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>{ topperDuration }</Typography>
              <Typography sx={{ fontSize: "10.66px", fontWeight: 600, fontFamily: "Inter" }}>Time Spent by Topper</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
};
export default TempCompo;
