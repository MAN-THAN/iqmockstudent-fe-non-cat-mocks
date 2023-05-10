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

const SkeletonRows = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <StyledTableRow key={index} sx={{ background: "white" }}>
          {[...Array(6)].map((_, i) => (
            <StyledTableCell key={i}>
              <Skeleton />
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </>
  );
};

export default function LeaderTable({ data, isLoading, studentData, studentRank}) {
  console.log(data);
  console.log(studentData)
  return (
    <TableContainer component="div">
      <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow sx={{ background: "white" }}>
            <StyledTableCell>Number</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">VARC</StyledTableCell>
            <StyledTableCell align="left">LRDI</StyledTableCell>
            <StyledTableCell align="left">QUANT</StyledTableCell>
            <StyledTableCell align="left">Overall</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow
            sx={{
              height: "20px",
              backgroundColor: "#E1E2FE",
              "&:hover": { background: "#E1E2FE!important" },
            }}
          >
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <StyledTableCell key={i}>
                  <Skeleton />
                </StyledTableCell>
              ))
            ) : (
              <>
                <StyledTableCell>{studentData && studentRank}</StyledTableCell>
                <StyledTableCell align="left">{studentData && studentData[0]?.name}</StyledTableCell>
                <StyledTableCell align="left">{studentData && studentData[0]?.varcScore}</StyledTableCell>
                <StyledTableCell align="left">{studentData && studentData[0]?.lrdiScore}</StyledTableCell>
                <StyledTableCell align="left">{studentData && studentData[0]?.qaScore}</StyledTableCell>
                <StyledTableCell align="left">{studentData && studentData[0]?.overallScore}</StyledTableCell>
              </>
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <SkeletonRows />
          ) : (
            <>
              {data &&
                data.map((item, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{
                      background: index == 0 ? "#FF7A00" : index == 1 ? "#0057FF" : index == 2 ? "#9E00FF" : "white",
                      color: "black",
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.name}</StyledTableCell>
                    <StyledTableCell align="left">{item.varcScore}</StyledTableCell>
                    <StyledTableCell align="left">{item.lrdiScore}</StyledTableCell>
                    <StyledTableCell align="left">{item.qaScore}</StyledTableCell>
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
