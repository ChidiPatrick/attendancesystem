import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";

function TimeDistributionGraph() {
  const data = [
    {
      name: "Page A",
      L: 4000,
      E: 2400,
      A: 2355,
    },
    {
      name: "Page B",
      L: 3000,
      E: 1398,
      A: 5664,
    },
    {
      name: "Page C",
      L: 2000,
      E: 9800,
      A: 1232,
    },
    {
      name: "Page D",
      L: 2780,
      E: 3908,
      A: 3233,
    },
    {
      name: "Page E",
      L: 1890,
      E: 4800,
      A: 3131,
    },
    {
      name: "Page F",
      L: 2390,
      E: 3800,
      A: 2232,
    },
    {
      name: "Page G",
      L: 3490,
      E: 4300,
      A: 3432,
    },
  ];

  return (
    <ResponsiveContainer>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="E" fill="#23A697" />
        <Bar dataKey="L" fill="#F9AC58" />
        <Bar dataKey="A" fill="#D85745" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TimeDistributionGraph;
