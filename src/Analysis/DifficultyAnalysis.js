import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "../Components/Table";
import { useAuth } from "../services/Context";
import { ModifyButton, SubHeading } from "../styleSheets/Style";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DifficultyAnalysis() {
  const { difficulty } = useAuth();
  const [data, setData] = useState({});
  useEffect(() => {
    setData(difficulty);
    setShow(difficulty.varc)
  }, []);
  console.log(data);
  const [show, setShow] = useState([]);
  const headings = [
    "Name",
    "Section",
    "Topic",
    "Subtopic",
    "Correct or Incorrect",
    "Difficulty",
    "%student got this answer correct",
    "Time spent on this Question",
    "Time spent by mock topper on this Question ",
  ];

  const dummyData = [
    {
      name: "Easy Questions",
      Incorrect: 5,
      Correct: 10,
      Total: 25,
      Skipped: 5,
    },
    {
      name: "Moderate Questions",
      Incorrect: 10,
      Correct: 5,
      Total: 25,
      Skipped: 5,
    },
    {
      name: "Difficult Questions",
      Incorrect: 20,
      Correct: 2,
      Total: 25,
      Skipped: 1,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "1.6em" }}>
      <h1>Analysis Review,</h1>
      <h6 style={{ marginTop: "1em" }}>A Quick Analysis Overview</h6>
      <div style={{ display: "flex", flexDirection: "row", gap: "3em", marginTop: "2em" }}>
        <ModifyButton
          variant="outlined"
          onClick={() => setShow(data.varc)}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #00359A",
            width: "200px",
            color: "#00359A",
            fontWeight: "bold",
          }}
          autoFocus={true}
        >
          VARC
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          onClick={() => setShow(data.lrdi)}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #00359A",
            width: "200px",
            color: "#00359A",
            fontWeight: "bold",
          }}
        >
          LRDI
        </ModifyButton>
        <ModifyButton
          variant="outlined"
          onClick={() => setShow(data.quants)}
          sx={{
            p: 2,
            height: "35px",
            border: "2px solid #00359A",
            width: "200px",
            color: "#00359A",
            fontWeight: "bold",
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
              left: 20,
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
