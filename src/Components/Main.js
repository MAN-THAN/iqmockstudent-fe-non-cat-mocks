import CenterMain from "./CenterMain";
import Header from "./Header";
import React from "react";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Main() {
  return (
    <div className="overflow-hidden">
      <Header />
      <CenterMain />
    </div>
  );
}

export default Main;
