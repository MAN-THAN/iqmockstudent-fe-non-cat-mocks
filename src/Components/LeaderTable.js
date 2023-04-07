import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import {
  StyledTableCell,
  StyledTable,
  StyledTableRow,
} from "../styleSheets/Style";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function LeaderTable() {
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
          <StyledTableRow sx={{ background: "white" }}>
            <StyledTableCell>Your rank</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Varc mark</StyledTableCell>
            <StyledTableCell align="left">lrdi mark</StyledTableCell>
            <StyledTableCell align="left">quant marks</StyledTableCell>
            <StyledTableCell align="left">overall mark</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{
                background: "white",
                color: "black",
              }}
            >
              <StyledTableCell component="th" scope="row">
                1
              </StyledTableCell>
              <StyledTableCell  align="left" >
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.calories}</StyledTableCell>
              <StyledTableCell align="left">{row.fat}</StyledTableCell>
              <StyledTableCell align="left">{row.carbs}</StyledTableCell>
              <StyledTableCell align="left">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
