import React from "react";

// Local Directory imports
import { calcAttendanceSummary } from "../admin dashboard handlers/admin.attendance.summary.handlers";

function AttendanceRecordSummary({ attendanceArray, totalOnBoardedStudents }) {
  const attendanceSummaryArray = calcAttendanceSummary(
    attendanceArray,
    totalOnBoardedStudents
  );

  return (
    <div className="bg-white shadow-md w-[20%]  p-[10px] border rounded-xl">
      <h3 className="font-bold text-[20px] ">Attendance Summary</h3>
      <div className="">
        <div className="py-[10px]">{new Date().toDateString()}</div>
        <div className="odd:bg-white  mb-2 even:bg-gray-100 flex justify-between p-[10px]">
          <span>Early</span>
          <span>{attendanceSummaryArray[0]}%</span>
        </div>
        <div className="odd:bg-white  mb-2 even:bg-gray-100 flex justify-between p-[10px]">
          <span>Late</span>
          <span>{attendanceSummaryArray[1]}%</span>
        </div>
        <div className="odd:bg-white  mb-2 even:bg-gray-100 flex justify-between p-[10px]">
          <span>Present</span>
          <span>{attendanceSummaryArray[2]}%</span>
        </div>
        <div className="odd:bg-white mb-2 even:bg-gray-100 flex justify-between p-[10px] text-lp-primary font-bold">
          <span>Total students present:</span>
          <span>{attendanceSummaryArray[3]}</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceRecordSummary;
