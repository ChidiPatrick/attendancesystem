import React from "react";
import { IoMagnet } from "react-icons/io5";

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

// Local directory imports
import {
  getAttendanceTimeDistribution,
  getCurrWeekClockinArray,
} from "../admin dashboard handlers/graph.handlers";
import { useDispatch, useSelector } from "react-redux";

function TimeDistributionGraph() {
  const dispatch = useDispatch();

  // Redux state
  const attendanceArray = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );
  const studentsBioArray = useSelector(
    (state) => state.adminStudentsSlice.studentsBioArray
  );

  const currWeekClockInArray = getCurrWeekClockinArray(attendanceArray);

  const attendanceTimeDistribution = getAttendanceTimeDistribution(
    currWeekClockInArray,
    studentsBioArray.length
  );
  console.log(attendanceTimeDistribution);

  const data = attendanceTimeDistribution;
  return (
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
        <Bar dataKey="early" fill="#23A697" />
        <Bar dataKey="late" fill="#F9AC58" />
        <Bar dataKey="absent" fill="#D85745" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TimeDistributionGraph;
