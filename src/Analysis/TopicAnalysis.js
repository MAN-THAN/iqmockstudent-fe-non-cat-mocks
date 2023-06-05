import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material";
import {
  StyledTableCell,
  StyledTable,
  StyledTableRow,
} from "../styleSheets/Style";
import { Typography } from "@mui/material";


function TopicAnalysis() {
  const [data, setData] = useState([]);
  const { topicWiseAnalysis } = useAuth();
  
  useEffect(() => {
    if (topicWiseAnalysis) {
     setData(topicWiseAnalysis.topicWiseAnalysis); 
    } 
  }, [topicWiseAnalysis]);

  const headings = [
    "Number",
    "Topic",
    "Number of Questions",
    "Number of Attempted Questions",
    "Number of Correct Attempts",
    "Number of Incorrect Attempts",
    "Mark obtained by correct questions",
    "Overall score in the topic ",
    "Mark Obtained by Topper in this topic",
    "Mark lose by Incorrect Attempt",
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
      <StyledTable sx={{ maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }, mx: "auto" }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ background: "white", width: "10%" }}>
            {headings.map((heading, ind) => {
              return (
                <StyledTableCell align="left" key={ind} className="fw-bold">
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
                  <StyledTableCell align="left">{item.number}</StyledTableCell>
                  <StyledTableCell align="left">{item.topic}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfQuestions}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfAttemptedQuestions}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfCorrectAttempt}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfIncorrectAttempt}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {item.markObtainedByCorrectQuestion}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.overallScoreInTheTopic}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {item.markObtainedByTopperInThisTopic ? item.markObtainedByTopperInThisTopic : 0 }
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {item.markLoseByIncorrectAttempt}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default TopicAnalysis;
