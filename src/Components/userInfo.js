import React, {useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BootstrapButton } from "../styleSheets/Style";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate= useNavigate()



  const initialValues={
  name:"",
  email:"",
  uid:""
}
const [value,setValue]= useState(initialValues)


const handleChange=(e)=>{
 const  values = e.target.value;
 const  name = e.target.name;
  setValue({...value, [name]: values})
}


const handleSubmit=(e)=>{
   e.preventDefault()
   const {name,email,uid}=value
   navigate(`/terms/${name}/${email}/${uid}`)
   console.log(value)
}

  return (
    <div>
      <BootstrapButton
        height="30"
        variant="contained mx-auto"
        sx={{ color: "white", p: 3, my: 2, borderRadius: "30px" }}
        onClick={handleOpen}
      >
       Next
      </BootstrapButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ color: "black",ml:1 }}
            variant="h4"
            component="h4"
          >
            User Info:
          </Typography>
          <Box
            component="form"
         
            sx={{
              "& > :not(style)": { m: 1, width: "fullWidth" },
            
            }}
            noValidate
            autoComplete="off"
          
          >
           
            <TextField
              id="standard-basic"
              label="Name"
              type="name"
              onChange={handleChange}
              variant="standard"
              name="name"
              value={value.name}
               fullWidth
               required
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={value.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              id="standard-basic"
              label="Phone"
              value={value.uid}
              name="uid"
              type="number"
              variant="standard"
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>{" "}
            <BootstrapButton style={{color:"white", float:"right" ,marginTop:"20px"}} onClick={handleSubmit}>Submit</BootstrapButton>
        </Box>
      </Modal>
    </div>
  );
}
