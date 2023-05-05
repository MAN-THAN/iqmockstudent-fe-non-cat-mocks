import React from "react";
import { useParams, useLocation } from "react-router-dom";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Toolbar, Typography } from "@mui/material";

function BarGraph({ Data, title, width, legend }) {
  const location = useLocation();
  const params = useParams();
  console.log(Data, title);
 

  return (
    <div
      className="shadow flex-item"
      style={{
        width: width,
        height: "auto",
        borderRadius: "15px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "var(--inter)",
          fontWeight: 500,
          fontSize: "30px",
          color: "#434141",
          ml: 7,
          py: 3,
        }}
      >
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width="100%"
          height={200}
          data={[Data]}
          margin={{
            top: 5,
            right: 30,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="error" /> */}
          <YAxis />

          {legend && <Legend layout="horizontal" verticalAlign="bottom" align="center" />}
          <Tooltip />
          <Bar dataKey="I did not understand the concept" fill="#48E5DD" radius={[10, 10, 0, 0]} barSize={50} />
          <Bar barSize={50} dataKey="I fell for the trap answer" fill="#FF6238" radius={[10, 10, 0, 0]} />
          <Bar barSize={50} dataKey="I guessed the answer" fill="#1D5C81" radius={[10, 10, 0, 0]} />
          <Bar barSize={50} dataKey="I made a silly mistake" fill="#1D9374" radius={[10, 10, 0, 0]} />
          <Bar barSize={50} dataKey="I misread the question" fill="#FFBC5E" radius={[10, 10, 0, 0]} />
          <Bar barSize={50} dataKey="I ran out of time" fill="#4732CC" radius={[10, 10, 0, 0]} />
          <Bar barSize={50} dataKey="I understood the concept but failed to apply it correctly" fill="#FF6CB6" radius={[10, 10, 0, 0]} />

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
  );
}

export default BarGraph;
