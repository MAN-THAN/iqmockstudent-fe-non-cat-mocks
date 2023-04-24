import { Box } from "@mui/system";
import React from "react";

const Login = () => {
  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ flexBasis: "48%", padding: 6 }}>{/* { Later} */}</Box>
        <Box sx={{ flexBasis: "52%" }}>{/* { Later} */}</Box>
      </Box>
    </React.Fragment>
  );
};

export default Login;
