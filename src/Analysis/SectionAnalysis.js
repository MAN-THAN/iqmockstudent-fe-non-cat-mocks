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
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function SectionAnalysis() {
  const params = useParams();
  const [data, setData] = useState([]);
  const { sectionWiseAnalysis } = useAuth();


  function getStyles(MockId, mockid, theme) {
  return {
    fontWeight: MockId === mockid ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    backgroundColor: MockId === mockid ? theme.palette.primary.main : "inherit",
    color: MockId === mockid ? theme.palette.primary.contrastText : "inherit",

  };
}

  useEffect(() => {
    if (params.subject == "varc") {
      setData(sectionWiseAnalysis.sectionWiseAnalysis.varc);
    } else if (params.subject === "lrdi") {
      setData(sectionWiseAnalysis.sectionWiseAnalysis?.lrdi);
    } else if (params.subject === "quants") {
      setData(sectionWiseAnalysis.sectionWiseAnalysis?.quants);
    }
  }, [params]);
  console.log("section", data);

  const headings = [
    "Serial no.",
    "Topic",
    "Subtopic",
    "Correct or Incorrect",
    "Difficulty",
    "%student got this answer correct",
    "Time spent on this Question",
    "Time spent by mock topper on this Question ",
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
                  align="center"
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
            data.map((item, index) => {
              return (
                <StyledTableRow
                  key={index}
                  sx={{
                    background: "white",
                    border: "none",
                    color: "black",
                  }}
                >
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{item.topic}</StyledTableCell>
                  <StyledTableCell align="center"  style={{fontSize:"15px"}}>
                    {item.subtopic}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.studentAnswer !== undefined
                      ? item.studentAnswer === item.correctAnswer
                        ? "Yes"
                        : "No"
                      : "Not attempted"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.difficulty}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.score}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: "#0C58B6" }}>
                    {item.duration}
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default SectionAnalysis;
