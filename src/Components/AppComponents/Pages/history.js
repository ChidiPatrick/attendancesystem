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
          <tbody>
            <tr className="odd:bg-white even:bg-slate-400 border-b border-border-signup-gray p-2 my-2 ">
              <td className="text-center">May 06</td>
              <td className="text-center">09:30am</td>
              <td className="text-center">On time</td>
              <td className="text-center">2/2</td>
            </tr>
            <tr className="odd:bg-white even:bg-slate-200">
              <td className="text-center">May 06</td>
              <td className="text-center">09:30am</td>
              <td className="text-center">On time</td>
              <td className="text-center">2/2</td>
            </tr>
            <tr className="odd:bg-white even:bg-slate-200">
              <td className="text-center">May 06</td>
              <td className="text-center">09:30am</td>
              <td className="text-center">On time</td>
              <td className="text-center">2/2</td>
            </tr>
            <tr className="odd:bg-white even:bg-slate-200">
              <td className="text-center">May 06</td>
              <td className="text-center">09:30am</td>
              <td className="text-center">On time</td>
              <td className="text-center">2/2</td>
            </tr>
          </tbody>
        </table>
      </div>
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default History;
