import React from "react";

// Third-party imports
import { BsDatabaseAdd } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
//Local imports
import DashboardNavigationComponent from "./dashboard.navcomp";

function Session() {
  return (
    <div className="w-full h-screen">
      <div className="border border-transparent border-b-gray-400 ">
        <DashboardNavigationComponent title="Session settings" />
      </div>

      <div className="px-[20px]">
        <h2 className="py-[10px] font-bold text-[18px]">Session</h2>
        <div className=" flex justify-between items-center">
          <div className="w-[20%] flex justify-between items-center font-bold text-[20px]">
            <span>Start</span>
            <HiArrowLongRight />
            <span>End</span>
          </div>
          <button className="w-[200px] hover:bg-[#c77217] flex justify-center items-center  p-[10px] bg-lp-secondary border rounded-2xl text-white font-bold">
            <BsDatabaseAdd size={20} className="mr-[10px]" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Session;
