import React, { useEffect, useState } from "react";

// Third-party imports
import { HiOutlineUser } from "react-icons/hi2";
import { onValue, ref } from "firebase/database";

// Local imports
import { rdb } from "../../../Firebase/firebase";
import {
  getCurrentClockinAttendanceObj,
  getStudentsNumber,
} from "../admin dashboard handlers/admin.handlers";

function AttendanceDisplayUI() {
  //Local states

  const clockInDatabaseRef = ref(rdb, `admindashboard/clockInList`);

  let curAttendance = "";

  onValue(clockInDatabaseRef, (snapshot) => {
    if (snapshot.val() === null || snapshot.val() === undefined) return;

    curAttendance = snapshot.val();
  });

  const attendanceArray = Object.values(curAttendance);

  const currAttendanceArray = attendanceArray.filter(
    (attendance) => attendance.date === new Date().toDateString()
  );

  return (
    <div className="w-full bg-white border border-tranparent rounded-md p-[20px] h-[380px]">
      <h3 className="font-bold flex justify-between w-[30%] items-center">
        <span>Today's attendance</span>
        <div className="flex justify-between items-center">
          <HiOutlineUser className="mr-[10px] font-bold" />
          <div>
            {currAttendanceArray.length} / {getStudentsNumber()}
          </div>
        </div>
      </h3>
      {currAttendanceArray.length === 0 ? (
        <div className="w-[100%] h-[100%] flex items-center font-bold text-lp-primary justify-center ">
          <p>NO CURRENT CLOCKIN DATA FOR TODAY YET</p>
        </div>
      ) : (
        <table className="w-full mt-[20px] p-[10px]">
          <thead className="bg-[#F6F9FE]">
            <tr>
              <th className="w-[40px]">S/N</th>
              <th className="w-[200px]">Full name</th>
              <th className="w-24">Clock in</th>
              <th className="w-24">Remark</th>
              <th className="w-24">Clock out</th>
            </tr>
          </thead>

          {currAttendanceArray?.map((item, index) => {
            return (
              <tr className="even:bg-gray-100 odd:bg-white" key={index}>
                <td className="text-center p-[10px]">
                  {index < 10 ? `00${index + 1}` : index + 1}
                </td>
                <td className="text-center p-[10px]">{item?.name}</td>
                <td className="text-center p-[10px]">{item?.time}</td>
                <td
                  className={
                    item?.isOnTime === true
                      ? `text-center p-[10px] text-green-400`
                      : `text-center p-[10px] text-lp-secondary`
                  }
                >
                  {item.isOnTime === false ? "Late" : "Early"}
                </td>
                <td className="text-center p-[10px]">
                  {item?.clockoutObject?.time}
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}

export default AttendanceDisplayUI;
