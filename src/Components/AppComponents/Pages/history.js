import React from "react";

/// Third Party Input /////
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

/// Local Directory imports ///////////
import NavBar from "./navBar";
import Menu from "./menu";

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const clockIns = useSelector((state) => state.attendanceRecord.dailyClockIns);
  console.log(clockIns);

  /* 
  TODOs: 
  1. style the table to make the date and the rest of the UI more refined
  
  */
  return (
    <div className="w-full h-screen bg-user-profile border-t border-blue-400 ">
      <NavBar>Attendance History</NavBar>
      <div className="flex justify-center items-center">
        <table className="table-fixed mt-10 ">
          <thead>
            <tr>
              <th className="w-24">Date</th>
              <th className="w-24">Time</th>
              <th className="w-24">Remark</th>
              <th className="w-24">Grade</th>
            </tr>
          </thead>
          {clockIns?.map((clockInObj) => {
            return (
              <tr className="odd:bg-white even:bg-slate-400 border-b border-border-signup-gray p-2 my-2 ">
                <td className="text-center">{clockInObj.date}</td>
                <td className="text-center">{clockInObj.time}</td>
                <td className="text-center">
                  {clockInObj.isOnTime === true ? "Early" : "Late"}
                </td>
                <td className="text-center">2/2</td>
              </tr>
            );
          })}
          <tbody></tbody>
        </table>
      </div>
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default History;
