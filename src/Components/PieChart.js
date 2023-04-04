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
    <div
      className="mx-auto"
      style={{
        width: "35vw",
        height: "auto",
        borderRadius: "15px",
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feOffset result="offOut" in="SourceGraphic" dx="2" dy="9" />
              <feColorMatrix
                result="matrixOut"
                in="offOut"
                type="matrix"
                values="0.8 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0"

              />
              <feGaussianBlur
                result="blurOut"
                in="matrixOut"
                stdDeviation="5"
              />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <text
            x={200}
            y={200}
            color="#484747"
            fontFamily="var(--inter)"
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight={500}
            fontSize={22}
          >
            Overall
          </text>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx={200}
            cornerRadius={8}
            cy={200}
            stroke="none"
            labelLine={false}
            label={renderCustomizedLabel}
            paddingAngle={10}
            innerRadius={80}
            outerRadius={150}
            filter="url(#shadow)"
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
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
