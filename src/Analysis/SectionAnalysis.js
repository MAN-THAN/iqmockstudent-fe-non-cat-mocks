import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTable, StyledTableRow } from "../styleSheets/Style";
import { useAuth } from "../services/Context";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FcCheckmark } from "react-icons/fc";
import { Typography } from "@mui/material";

function SectionAnalysis() {
  const params = useParams();
  const [data, setData] = useState([]);
  const { sectionWiseAnalysis, topperData, sectionName } = useAuth();
  const [topper_Data, setTopper_Data] = useState();

  useEffect(() => {
    if (sectionWiseAnalysis) {
      setData(sectionWiseAnalysis.sectionWiseAnalysis[sectionName]);
    }
  }, [sectionWiseAnalysis, topperData]);
  console.log(data);
  console.log(topper_Data);

  const headings = [
    "Serial no.",
    "Topic",
    "Subtopic",
    "Correct / Incorrect",
    "Difficulty",
    "Your's Time",
    "Answer correct",
    "Topper's Time",
  ];
  const convertStoMs = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? +minutes : minutes;
    extraSeconds = extraSeconds < 10 ? +extraSeconds : extraSeconds;
    //  console.log(minutes, extraSeconds);
    return `${minutes + "." + extraSeconds + " min"}`;
  };

  return (
    <>
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
              data.map((item, ind) => {
                return (
                  <StyledTableRow
                    key={ind}
                    sx={{
                      background: "white",
                      border: "none",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    <StyledTableCell align="left">
                      <Typography fontSize="14px" fontWeight={"bold"}>
                        {ind + 1}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography fontSize="14px">{item.topic}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography fontSize="14px"> {item.subtopic.map((e, i) => { 
                        return ((i === 0 ? "" : " | ") + e)
                      })}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.studentAnswer !== undefined ? (
                        item.studentAnswer === item.correctAnswer ? (
                          <FcCheckmark />
                        ) : (
                          <RxCross2 color="red" />
                        )
                      ) : (
                        <Typography fontSize="14px"> {"N/A"}</Typography>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography fontSize="14px"> {item.difficulty}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography fontSize="14px"> {item.duration ? convertStoMs(Number(item.duration)) : "N/A"}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                      <Typography fontSize="14px"> {topper_Data ? (topper_Data?.[ind]?.attemptedCorrect + " %") : "TBD"}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ color: "#0C58B6" }}>
                      <Typography fontSize="14px"> {topper_Data ? (convertStoMs(Number(topper_Data?.[ind]?.durationByTopper))) : "TBD"}</Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
}

export default SectionAnalysis;
