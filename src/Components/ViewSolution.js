import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { ModifyButton, SubHeading } from "../styleSheets/Style";
import MiniDrawer from "./solDrawer";

function ViewSolution() {
  return (
    <div>
      {/* Header */}
     
      {/* Header end */}
      <MiniDrawer/>
    </div>
  );
}

export default ViewSolution;
