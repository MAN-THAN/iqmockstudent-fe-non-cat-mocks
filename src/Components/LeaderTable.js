import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Skeleton from "@mui/material/Skeleton";
import {
  StyledTableCell,
  StyledTable,
  StyledTableRow,
} from "../styleSheets/Style";
import { Box } from "@mui/material";

const SkeletonRows = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <StyledTableRow key={index} sx={{ background: "white" }}>
          {[...Array(7)].map((_, i) => (
            <StyledTableCell key={i}>
              <Skeleton />
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </>
  );
};

export default function LeaderTable({
  data,
  isLoading,
  studentData,
  studentRank,
}) {
  // // console.log(studentData);
  return (
    <TableContainer component="div">
      <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow
            sx={{
              background: "white",
              "&:hover": { background: "none!important" },
            }}
          >
            <StyledTableCell className="fw-bold" align="left">
              Rank
            </StyledTableCell>
            <StyledTableCell className="fw-bold" align="left">
              Name
            </StyledTableCell>
            <StyledTableCell align="left" className="fw-bold">
              QUANT %ile{" "}
            </StyledTableCell>
            <StyledTableCell align="left" className="fw-bold">
              LRDI %ile
            </StyledTableCell>
            <StyledTableCell align="left" className="fw-bold">
              VARC %ile
            </StyledTableCell>
            <StyledTableCell align="left" className="fw-bold">
              Overall %ile
            </StyledTableCell>
            <StyledTableCell align="left" className="fw-bold">
              Overall Score
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow
            sx={{
              backgroundColor: "#E1E2FE",
              "&:hover": { background: "#E1E2FE!important" },
              boxShadow: 6,
            }}
          >
            {isLoading ? (
              [...Array(7)].map((_, i) => (
                <StyledTableCell key={i}>
                  <Skeleton />
                </StyledTableCell>
              ))
            ) : (
              <>
                <StyledTableCell className="fw-bold" sx={{ fontSize: 16}}>
                  {data[0] && data[0].rank}
                </StyledTableCell>
                <StyledTableCell className="fw-bold" align="left" sx={{ fontSize: 16 }}>
                  {data[0] && data[0].result[0].name}
                </StyledTableCell>
                <StyledTableCell className="fw-bold" align="left" sx={{ fontSize: 16 }}>
                  {data[0] && data[0].result[0].qaPercentile}
                </StyledTableCell>
                <StyledTableCell className="fw-bold" align="left" sx={{ fontSize: 16 }}>
                  {data[0] && data[0].result[0].lrdiPercentile}
                </StyledTableCell>
                <StyledTableCell className="fw-bold" align="left" sx={{ fontSize: 16 }}>
                  {data[0] && data[0].result[0].varcPercentile}
                </StyledTableCell>
                <StyledTableCell className="fw-bold" align="left" sx={{ fontSize: 16 }}>
                  {data[0] && data[0].result[0].overallPercentile}
                </StyledTableCell>
                <StyledTableCell className="fw-bold" align="left" sx={{ fontSize: 16 }}>
                  {data[0] && data[0].result[0].overallScore}
                </StyledTableCell>
              </>
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <Box style={{minHeight : "3px"}}></Box>
          {isLoading ? (
            <SkeletonRows />
          ) : (
              <>
              {data[0] &&
                data[0].leaderList.map((item, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{
                      background: index == 0 ? "#FF7A00" : index == 1 ? "#4B87FC" : index == 2 ? "#B53FFD" : "white",
                      color: "black",
                      display: data[0].rank - 1 === index && "none",
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.name}</StyledTableCell>
                    <StyledTableCell align="left">{item.qaPercentile}</StyledTableCell>
                    <StyledTableCell align="left">{item.lrdiPercentile}</StyledTableCell>
                    <StyledTableCell align="left">{item.varcPercentile}</StyledTableCell>
                    <StyledTableCell align="left">{item.overallPercentile}</StyledTableCell>
                    <StyledTableCell align="left">{item.overallScore}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </>
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
