import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {StyledTableCell,StyledTable,StyledTableRow} from "../styleSheets/Style"


function myTable(props) {
  const { display, data,headings } = props;


    return (
  
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          p:3,
       pt:0,
          flexWrap:{sm:"wrap",md:"wrap",lg:"nowrap",xl:"nowrap"}
          
        }}
      >
        <StyledTable sx={{ maxWidth:"auto"}} aria-label="customized table">
          <TableHead >
            <TableRow sx={{ background: "white" ,width:"10%" }}>
            {headings.map((heading,ind)=>{
            return (
              <StyledTableCell align="left" key={ind} className="fw-bold py-4">
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
                    <StyledTableCell align="left">{item.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.question}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.attempted}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.correct}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.incorrect}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.score}
                    </StyledTableCell>
                    <StyledTableCell align="left"  sx={{color:"#0C58B6"}} >
                      {item.accuracy}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {Math.round(item.perScore)}
                    </StyledTableCell>
                      <StyledTableCell align="left" sx={{color:"#0C58B6"}} >
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
          <TableHead >
            <TableRow sx={{ background: "white", borderBottom: "none" ,}}>
              <StyledTableCell className="fw-bold py-4" align="left ">Correct</StyledTableCell>
              <StyledTableCell className="fw-bold py-4" align="left">Incorrect</StyledTableCell>
              <StyledTableCell className="fw-bold py-4" align="left">Skipped</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length >0 && data.slice(1).map((item,index)=>{
             return (
              <StyledTableRow
                key={index}
                sx={{
                  background: "white",
                  border: "none",
                }}
              >
                <StyledTableCell align="left">{item.correct}</StyledTableCell>
                <StyledTableCell align="left">{item.incorrect}</StyledTableCell>
                <StyledTableCell align="left">{item.skipped}</StyledTableCell>
              </StyledTableRow>
             )
         
            })}
           
          </TableBody>
        </StyledTable>
      </TableContainer>
   
  );
}

export default myTable;
