import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = ({ graphData, studentGraphData }) => {
  //console.log(graphData, studentGraphData);
  const series = [
    {
      name: "Points",
      type: "scatter",
      data: studentGraphData,
      marker: {
        size: 100, // Increase the marker size to 8
      },
    },
    {
      name: "Line",
      type: "line",
      data: graphData,
      
    },
  ];

  const options = {
    chart: {
      height: "100%",
      width: "100%",
      type: "line",
    },
    fill: {
      type: "solid",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => {
          // Custom formatting for the y-axis value in the tooltip
          return ` ${value}%ile`;
        },
      },
      x: {
        formatter: (value) => {
          // Custom formatting for the x-axis value in the tooltip
          return "Score: " + value;
        },
      },  
    },
    markers: {
      size: 4,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "numeric",
      tickAmount: 12,
      title: {
        text: "Score",
      },
    },
    yaxis: {
      title: {
        text: "Percentile",
      },
    },
    colors: ["#FF7F50", "#000000"],
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ApexLineChart;
