import React from "react";

// Third-party imports
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

// Graph component
function AdminLineChart() {
  const data = [
    {
      name: "Mon",
      students: 20,
    },
    {
      name: "Tue",
      students: 14,
    },
    {
      name: "Wed",
      students: 18,
    },
    {
      name: "Thur",
      students: 8,
    },
    {
      name: "Fri",
      students: 9,
    },
  ];

  return (
    <ResponsiveContainer>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          //   label={{ value: "Week days", position: "bottom" }}
        />
        <YAxis
          label={{ value: "No. Students", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="students" stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        <Label value="Pages of my website" offset={0} position="left" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default AdminLineChart;
