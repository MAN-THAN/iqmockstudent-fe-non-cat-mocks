import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

function MyPieChart() {
  const data01 = [
    { name: "Group A", value: 60 },
    { name: "Group B", value: 10 },
    { name: "Group C", value: 30 },
  ];
  const colors = ["#FF4F6E", "#3391FF", "#3AB9EF"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={15}
        fontWeight={600}
        fontFamily="var(--inter)"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (

    <div className="container ">
    <ResponsiveContainer width="37%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data01}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          paddingAngle={5}
          innerRadius={80}
          outerRadius={150}
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}

export default MyPieChart;
