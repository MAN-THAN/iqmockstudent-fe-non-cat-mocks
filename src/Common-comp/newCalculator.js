import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const CatExamCalculator = ({ Comp }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [memoryValue, setMemoryValue] = useState(null);

  const [calculationValue, setCalculationValue] = useState("");
  const ButtonStyle = {
    minWidth: "40px",
    height: "30px",
    border: "1px solid #AAAAAA",
    background: "white",
    fontFamily: "var(--font-inter)",
    fontSize: "13.75px",
    fontWeight: 700,
    color: "#424242",
    borderRadius: 2,
    boxShadow: 1,
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case "C":
        clearDisplay();
        break;
      case "MC":
        clearMemory();
        break;
      case "MR":
        recallMemory();
        break;
      case "MS":
        storeMemory();
        break;
      case "M+":
        addToMemory();
        break;
      case "M-":
        subtractFromMemory();
        break;
      case "√":
        calculateSquareRoot();
        break;
      case "1/x":
        calculateReciprocal();
        break;
      case "%":
        calculatePercentage();
        break;
      case "+/-":
        negateValue();
        break;
      case "←":
        backspace();
        break;
      case "=":
        evaluateExpression();
        break;
      default:
        appendToDisplay(value);
        break;
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setCalculationValue("");
  };

  const clearMemory = () => {
    setMemoryValue(null);
  };

  const recallMemory = () => {
    if (memoryValue !== null) {
      setDisplayValue(memoryValue.toString());
    }
  };

  const storeMemory = () => {
    setMemoryValue(parseFloat(displayValue));
  };

  const addToMemory = () => {
    if (memoryValue !== null) {
      setMemoryValue(memoryValue + parseFloat(displayValue));
    } else {
      setMemoryValue(parseFloat(displayValue));
    }
  };

  const subtractFromMemory = () => {
    if (memoryValue !== null) {
      setMemoryValue(memoryValue - parseFloat(displayValue));
    } else {
      setMemoryValue(parseFloat(displayValue) * -1);
    }
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(displayValue);
    if (value >= 0) {
      setDisplayValue(Math.sqrt(value).toString());
    } else {
      setDisplayValue("Error");
    }
  };

  const calculateReciprocal = () => {
    const value = parseFloat(displayValue);
    if (value !== 0) {
      setDisplayValue((1 / value).toString());
    } else {
      setDisplayValue("Error");
    }
  };

  const calculatePercentage = () => {
    const value = parseFloat(displayValue);
    setDisplayValue((value / 100).toString());
  };

  const negateValue = () => {
    const value = parseFloat(displayValue);
    setDisplayValue((value * -1).toString());
  };

  const backspace = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  };

  // const evaluateExpression = () => {
  //   try {
  //     const result = eval(displayValue);
  //     setDisplayValue(result.toString());
  //   } catch (error) {
  //     setDisplayValue("Error");
  //   }
  // };

  const evaluateExpression = () => {
    try {
      const result = eval(displayValue);

      setCalculationValue(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue("Error");

      setCalculationValue("");
    }
  };

  const appendToDisplay = (value) => {
    setDisplayValue((prevDisplay) =>
      prevDisplay === "0" ? value : prevDisplay + value
    );
  };

  return (
    <Box
      className="cat-exam-calculator"
      sx={{
        width: 275,
        height: "auto",
        p: 1,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{ background: "#2D70B6", height: 50, color: "white", p: 2 }}
        className="d-flex justify-content-between align-items-center rounded mb-1"
      >
        <h6 className="pt-3 fw-bold">Calculator</h6>
        {Comp}
      </Box>
      <Box sx={{ p: 1, background: "#EDEDED", borderRadius: 3 }}>
        <input
          id="outlined-basic"
          fullWidth
          variant="outlined"
          type="text"
          value={calculationValue}
          readOnly
          style={{
            background: "white",
            marginBottom: "8px",
            width: "100%",
            padding: "5px",
            borderRadius: "5px",
          }}
        />
        <input
          id="outlined-basic"
          fullWidth
          variant="outlined"
          type="text"
          value={displayValue}
          readOnly
          style={{
            background: "white",
            marginBottom: "8px",
            width: "100%",
            padding: "5px",
            borderRadius: "5px",
          }}
        />

        <div className="keypad d-flex justify-content-around flex-wrap mt-1 row-gap-2 gap-1 align-content-start">
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("MC")}>
            MC
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("MR")}>
            MR
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("MS")}>
            MS
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("M+")}>
            M+
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("M-")}>
            M-
          </Button>
          <Button
            sx={{
              ...ButtonStyle,
              background: "red",
              color: "white",
              width: "105px",
              ":hover": { background: "red", color: "white" },
            }}
            onClick={() => handleButtonClick("←")}
          >
            ←
          </Button>
          <Button
            sx={{
              ...ButtonStyle,
              background: "red",
              color: "white",
              ":hover": { background: "red", color: "white" },
            }}
            onClick={() => handleButtonClick("C")}
          >
            C
          </Button>
          <Button
            sx={{
              ...ButtonStyle,
              background: "red",
              color: "white",
              ":hover": { background: "red", color: "white" },
            }}
            onClick={() => handleButtonClick("+/-")}
          >
            +/-
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("√")}>
            √
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("7")}>
            7
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("8")}>
            8
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("9")}>
            9
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("/")}>
            /
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("%")}>
            %
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("4")}>
            4
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("5")}>
            5
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("6")}>
            6
          </Button>
          <Button sx={ButtonStyle} onClick={() => handleButtonClick("*")}>
            *
          </Button>

          <Button sx={ButtonStyle} onClick={() => handleButtonClick("1/x")}>
            1/x
          </Button>

          <div
            className="d-flex row-gap-2 justify-content-around"
            style={{ flexBasis: "80%", flexWrap: "wrap" }}
          >
            <Button sx={ButtonStyle} onClick={() => handleButtonClick("1")}>
              1
            </Button>
            <Button sx={ButtonStyle} onClick={() => handleButtonClick("2")}>
              2
            </Button>
            <Button sx={ButtonStyle} onClick={() => handleButtonClick("3")}>
              3
            </Button>
            <Button sx={ButtonStyle} onClick={() => handleButtonClick("-")}>
              -
            </Button>

            <Button
              sx={{ ...ButtonStyle, width: "105px" }}
              onClick={() => handleButtonClick("0")}
            >
              0
            </Button>
            <Button sx={ButtonStyle} onClick={() => handleButtonClick(".")}>
              .
            </Button>

            <Button sx={ButtonStyle} onClick={() => handleButtonClick("+")}>
              +
            </Button>
          </div>

          <div>
            <Button
              sx={{
                ...ButtonStyle,
                background: "#22AF5C",
                height: "68px",
                color: "white",
                ":hover": { background: "#22AF5C", color: "white" },
              }}
              onClick={() => handleButtonClick("=")}
            >
              =
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CatExamCalculator;
