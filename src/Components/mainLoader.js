import React from "react";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const MainLoader = () => {
  return (
    <React.Fragment>
      <Box sx={{display : "flex", justifyContent : "center", width : "100vw", alignItems : "center", height : "100vh"}}>
        <Box height='fit-content' w="12em">
          {" "}
          <ChangingProgressProvider values={[0, 100]}>
            {(percentage) => <CircularProgressbar value={percentage} text={`${percentage}%`} />}
          </ChangingProgressProvider>
          <Typography mt={6} textAlign="center" fontSize="18px" fontWeight="600">
            Starting Test
          </Typography>
          <Typography mt={6} textAlign="center" fontSize="14px" fontWeight="600">
            TIP :
            {
              <Typography as="span" color="black">
                {" "}
                Make sure you have a stable internet connection
              </Typography>
            }
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MainLoader;
