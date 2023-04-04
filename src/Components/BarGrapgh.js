import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  import { Typography } from "@mui/material";

function BarGrapgh({Data,title}) {

   
  return (
    <div
    className="shadow flex-item"
    style={{
      width: "30vw",
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
  
      data={[Data]}
      margin={{
        top: 5,
        right: 30,
        bottom: 15,
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      <Bar
        dataKey="total"
        fill="url(#total)"
        radius={[10, 10, 0, 0]}
        barSize={50}
      />
      <Bar
        barSize={50}
        dataKey="incorrect"
        fill="url(#incorrect)"
        radius={[10, 10, 0, 0]}
      />
      <Bar
        barSize={50}
        dataKey="correct"
        fill="url(#correct)"
        radius={[10, 10, 0, 0]}
      />
      <Bar
        barSize={50}
        dataKey="skipped"
        fill="url(#skipped)"
        radius={[10, 10, 0, 0]}
      />

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
  )
}

export default BarGrapgh