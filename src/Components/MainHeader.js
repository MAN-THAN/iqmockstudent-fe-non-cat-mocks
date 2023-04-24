import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const MainHeader = () => { 
    return (
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <img src='/iQuantaWhite.png' width='180px'  alt="iquanta_logo" className="img-fluid" />
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            {" "}
            <div className="text-end">
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "white"
                }}
              >
                {"Manthan"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "white"
                }}
              >
                User id :{"574932594574334"}
              </Typography>
            </div>
            <div className="d-flex">
              <a href="#" className="d-block link-dark text-decoration-none " aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="50" height="50" className="rounded" />
              </a>
            </div>
          </Box>
        </Box>
      </React.Fragment>
    );
}

export default MainHeader;