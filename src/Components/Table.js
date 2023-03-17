import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.gray,

    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "17.76px",
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "separate",
  borderSpacing: "0 13px",
  // background:"red",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  py: 5,
  

  "& td": {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  "&:hover": {
    backgroundColor: " #dedede !important",
  },
}));

function createData(
  name,
  Questions,
  FAttempted,
  Correct,
  Incorrect,
  Score,
  P_Accuracy,
  P_Score,
  Percentile
) {
  return {
    name,
    Questions,
    FAttempted,
    Correct,
    Incorrect,
    Score,
    P_Accuracy,
    P_Score,
    Percentile,
  };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function myTable(props) {
  const { display, data,headings } = props;
  console.log("Data", data);

  const tableHeadings = data[0];

  return (
    <div className="container-fluid p-4 pt-0">
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <StyledTable sx={{ maxWidth: "auto" }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "white" }}>
            {headings.map((heading,ind)=>{
            return (
              <StyledTableCell key={ind} className="fw-bold">
                {heading}
              </StyledTableCell>
            )
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
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.question}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.attempted}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.correct}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.incorrect}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.score}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.accuracy}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Math.round(item.perScore)}
                    </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.percentile}

                      </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </StyledTable>

        {/* 2nd table  side table */}

        <StyledTable
          sx={{ maxWidth: "30%", ml: 5, display: display }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ background: "white", borderBottom: "none" }}>
              <StyledTableCell align="center">Correct</StyledTableCell>
              <StyledTableCell align="center">Incorrect</StyledTableCell>
              <StyledTableCell align="center">Skipped</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{
                  background: "white",
                  border: "none",
                }}
              >
                <StyledTableCell align="center">"hjhk"</StyledTableCell>
                <StyledTableCell align="center">"6tyui"</StyledTableCell>
                <StyledTableCell align="center">"6tyui"</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}

export default myTable;
