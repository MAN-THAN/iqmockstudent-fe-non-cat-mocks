import CenterMain from "./CenterMain";
import Header from "./Header";
import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Main() { 

  return (
    <div>     
    <Header />
      <CenterMain  />
      </div>
   
  );
}

export default Main;
