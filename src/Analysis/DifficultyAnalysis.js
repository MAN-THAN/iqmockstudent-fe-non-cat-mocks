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
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    setData(difficulty?.difficultyWiseAnalysis);
    console.log("data", data);
    setShow(difficulty?.difficultyWiseAnalysis?.overall);
    setPieData(difficulty?.difficultyWiseAnalysis?.overallGraph);
  }, []);

  const handleClick = (button) => {
    setActiveButton(button);
    setShow(data?.[button.toLowerCase()]);
    setPieData(data[button.toLowerCase() + "Graph"]);
  };
  console.log(show);
  console.log(pieData);
  console.log(activeButton);

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
            border: "2px solid var( --blue-new)",
            width: "200px",
            color: "var( --blue-new)",
            color: activeButton === "Overall" ? "white" : "var( --blue-new)",
            fontWeight: "bold",
            background: activeButton === "Overall" && "var( --blue-new)",
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
            border: "2px solid var( --blue-new)",
            width: "200px",
            color: "var( --blue-new)",
            color: activeButton === "VARC" ? "white" : "var( --blue-new)",
            fontWeight: "bold",
            background: activeButton === "VARC" && "var( --blue-new)",
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
            border: "2px solid var( --blue-new)",
            width: "200px",
            color: "var( --blue-new)",
            color: activeButton === "LRDI" ? "white" : "var( --blue-new)",
            fontWeight: "bold",
            background: activeButton === "LRDI" && "var( --blue-new)",
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
            border: "2px solid var( --blue-new)",
            width: "200px",
            color: activeButton === "Quant" ? "white" : "var( --blue-new)",
            fontWeight: "bold",
            background: activeButton === "Quant" && "var( --blue-new)",
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
          <PieChart data={pieData} type={activeButton} />
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
                <BarGrapgh
                  Data={item}
                  key={ind}
                  title={item.name}
                  width={"30vw"}
                  legend={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DifficultyAnalysis;
