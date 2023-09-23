import React from "react";

// Third-party imports
import { HiOutlineUser } from "react-icons/hi2";

function AttendanceDisplayUI() {
  return (
    <div className="w-full bg-white border border-tranparent rounded-md p-[20px] h-[380px]">
      <h3 className="font-bold flex justify-between w-[25%] items-center">
        <span>Today's attendance</span>
        <div className="flex justify-between items-center">
          <HiOutlineUser className="mr-[10px] font-bold" />
          <div>50/150</div>
        </div>
      </h3>
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
        <tr className="even:bg-gray-100 odd:bg-white">
          <td className="text-center p-[10px]">001</td>
          <td className="text-center p-[10px]">Patrick Chidiebele</td>
          <td className="text-center p-[10px]">8:30am</td>
          <td className="text-center p-[10px]">Early</td>
          <td className="text-center p-[10px]">5:PM</td>
        </tr>
        <tr className="even:bg-gray-100 odd:bg-white">
          <td className="text-center p-[10px]">001</td>
          <td className="text-center p-[10px]">Patrick Chidiebele</td>
          <td className="text-center p-[10px]">8:30am</td>
          <td className="text-center p-[10px]">Early</td>
          <td className="text-center p-[10px]">5:PM</td>
        </tr>
      </table>
    </div>
  );
}

export default AttendanceDisplayUI;
