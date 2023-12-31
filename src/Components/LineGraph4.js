import React, { PureComponent } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default class LineGraph4 extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/laughing-firefly-dfmkho?file=/src/Chart.tsx";

  constructor(props) {
    super(props);
    this.state = {data : this.props.data}
    // //console.log(this.state)
  }
  
  componentDidUpdate(prevProps) {
    //console.log(prevProps)
    if (prevProps.data !== this.props.data) {
      const newData = this.props.data;
      this.setState({data : newData});
    }
  }

  render() {
    //console.log(this.state)
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width="100%"
          height="100%"
          margin={{
            top: 50,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <YAxis
            dataKey="y"
            domain={[0, 100]}
            type="number"
            interval={0}
            label={{
              value: ``,
              style: { textAnchor: "middle" },
              angle: -90,
              position: "left",
              offset: 0,
            }}
            allowDataOverflow={true}
            // strokeWidth={minX < 0 ? 0 : 1}
            display="none"
          />

          <XAxis
            dataKey="x"
            domain={[0, 100]}
            interval={0}
            type="number"
            label={{
              key: "xAxisLabel",
              value: "x",
              position: "bottom",
            }}
            allowDataOverflow={true}
            // strokeWidth={minY < 0 ? 0 : 1}
            display="none"
          />

          {/* {minY < 0 && <ReferenceLine y={0} stroke="gray" strokeWidth={1.5} strokeOpacity={0.65} />}
          {minX < 0 && <ReferenceLine x={0} stroke="gray" strokeWidth={1.5} strokeOpacity={0.65} />} */}
          {/* <Tooltip /> */}

          <Line
            strokeWidth={10}
            data={this.state.data}
            type="fill"
            dataKey="percentile"
            stroke="#9533F7"
            tooltipType=""
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
    );
  }
}
