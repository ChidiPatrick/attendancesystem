import React from "react";

// Third-party imports
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
import { useSelector } from "react-redux";

function StudentAttendanceGraph() {
  const studentAttendanceGraphArray = useSelector(
    (state) => state.attendanceReportSlice.currStudentAttendanceGraphArray
  );

  console.log(studentAttendanceGraphArray);
  const data = studentAttendanceGraphArray;

  return (
    <div className="w-[400px] h-[400px] bg-slate-300">
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "No. Students",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#23A697" />
          {/* <Bar dataKey="late" fill="#F9AC58" />
          <Bar dataKey="absent" fill="#D85745" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StudentAttendanceGraph;
