import React from "react";

function AttendanceRecordSummary() {
  return (
    <div className="bg-white shadow-md w-[20%]  p-[10px] border rounded-xl">
      <h3 className="font-bold text-[20px] ">Attendance Summary</h3>
      <div className="">
        <div className="py-[10px]">{new Date().toDateString()}</div>
        <div className="odd:bg-white  mb-2 even:bg-gray-100 flex justify-between p-[10px]">
          <span>Early</span>
          <span>36%</span>
        </div>
        <div className="odd:bg-white  mb-2 even:bg-gray-100 flex justify-between p-[10px]">
          <span>Late</span>
          <span>10%</span>
        </div>
        <div className="odd:bg-white  mb-2 even:bg-gray-100 flex justify-between p-[10px]">
          <span>Present</span>
          <span>46%</span>
        </div>
        <div className="odd:bg-white mb-2 even:bg-gray-100 flex justify-between p-[10px] text-lp-primary font-bold">
          <span>Total students present:</span>
          <span>35</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceRecordSummary;
