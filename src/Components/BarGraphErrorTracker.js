import React from "react";

import {
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import {
  CorrectDetailing,
  IncorrectDetailing,
  SkippedDetailing,
} from "../services/DataFiles";

function BarGraph({ Data, title, width, legend }) {
  const AllDetails = [
    ...CorrectDetailing,
    ...IncorrectDetailing,
    ...SkippedDetailing,
  ];

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

          {legend && (
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          )}
          {/* <Tooltip /> */}

          {Data &&
            Object.keys(Data).map((e, ind) => {
              const resObject = AllDetails.find((item) => item.value === e);
              return (
                <Bar
                  key={ind}
                  barSize={50}
                  dataKey={e}
                  fill={resObject && resObject.color}
                  radius={[10, 10, 0, 0]}
                />
              );
            })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
