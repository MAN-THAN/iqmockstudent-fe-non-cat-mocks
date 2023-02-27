import React, { useState } from "react";
import "../styleSheets/keyboard.css";
import { TextField } from "@mui/material";
import { BootstrapButton } from "../styleSheets/Style";
const Keyboard = (props) => {
  const [input, setInput] = useState("");
  props.onValueChange(input);

  const handleKeyPress = (key) => {
    setInput((prevInput) => prevInput + key);
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };



  return (
    <div className=" text-start" >
   
        <TextField
          id="outlined-basic"
          label="Enter Answer"
          variant="outlined"
          value={input}
          sx={{ my: 3, color: "black" }}
          fullWidth
             
        />
     
      
      <div className="keys  p-3 rounded shadow">
        <div className="d-flex gap-2 fs-5 m-2 ">
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"30px"  }}
            variant="contained"
            onClick={() => handleKeyPress("1")}
          >
            1
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"30px" }}
            variant="contained"
            onClick={() => handleKeyPress("2")}
          >
            2
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("3")}
          >
            3
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("4")}
          >
            4
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("5")}
          >
            5
          </BootstrapButton>
        </div>
        <div className="d-flex gap-2 fs-5 m-2 ">
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("6")}
          >
            6
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("7")}
          >
            7
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("8")}
          >
            8
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("9")}
          >
            9
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("1")}
          >
            0
          </BootstrapButton>
        </div>
        <div className="d-flex gap-2 fs-5 m-2 ">
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("@")}
          >
            @
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("#")}
          >
            #
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("$")}
          >
            $
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("%")}
          >
            %
          </BootstrapButton>
          <BootstrapButton
            sx={{ width: "auto", p: 1,borderRadius:"25px" }}
            variant="contained"
            onClick={() => handleKeyPress("^")}
          >
            ^
          </BootstrapButton>
        </div>
        <div className="m-2">
          <BootstrapButton
            sx={{ width: "151px", p: 1,borderRadius:"25px",mt:1 }}
            variant="contained"
            onClick={() => handleBackspace()}
          >
            Backspace
          </BootstrapButton>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
