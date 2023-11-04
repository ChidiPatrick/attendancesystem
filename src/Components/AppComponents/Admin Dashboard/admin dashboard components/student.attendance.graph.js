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
  // data.forEach((element) => {
  //   const time = element.time.split(":");
  //   const hrMin = parseInt(time[0]) + parseInt(time[1]) / 100;
  //   console.log(hrMin);
  // });
  console.log(data);

  return (
    <div className="w-[100%] h-[400px] ">
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Time (hrs.min)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#F78F1E" />
          {/* <Bar dataKey="late" fill="#F9AC58" />
          <Bar dataKey="absent" fill="#D85745" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StudentAttendanceGraph;
