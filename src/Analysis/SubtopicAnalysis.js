import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTable, StyledTableRow } from "../styleSheets/Style";
import { useAuth } from "../services/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function SubtopicAnalysis() {
  const params = useParams();
  const [data, setData] = useState([]);
  const { subtopicWiseAnalysis, topperData } = useAuth();
  const [topper_data, setTopperData] = useState();
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
      setTopperData(topperData?.topperAnalysis[0].data[6].subtopicWiseAnalysis.varc);
    } else if (params.subject === "lrdi") {
      setData(subtopicWiseAnalysis.subtopicWiseAnalysis?.lrdi);
      setTopperData(topperData?.topperAnalysis[0].data[6].subtopicWiseAnalysis.lrdi);
    } else if (params.subject === "quants") {
      setData(subtopicWiseAnalysis.subtopicWiseAnalysis?.quants);
      setTopperData(topperData?.topperAnalysis[0].data[6].subtopicWiseAnalysis.quants);
    }
  }, [params, subtopicWiseAnalysis, topperData]);
  // console.log("section", data);

  // console.log("manthan tyagi")
  console.log(topper_data);

  const headings = [
    "Number",
    "Subtopic",
    "Total Questions",
    "Attempted Questions",
    "Correct Attempts",
    "Incorrect Attempts",
    "Mark obtained by correct questions",
    "Overall score in the Subtopic ",
    "Mark obtained by Topper",
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
                <StyledTableCell align="left" key={ind} className="fw-bold" sx={{ fontSize: "16px" }}>
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
                  <StyledTableCell align="left">{item.markObtainedByCorrectQuestion}</StyledTableCell>
                  <StyledTableCell align="left">{item.overallScoreInTheSubtopic}</StyledTableCell>
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

export default SubtopicAnalysis;
