import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  StyledTableCell,
  StyledTable,
  StyledTableRow,
} from "../styleSheets/Style";
import { useAuth } from "../services/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function SubtopicAnalysis() {
  const params = useParams();
  const [data, setData] = useState([]);
  const { subtopicWiseAnalysis } = useAuth();
  const navigate = useNavigate();


  function getStyles(MockId, mockid, theme) {
  return {
    fontWeight: MockId === mockid ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    backgroundColor: MockId === mockid ? theme.palette.primary.main : "inherit",
    color: MockId === mockid ? theme.palette.primary.contrastText : "inherit",

  };
}

  useEffect(() => {
    if (params.subject == "varc") {
      setData(subtopicWiseAnalysis.subtopicWiseAnalysis?.varc);
    } else if (params.subject === "lrdi") {
      setData(subtopicWiseAnalysis.subtopicWiseAnalysis?.lrdi);
    } else if (params.subject === "quants") {
      setData(subtopicWiseAnalysis.subtopicWiseAnalysis?.quants);
    }
  }, [params, subtopicWiseAnalysis]);
  console.log("section", data);

  console.log("manthan tyagi")

   const headings = [
     "Number",
     "Subtopic",
     "Number of Questions",
     "Number of Attempted Questions",
     "Number of Correct Attempts",
     "Number of Incorrect Attempts",
     "Mark obtained by correct questions",
     "Overall score in the Subtopic ",
     "Mark Obtained by Topper in this Subtopic",
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
      <StyledTable sx={{ maxWidth: "auto" }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ background: "white", width: "100%" }}>
            {headings.map((heading, ind) => {
              return (
                <StyledTableCell
                  align="left"
                  key={ind}
                  className="fw-bold "
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
                    cursor: "pointer",
                  }}
                >
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{item.subtopic}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfQuestions}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfAttemptedQuestions}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfCorrectAttempt}</StyledTableCell>
                  <StyledTableCell align="left">{item.numberOfIncorrectAttempt}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {item.markObtainedByCorrectQuestion}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.overallScoreInTheSubtopic}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {item.markObtainedByTopperInThisSubtopic ? item.markObtainedByTopperInThisSubtopic : 0}
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

export default SubtopicAnalysis;
