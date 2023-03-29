import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  StyledTableCell,
  StyledTable,
  StyledTableRow,
} from "../styleSheets/Style";
import moment from "moment/moment";

function OverallAnalysis() {
  const { overallAnalysis } = useAuth();
  const [data, setData] = useState([]);
  console.log("overall", data);
  useEffect(() => setData(overallAnalysis.overAllAnalysis), []);

  const headings = [
    "Name",
    "Questions",
    "Attempted",
    "Correct",
    "Incorrect",
    "Score",
    "% Accuracy",
    "% Score",
    "Percentile",
  ];
  return (
    <TableContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        p: 3,
        pt: 0,
        flexWrap: { sm: "wrap", md: "wrap", lg: "nowrap", xl: "nowrap" },
      }}
    >
      <StyledTable sx={{ maxWidth: "auto" }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ background: "white", width: "10%" }}>
            {headings.map((heading, ind) => {
              return (
                <StyledTableCell
                  align="center"
                  key={ind}
                  className="fw-bold py-4"
                >
                  {heading}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 &&
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
                  <StyledTableCell align="center" className="fw-bold">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.question}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.attempted}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.correct}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.incorrect}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.score}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: "#0C58B6" }}>
                    {item.accuracy}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {Math.round(item.perScore)}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: "#0C58B6" }}>
                    {item.percentile}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </StyledTable>
      {/* 2nd table  side table */}

      <StyledTable
        sx={{ maxWidth: "30%", ml: 5 }}
        aria-label="customized table"
      >
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
          {data.length > 0 &&
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
                    {moment
                      .duration(item.timeCorrect, "seconds")
                      .asMinutes()
                      .toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment
                      .duration(item.timeInCorrect, "seconds")
                      .asMinutes()
                      .toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment
                      .duration(item.timeSkipped, "seconds")
                      .asMinutes()
                      .toFixed(2)}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default OverallAnalysis;
