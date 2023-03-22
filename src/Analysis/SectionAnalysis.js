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
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{item.topic}</StyledTableCell>
                  <StyledTableCell align="left">
                    {item.subtopic}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {item.studentAnswer !== undefined
                      ? item.studentAnswer === item.correctAnswer
                        ? "Yes"
                        : "No"
                      : "Not attempted"}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {item.difficulty}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.score}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                    {item.duration}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default SectionAnalysis;
