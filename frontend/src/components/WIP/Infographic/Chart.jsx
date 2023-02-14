import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

function Chart(props) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5, color: "blue" }}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar
            label={({ x, y, width, height, value }) => (
              <text
                x={x + width / 2}
                y={y + height / 2}
                dy={-10}
                fill="white"
                textAnchor="middle"
              >
                {value}
              </text>
            )}
            dataKey="value"
            fill="#3f51b5"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
