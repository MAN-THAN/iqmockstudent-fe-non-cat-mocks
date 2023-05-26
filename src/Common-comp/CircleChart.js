import ReactApexChart from "react-apexcharts";
import React from "react";

export const ApexChart = ({ series, style, title, show }) => {
  const circleGraph = {
    chart: {
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "60%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.14,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, //margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.25,
          },
        },
        dataLabels: {
          show: show.value,
          name: {
            offsetY: -10,
            show: show.name,
            color: "#888",
            fontSize: style.titleSize || "14px",
          },
          value: {
            formatter: function (val) {
              return parseFloat(val);
            },

            color: "#111",
            offsetY: 5,
            align: "center",
            fontSize: style.fontSize || 28,
          },
        },
      },
    },
    fill: {
      colors: [style.color], // Set the color directly from props
    },
    stroke: {
      lineCap: "round",
    },
    labels: [title],
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={circleGraph}
        series={series}
        type="radialBar"
        height={style.height}
        width={style.width || "inherit"}
        color={style.color}
      />
    </div>
  );
};
