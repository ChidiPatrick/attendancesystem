import React from "react";

/// Third Party Input /////
import { HiMenu } from "react-icons/hi";

function History() {
  return (
    <div className="w-full h-screen bg-user-profile border-t border-blue-400 ">
      <div className="grid grid-cols-8 mt-5">
        <div className="flex justify-center items-centers flex-col">
          <div>
            <HiMenu className="font-bold text-xl" />
          </div>
        </div>
        <h3 className="text-xl col-start-2 col-end-9 font-bold p-2 text-center ">
          Attendance History
        </h3>
      </div>
      <table className="table-fixed mt-10">
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
  );
}

export default History;
