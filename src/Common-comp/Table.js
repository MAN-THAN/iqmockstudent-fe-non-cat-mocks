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
  const { headings, body } = data;
  return (
    <TableContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        p: 1,
        flexWrap: { sm: "wrap", md: "wrap", lg: "nowrap", xl: "nowrap" },
      }}
    >
      <StyledTable
        sx={{ maxWidth: "100%", ml: 2 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow sx={{ background: "white", borderBottom: "none" }}>
            {headings &&
              headings.map((item, _) => {
                return (
                  <StyledTableCell className="fw-bold py-4" align="left ">
                    <Typography fontWeight={700} fontSize="16px">
                      {item}
                    </Typography>
                  </StyledTableCell>
                );
              })}
          </TableRow>
        </TableHead>

        <TableBody>
          {body && body.map((item, index) => {
            return (
              <StyledTableRow
                key={index}
                sx={{
                  background: "white",
                  border: "none",
                }}
              >
                {headings.map((heading, cellIndex) => (
                  <StyledTableCell align="left" key={cellIndex}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      {2}
                    </Typography>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
