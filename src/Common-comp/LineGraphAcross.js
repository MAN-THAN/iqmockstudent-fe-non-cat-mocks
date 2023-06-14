import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

function CustomDot(props) {
  const { cx, cy, stroke, strokeWidth } = props;

  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="#E32B45" />
    </g>
  );
}

const LineGraph = ({ Data, xkey, ykey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={600} data={Data}>
        <XAxis dataKey={xkey} padding={{ left: 30, right: 30}} />
        <YAxis padding={{ top: 20 }} />
        <Tooltip />
        <Line
          dataKey={ykey}
          stroke="#2A9D8F"
          activeDot={{ r: 8 }}
          strokeWidth={5}
          dot={<CustomDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
