import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TempCompo = () => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", padding: "1em" }}>
        {" "}
        <Card
          sx={{
            width: "17.5em",
            boxShadow: 5,
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
              <img src="/click 1.svg"></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "30px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>69%</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "Inter" }}>Student Attempted</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "17.5em",
            boxShadow: 5,
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
              <img src="/checked 1.svg"></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "30px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>69%</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "Inter" }}>Attempted Correct</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "17.5em",
            boxShadow: 5,
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
              <Typography sx={{ fontSize: "30px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>01:23</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "Inter" }}>Time spent by you</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "17.5em",
            boxShadow: 5,
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
              <Typography sx={{ fontSize: "30px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>01:23</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "Inter" }}>Average Time Spent</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <img src="/info1.svg"></img>
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            width: "17.5em",
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
              <img src="/chronometer 1.svg"></img>
            </Box>{" "}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
              <Typography sx={{ fontSize: "30px", fontWeight: 700, fontFamily: "Inter", lineHeight: "0.9em" }}>01:23</Typography>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: "Inter" }}>Time Spent by Topper</Typography>
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
