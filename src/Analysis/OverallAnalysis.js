import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTable, StyledTableRow } from "../styleSheets/Style";
import moment from "moment/moment";
import NavigationGallery from "../Components/NavigationGallery";
import { Typography } from "@mui/material";

function OverallAnalysis() {
  const { overallAnalysis } = useAuth();
  const [data, setData] = useState([]);
  console.log("overall", data);
  useEffect(() => setData(overallAnalysis?.overAllAnalysis), [overallAnalysis]);

  const headings = ["Name", "Questions", "Attempted", "Correct", "Incorrect", "Score", "% Accuracy", "% Score", "Percentile"];
  const convertStoMs = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? +minutes : minutes;
    extraSeconds = extraSeconds < 10 ? +extraSeconds : extraSeconds;
    console.log(minutes, extraSeconds);
    return `${minutes + "min" + " " + extraSeconds + "sec"}`;
  };
  convertStoMs(70);
  console.log(data);
  return (
    <>
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          p: 1,
          flexWrap: { sm: "wrap", md: "wrap", lg: "nowrap", xl: "nowrap" },
        }}
      >
        <StyledTable sx={{ maxWidth: "auto" }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "white", width: "10%" }}>
              {headings.map((heading, ind) => {
                return (
                  <StyledTableCell align="left" key={ind} className="fw-bold py-4">
                    {heading}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.length > 0 &&
              data.slice(1).map((item, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    sx={{
                      background: "white",
                      border: "none",
                      color: "black",
                    }}
                  >
                    <StyledTableCell align="left" className="fw-bold">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.question}</StyledTableCell>
                    <StyledTableCell align="left">{item.attempted}</StyledTableCell>
                    <StyledTableCell align="left">{item.correct}</StyledTableCell>
                    <StyledTableCell align="left">{item.incorrect}</StyledTableCell>
                    <StyledTableCell align="left">{item.score}</StyledTableCell>
                    <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                      {item.accuracy}
                    </StyledTableCell>
                    <StyledTableCell align="left">{+item.perScore < 0 ? 0 : +item.perScore}</StyledTableCell>
                    <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                      {item.percentile}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </StyledTable>
        {/* 2nd table  side table */}

        <StyledTable sx={{ maxWidth: "30%", ml: 5 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "white", borderBottom: "none" }}>
              <StyledTableCell className="fw-bold py-4" align="left ">
                Correct
              </StyledTableCell>
              <StyledTableCell className="fw-bold py-4" align="left">
                Incorrect
              </StyledTableCell>
              <StyledTableCell className="fw-bold py-4" align="left">
                Skipped
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.length > 0 &&
              data.slice(1).map((item, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    sx={{
                      background: "white",
                      border: "none",
                    }}
                  >
                    <StyledTableCell align="left">
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{convertStoMs(item.timeCorrect)}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{convertStoMs(item.timeInCorrect)}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{convertStoMs(item.timeSkipped)}</Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </StyledTable>
      </TableContainer>

      <div className="container-fluid my-4">
        <NavigationGallery />
      </div>
    </>
  );
}

export default OverallAnalysis;
