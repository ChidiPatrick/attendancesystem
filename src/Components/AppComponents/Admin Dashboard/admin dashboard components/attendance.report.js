import React from "react";

//Third-party imports
import { BsCalendar4 } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";

// Local directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import AttendanceRecordSummary from "./attendance.record.summary";

function AttendanceReport({ marginTop }) {
  return (
    <div className="p-[10px] bg-[#F7F7F7] h-screen">
      <DashboardNavigationComponent title="Attendance Report" />
      <div className="w-[50%]">
        <h3 className="font-bold py-[10px]">Report generator</h3>
        <p>
          Get the attendance for a specific period by entering the dates and
          clicking the generate button
        </p>

        <div className="flex justify-between items-center mt-[10px]">
          <fieldset className="px-2 w-[200px] mb-4 border-2 border-solid border-signup-gray rounded py-2">
            <legend>From</legend>
            <div className=" flex justify-between items-center">
              <div>{new Date().toDateString()}</div>
              <div>
                <BsCalendar4 />
              </div>
            </div>
          </fieldset>
          <fieldset className="px-2 w-[200px] mb-4 border-2 border-solid border-signup-gray rounded py-2">
            <legend>To</legend>
            <div className=" flex justify-between items-center">
              <div>{new Date().toDateString()}</div>
              <div>
                <BsCalendar4 />
              </div>
            </div>
          </fieldset>
          <button className="hover:bg-[#d1720d] w-[150px] p-[10px] bg-lp-secondary border rounded-md text-white font-bold">
            Generate
          </button>
        </div>
      </div>
      <div className="text-lg font-bold flex justify-between items-center border border-transparent border-t-gray-400 border-b-gray-400 py-[10px]">
        <div>{new Date().toDateString()}</div>
        <button className="hover:bg-[#123684] flex justify-center items-center hover:text-white p-[10px] border border-[2px] border-lp-primary rounded-md w-[200px] font-bold text-white bg-lp-primary">
          <BiDownload className="mr-[10px]" size={20} /> Download
        </button>
      </div>
      <div className="text-gray-500 text-xl ">
        <div className="flex items-center p-[10px]">
          <HiOutlineUser size={20} className="text-gray-500 mr-[10px]" />
          50/140
        </div>
      </div>
      <div className="w-full flex justify-between items-start">
        <table className={`${marginTop} w-[78%] bg-white shadow-md `}>
          <thead>
            <tr className="text-lp-primary">
              <th className="w-[50px]">S/N</th>
              <th className="w-[250px]">Full name</th>
              <th className="w-[100px]">Clock in</th>
              <th className="w-[100px]">Remark</th>
              <th className="w-[100px]">Clock out</th>
              <th className="w-[100px]">Total</th>
            </tr>
          </thead>
          <tr className="odd:bg-white  mb-2 even:bg-gray-100 p-[10px]  border-b border-border-signup-gray my-2 ">
            <td className="text-center p-[10px]">001</td>
            <td className="text-center p-[10px]">Patrick Chidi</td>
            <td className="text-center p-[10px]">9:00am</td>
            <td className="text-center p-[10px] text-green-300">Early</td>
            <td className="text-center p-[10px]">5:00am</td>
            <td className="text-center p-[10px]">20/20</td>
          </tr>
          <tr className="odd:bg-white p-[10px] mb-2 even:bg-gray-100  border-b border-border-signup-gray my-2 ">
            <td className="text-center p-[10px]">002</td>
            <td className="text-center p-[10px]">Emmanuel Capelo</td>
            <td className="text-center p-[10px]">9:00am</td>
            <td className="text-center p-[10px] text-green-300">Early</td>
            <td className="text-center p-[10px]">5:00am</td>
            <td className="text-center p-[10px]">20/20</td>
          </tr>
          <tr className="odd:bg-white p-[10px] mb-2 even:bg-gray-100  border-b border-border-signup-gray my-2 ">
            <td className="text-center p-[10px]">003</td>
            <td className="text-center p-[10px]">Uju Agbo</td>
            <td className="text-center p-[10px]">9:30am</td>
            <td className="text-center p-[10px] text-lp-secondary">Late</td>
            <td className="text-center p-[10px]">5:20am</td>
            <td className="text-center p-[10px]">20/20</td>
          </tr>
        </table>
        <AttendanceRecordSummary />
      </div>
    </div>
  );
}

export default AttendanceReport;
