// import React from "react";
// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { Typography } from "@mui/material";
import {
  CorrectDetailing,
  IncorrectDetailing,
  SkippedDetailing,
} from "../services/DataFiles";
import Textfit from "react-textfit";
// function BarGraph({ Data, title, width, legend }) {
//   const AllDetails = [
//     ...CorrectDetailing,
//     ...IncorrectDetailing,
//     ...SkippedDetailing,
//   ];

//   return (
//     <div
//       className="shadow flex-item"
//       style={{
//         width: width,
//         height: "auto",
//         borderRadius: "15px",
//       }}
//     >
//       <Typography
//         sx={{
//           fontFamily: "var(--inter)",
//           fontWeight: 500,
//           fontSize: "30px",
//           color: "#434141",
//           ml: 7,
//           py: 3,
//         }}
//       >
//         {title}
//       </Typography>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           width="100%"
//           height={200}
//           data={[Data]}
//           margin={{
//             top: 5,
//             right: 30,
//             bottom: 15,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           {/* <XAxis dataKey="error" /> */}
//           <YAxis />

//           {legend && (
//             <Legend layout="horizontal" verticalAlign="bottom" align="center" />
//           )}
//           {/* <Tooltip /> */}

//           {Data &&
//             Object.keys(Data).map((e, ind) => {
//               const resObject = AllDetails.find((item) => item.value === e);
//               return (
//                 <Bar
//                   key={ind}
//                   barSize={50}
//                   dataKey={e}
//                   fill={resObject && resObject.color}
//                   radius={[10, 10, 0, 0]}
//                 />
//               );
//             })}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default BarGraph;

import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  const maxNameLength = 15; // Adjust the maximum length of the name as needed

  const wrappedName =
    payload.name.length > maxNameLength
      ? payload.name.substring(0, maxNameLength) + "..."
      : payload.name;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={15}
      >
        <tspan>{wrappedName}</tspan>
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={12}
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


const PieGraph = ({ Data, title, width, legend }) => {
  const AllDetails = [
    ...CorrectDetailing,
    ...IncorrectDetailing,
    ...SkippedDetailing,
  ];

  //console.log("dataGraph", Data);
 

 

  const pieData =
    Data &&
    Object.keys(Data).length > 0 &&
    Object.keys(Data)
      .map((e) => {
        //console.log(Data[e],"hj")
        const resObject = AllDetails.find((item) => item.value === e);
        return {
          name: e,
          value: Data[e],
          fill: resObject && resObject.color,
        };
      })
      .filter((data) => data.value > 0);

   const activeIndices = pieData ? pieData.map((_, index) => index) : [];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={width} height={300}>
        <Pie
          activeIndex={activeIndices}
          activeShape={renderActiveShape}
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
