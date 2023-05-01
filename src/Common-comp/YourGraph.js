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
    name: "Page A",
    uv: 100,
    pv: 0,
    // amt: 2400,
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

function YourGraph({ goalData }) {
    console.log(goalData)
  return (
      <LineChart
        width={500}
        height={300}
        data={goalData}
        margin={{
          top: 30,
          right: 100,
          left: 25,
          bottom: 25,
        }}
      >
        <Line
          dataKey="percentile"
          stroke="url(#gradient1)"
          strokeWidth={8}
        />
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
  );
}

export default YourGraph;
