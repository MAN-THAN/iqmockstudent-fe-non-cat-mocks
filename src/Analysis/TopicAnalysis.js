import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material";
import { StyledTableCell, StyledTable, StyledTableRow } from "../styleSheets/Style";
import { Typography } from "@mui/material";

function TopicAnalysis() {
  const [data, setData] = useState([]);
  const { topicWiseAnalysis, topperData } = useAuth();
  const [topper_data, setTopperData] = useState();

  useEffect(() => {
    if (topicWiseAnalysis) {
      setData(topicWiseAnalysis.topicWiseAnalysis);
      setTopperData(topperData?.topperAnalysis[0].data[3].topicWiseAnalysis);
    }
  }, [topicWiseAnalysis, topperData]);
  // console.log(topperData);
  const headings = [
    "Number",
    "Topic",
    "Total Questions",
    "Attempted Questions",
    "Correct Attempts",
    "Incorrect Attempts",
    "Marks gained",
    "Overall score",
    "Marks obtained by Topper",
    "Marks deducted",
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
                <>
                  <StyledTableCell align="left" key={ind} className="fw-bold" sx={{ fontSize: "16px"}}>
                    {heading}
                  </StyledTableCell>
                </>
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
                  <StyledTableCell align="left">{item.markObtainedByCorrectQuestion}</StyledTableCell>
                  <StyledTableCell align="left">{item.overallScoreInTheTopic}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {topper_data
                      ? topper_data[index + 1].markObtainedByCorrectQuestion == null ||
                        topper_data[index + 1].markObtainedByCorrectQuestion == undefined
                        ? "N/A"
                        : topper_data[index + 1].markObtainedByCorrectQuestion
                      : "TBD"}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.markLoseByIncorrectAttempt}</StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default TopicAnalysis;
