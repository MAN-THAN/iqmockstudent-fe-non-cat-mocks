import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import { ModifyButton } from "../styleSheets/Style";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { NavLink } from "react-router-dom";
import "../styleSheets/AnalysisMain.css";
function DifficultyAnalysis() {
  const { difficulty } = useAuth();
  const [data, setData] = useState({});
  const [activeButton, setActiveButton] = useState("varc");
  const [show, setShow] = useState([]);
  useEffect(() => {
    setData(difficulty?.difficultyWiseAnalysis);
    console.log("data", data);
    setShow(difficulty?.difficultyWiseAnalysis.varc);
  }, []);

  console.log(activeButton);

  const handleClick = (button) => {
    setActiveButton(button);
    setShow(data[button]);
  };

  console.log(show);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
          onClick={() => handleClick("varc")}
          className={`${activeButton === "varc" ? "active" : ""}`}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "varc" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "varc" && "#0057CB",
          }}
          autoFocus={true}
        >
          VARC
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          className="nav-button"
          onClick={() => handleClick("lrdi")}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "lrdi" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "lrdi" && "#0057CB",
          }}
        >
          LRDI
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          onClick={() => handleClick("quants")}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: activeButton === "quants" ? "white" : "#0057CB",
            fontWeight: "bold",
            background: activeButton === "quants" && "#0057CB",
          }}
        >
          QUANT
        </ModifyButton>
      </div>
      <div className="shadow pt-3 " style={{ width: "100%", height: "60vh", marginTop: "3em"  ,borderRadius:"15px"}}>
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart
            width={500}
            height={300}
            data={show}
           
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="url(#total)" radius={[10, 10, 0, 0]}/>
            <Bar dataKey="incorrect" fill="url(#incorrect)"  radius={[10, 10, 0, 0]} />
            <Bar dataKey="correct" fill="url(#correct)"   radius={[10, 10, 0, 0]}/>
            <Bar dataKey="skipped" fill="url(#skipped)"   radius={[10, 10, 0, 0]}/>
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B30FF" />
                <stop offset="100%" stopColor="#B072FF" />
              </linearGradient>
              <linearGradient id="correct" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#685BFB" />
                <stop offset="100%" stopColor="#8C82FF" />
              </linearGradient>
              <linearGradient id="incorrect" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C2FF" />
                <stop offset="100%" stopColor="#BAE6FF" />
              </linearGradient>
              <linearGradient id="skipped" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF519A" />
                <stop offset="100%" stopColor="#FFAED0" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DifficultyAnalysis;
