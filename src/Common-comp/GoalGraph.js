import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 0,
    pv: 0,
    // amt: 2400,
  },
  {
    name: "Page B",
    uv: 20,
    pv: 1398,
    amt: 210,
  },
  {
    name: "Page C",
    uv: 400,
    pv: 900,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 600,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 700,
    pv: 4800,
    amt: 2181,
  },

  {
    name: "Page G",
    uv: 1000,
    pv: 4300,
    amt: 2100,
  },
];

function CustomDot(props) {
  const { cx, cy, stroke, strokeWidth, value } = props;

  return (
    <g>
      <circle cx={cx} cy={cy} r={18} fill={stroke} stroke={stroke} strokeWidth={strokeWidth} />
      <text x={cx} y={cy} dy={5} dx={1} textAnchor="middle" fill="#fff">
        {value}
      </text>
    </g>
  );
}

function GoalGraph({ result }) {
  const tempArr = [
  {name : "fewf", yourGoal : 0},
    {name : "fewf", yourGoal : 100},
    { name: "overall", percentile: 30 },
    { name: "varc", percentile: 46 },
    { name: "quants", percentile: 32 },
    { name: "lrdi", percentile: 50 },
    
  ];
  return (
    <ResponsiveContainer width="90%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={tempArr}
        margin={{
          top: 30,
          right: 100,
          left: 25,
          bottom: 25,
        }}
      >
        {/* <Line
          dataKey="percentile"
          stroke="url(#gradient1)"
          strokeWidth={8}
        /> */}
        <Tooltip />
        <Line strokeWidth={8} dataKey="yourGoal" stroke="url(#gradient1)" dot={<CustomDot />} />
        <Line strokeWidth={8} dataKey="percentile" stroke="url(#gradient2)" dot={<CustomDot />} />

        <svg>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="10%" stopColor="#C6E6F8" />
              <stop offset="100%" stopColor="#0FA5F9" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="10%" stopColor="#4C08D0" />
              <stop offset="100%" stopColor="#A443EE" />
            </linearGradient>
          </defs>
        </svg>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GoalGraph;
