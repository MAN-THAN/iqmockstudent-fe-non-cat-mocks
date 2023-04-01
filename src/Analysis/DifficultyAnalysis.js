import React, { useEffect, useState } from "react";
import { useAuth } from "../services/Context";
import { ModifyButton } from "../styleSheets/Style";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { NavLink } from "react-router-dom";
import "../styleSheets/AnalysisMain.css"
function DifficultyAnalysis() {
  const { difficulty } = useAuth();
  const [data, setData] = useState({});
  const [activeButton, setActiveButton] = useState('varc');
  const [show, setShow] = useState([]);
  useEffect(() => {
    setData(difficulty?.difficultyWiseAnalysis);
    console.log("data", data)
    setShow(difficulty?.difficultyWiseAnalysis.varc);
  }, []);


  console.log(activeButton)

 

  const handleClick = (button) => {
    setActiveButton(button);
    setShow(data[button]);
  };

  console.log(show)

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "3em"}}>
      <h1>Analysis Review,</h1>
      <h6 style={{ marginTop: "0.5em" }}>A Quick Analysis Overview</h6>
      <div style={{ display: "flex", flexDirection: "row", gap: "3em", marginTop: "2em" }}>
        <ModifyButton
          variant="outlined"
          onClick={() => handleClick('varc')}
          className={`${activeButton === 'varc' ? 'active' : ''}`}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "varc"? "white": "#0057CB",
            fontWeight: "bold",
            background:activeButton === "varc" && "#0057CB"
          }}
          autoFocus={true}
        >
          VARC
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          className="nav-button"
          onClick={() => handleClick('lrdi')}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: "#0057CB",
            color: activeButton === "lrdi"? "white": "#0057CB",
            fontWeight: "bold",
            background:activeButton === "lrdi" && "#0057CB"
          }}
        >
          LRDI
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          onClick={() => handleClick('quants')}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #0057CB",
            width: "200px",
            color: activeButton === "quants"? "white": "#0057CB",
            fontWeight: "bold",
            background:activeButton === "quants" && "#0057CB"
          }}
        >
          QUANT
        </ModifyButton>
      </div>
      <div style={{ width: "100%", height: "60vh", marginTop: "4em" }}>
        <ResponsiveContainer width="100%" height="100%">
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
            <Bar dataKey="total" fill="#8B30FF" />
            <Bar dataKey="incorrect" fill="#685BFB" />
            <Bar dataKey="correct" fill="#00C2FF" />
            <Bar dataKey="skipped" fill="#FF519A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DifficultyAnalysis;
