import React from "react";
import { useSelector } from "react-redux";

// Third-pary imports
import {
  AreaChart,
  ResponsiveContainer,
  linearGradient,
  defs,
  stop,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

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

function AreaCharts() {
  const attendanceGraphArray = useSelector(
    (state) => state.attendanceReportSlice.attendanceGraphArray
  );

  console.log(attendanceGraphArray);

  const data = attendanceGraphArray;

  console.log(data);

  return (
    // <div className="w-[100%] h-[350px]">

    <ResponsiveContainer>
      {data === null ? (
        <div className="w-[100%] flex flex-col items-center justify-center font-bold bg-lp-primary text-white h-[100%] flex justify-center items-center">
          <img src="/images/Fisherman.svg" className="w-[100px] h-[100px]" />
          <div className="">No record for the week</div>
        </div>
      ) : (
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
          onClick={() => console.log("Clicked!!!!")}
        >
          <defs>
            {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient> */}
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3051ADCC" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3051ADCC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "No. Students",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="students"
            stroke="#3051ADCC"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
    // </div>
  );
}

export default AreaCharts;
