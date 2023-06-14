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

  console.log("body data from table", body);
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
                      {item.name}
                    </Typography>
                  </StyledTableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((item, index) => {
            console.log("Item:", item);
            console.log("Index:", index);

            const targetPercentileKey = Object.keys(item).find(
              (key) => key.toLowerCase() === "tableprecentile"
            );

            if (targetPercentileKey) {
              const targetPercentileValues = item[targetPercentileKey];

              return targetPercentileValues.map((value, valueIndex) => (
                <StyledTableRow
                  key={`${index}-${valueIndex}`}
                  sx={{
                    background: "white",
                    border: "none",
                    color: "black",
                  }}
                >
                  {Object.keys(value).map((key) => (
                    <StyledTableCell key={key} align="left">
                      {value[key]}
                    </StyledTableCell>
                    
                  ))}
                </StyledTableRow>
              ));
            }

            return null;
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
