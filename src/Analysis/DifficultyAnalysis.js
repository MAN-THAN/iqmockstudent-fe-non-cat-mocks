import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import { ModifyButton } from "../styleSheets/Style";
import "../styleSheets/AnalysisMain.css";
import BarGrapgh from "../Components/BarGrapgh";
import PieChart from "../Components/PieChart";

function DifficultyAnalysis() {
  const { difficulty } = useAuth();
  const [data, setData] = useState({});
  const [activeButton, setActiveButton] = useState("Overall");
  const [show, setShow] = useState([]);

  useEffect(() => {
    setData(difficulty?.difficultyWiseAnalysis);
    console.log("data", data);
    setShow(difficulty?.difficultyWiseAnalysis?.overall);
  }, []);

  const handleClick = (button) => {
    setActiveButton(button);
    setShow(data[button.toLowerCase()]);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "3em",
      }}
    >
      <h1>Analysis Review,</h1>
      <h6 style={{ marginTop: "0.5em" }}>A Quick Analysis Overview</h6>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "3em",
          marginTop: "2em",
        }}
      >
        <ModifyButton
          variant="outlined"
          onClick={() => handleClick("Overall")}
          className={`${activeButton === "Overall" ? "active" : ""}`}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "Overall" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "Overall" && "#0057CB",
          }}
          autoFocus={true}
        >
          Overall
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          onClick={() => handleClick("VARC")}
          className={`${activeButton === "VARC" ? "active" : ""}`}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "VARC" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "VARC" && "#0057CB",
          }}
        >
          VARC
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          className="nav-button"
          onClick={() => handleClick("LRDI")}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "LRDI" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "LRDI" && "#0057CB",
          }}
        >
          LRDI
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          onClick={() => handleClick("Quants")}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: activeButton === "Quant" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "Quant" && "#0057CB",
          }}
        >
          Quants
        </ModifyButton>
      </div>

      <div className="d-flex flex-column justify-content-center mt-5 py-5">
        <div className="flex-item">
          <h1 className="text-center">Question Distributions</h1>
        </div>
        <hr
          className="mx-auto"
          style={{
            height: "2px",
            width: "50%",
            borderTop: "2px solid black",
            borderColor: "black!important",
          }}
        />
        <div className="flex-item">
          <PieChart Data={show} />
        </div>
      </div>
      <hr
        className="mx-auto"
        style={{
          height: "2px",
          width: "50%",
          borderTop: "2px solid black",
          borderColor: "black!important",
        }}
      />
      <h1 className="text-center pt-4 text-capitalize">{`${activeButton} Analysis`}</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between align-items-center mt-5 gap-3 mx-auto ">
        {/* Bar graphs */}

        {show?.length > 0 &&
          show.map((item, ind) => {
            return (
              <div className="mx-auto">
                <BarGrapgh Data={item} title={item.name} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DifficultyAnalysis;
