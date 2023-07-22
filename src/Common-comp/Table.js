import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  StyledTableCell,
  StyledTable,
  StyledTableRow,
} from "../styleSheets/Style";
import { Typography } from "@mui/material";

function Table({ data }) {
  const { headings, body, sectionName } = data;
  //console.log(headings);
  //console.log("body data from table", body);
  return (
    <TableContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: { sm: "wrap", md: "wrap", lg: "nowrap", xl: "nowrap" },
        maxHeight: "100%",
        maxWidth: "100%",
        overflowY: "scroll",
      }}
    >
      <StyledTable sx={{ ml: 2 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ background: "white", position: "sticky", top: 0 }}>
            {headings &&
              headings.map((item, _) => {
                return (
                  <StyledTableCell
                    sx={{ position: "sticky", top: 0, border: "none" }}
                    className="fw-bold"
                    align="center"
                  >
                    <Typography fontWeight={700} fontSize="16px">
                      {item.name}
                    </Typography>
                  </StyledTableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {body?.map((item, index) => {
            //console.log("Item:", item);
            //console.log("Index:", index);

            return (
              <StyledTableRow
                key={index}
                sx={{
                  background: "white",
                  border: "none",
                  color: "black",
                }}
              >
                <StyledTableCell align="center">
                  <Typography fontWeight={700} fontSize={14} paddingBottom={1}>
                    {item.percentile}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <Typography fontSize={14} paddingBottom={1}>
                    {item.score}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
