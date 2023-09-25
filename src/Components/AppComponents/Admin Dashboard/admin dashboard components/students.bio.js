import React from "react";

// Third-party imports
import { HiArrowLongRight } from "react-icons/hi2";
import { BiDownload } from "react-icons/bi";

// Local directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";

function StudentsBio() {
  return (
    <div className="bg-[#F6F9FE] px-[20px]">
      <div className="w-full border border-b-black p">
        <DashboardNavigationComponent title="Students bio" />
      </div>
      <div className="">
        <h3 className="font-bold p-[10px] text-[20px]">Session</h3>
        <div className="flex justify-between p-[10px] items-center w-full  font-bold">
          <div className="flex justify-between p-[10px] items-center w-[400px]">
            <div>May 05,2023</div>
            <HiArrowLongRight size={20} />
            <div>August 05,2023</div>
          </div>
          <button className="hover:bg-lp-secondary flex justify-between items-center hover:text-white p-[10px] border border-[2px] border-lp-secondary rounded-full font-bold text-lp-secondary bg-white">
            <BiDownload className="mr-[10px]" size={20} /> Download students
            list
          </button>
        </div>
      </div>
      <table className=" mt-10 w-full mx-auto ">
        <thead>
          <tr className="text-lp-primary">
            <th className="w-[50px]">s/n</th>
            <th className="w-24">First name</th>
            <th className="w-24">Last name</th>
            <th className="w-24">Middle name</th>
            <th className="w-24">Phone number</th>
            <th className="w-24">Email</th>
          </tr>
        </thead>
        <tr className="odd:bg-white p-[10px] mb-2 even:bg-gray-100  border-b border-border-signup-gray my-2 ">
          <td className="text-center p-[10px]">001</td>
          <td className="text-center p-[10px]">Patrick</td>
          <td className="text-center p-[10px]">Chidi</td>
          <td className="text-center p-[10px]">Patrick</td>
          <td className="text-center p-[10px]">08133953948</td>
          <td className="text-center p-[10px]">chidowest@gmail.com</td>
        </tr>
        <tr className="odd:bg-white p-[10px] mb-2 even:bg-gray-100  border-b border-border-signup-gray my-2 ">
          <td className="text-center p-[10px]">002</td>
          <td className="text-center p-[10px]">Dubem</td>
          <td className="text-center p-[10px]">Emmanuel</td>
          <td className="text-center p-[10px]">Capelo</td>
          <td className="text-center p-[10px]">08133783948</td>
          <td className="text-center p-[10px]">capelo@gmail.com</td>
        </tr>
      </table>
    </div>
  );
}

export default StudentsBio;
