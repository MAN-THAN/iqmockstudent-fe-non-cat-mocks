import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieGraphNew = ({ color, data }) => {
  const COLORS = [...color];
  const newData = [
    { name: data.topic, value: data.correct ,index:0},
    { name: data.topic, value: data.incorrect,index:1 },
    { name: data.topic, value: data.skipped,index:2 },
  ].filter((data)=>data.value > 0);

  // const newData=[data]
  //     //console.log("pie",newData)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={newData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
          cornerRadius={5}
          paddingAngle={1}
          innerRadius={3}
          outerRadius={90}
          filter="url(#shadow)"
          stroke="none"
        >
          {newData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraphNew;
