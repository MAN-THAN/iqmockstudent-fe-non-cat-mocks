import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


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
        <StyledTable sx={{ maxWidth:{xs:"100%",sm:"100%",md:"100%",lg:"70%",xl:"70%"},  mx:"auto"}} aria-label="customized table">
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
