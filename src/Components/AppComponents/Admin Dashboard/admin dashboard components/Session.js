import React from "react";

// Third-party imports
import { BsDatabaseAdd } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import { BsCalendar4 } from "react-icons/bs";
import { LiaClockSolid } from "react-icons/lia";

//Local imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import DaySelector from "./day.selector";

function Session() {
  return (
    <div className="w-full bg-user-profile h-screen">
      <div className="border border-transparent border-b-gray-400 ">
        <DashboardNavigationComponent title="Session settings" />
      </div>

      <div className="px-[20px]">
        <h2 className="py-[10px] font-bold text-[18px]">Session</h2>
        <div className=" flex justify-between items-center">
          <div className="w-[15%] flex justify-between items-center font-bold text-[20px]">
            <span>Start</span>
            <HiArrowLongRight />
            <span>End</span>
          </div>
          <button className="w-[200px] hover:bg-[#c77217] flex justify-center items-center  p-[10px] bg-lp-secondary border rounded-2xl text-white font-bold">
            <BsDatabaseAdd size={20} className="mr-[10px]" /> Save
          </button>
        </div>
      </div>
      <div className="w-[70%] mt-[30px] mx-auto  h-[100%] ">
        <h3 className="p-[10px]  text-[18px] my-[10px]">
          The session runs through
        </h3>
        <div className="w-[100%]  mx-auto flex justify-between items-center">
          <fieldset className="hover:border-black p-[20px] mb-4 w-[48%] border-2 border-solid border-signup-gray rounded py-2">
            <legend className="text-lp-primary">From</legend>
            <div className="flex justify-between items-center">
              <span>{new Date().toDateString()}</span>
              <BsCalendar4 />
            </div>
          </fieldset>
          <fieldset className="hover:border-black p-[20px] mb-4 w-[48%] border-2 border-solid border-signup-gray rounded py-2">
            <legend className="text-lp-primary">To</legend>
            <div className="flex justify-between items-center">
              <span>{new Date().toDateString()}</span>
              <BsCalendar4 />
            </div>
          </fieldset>
        </div>
        <div>
          <h2 className="p-[10px] text-[18px]">Select lecture days</h2>
          <div className="w-full flex  items-center">
            <div className="w-[70%] p-[10px] flex justify-between items-center">
              <DaySelector>Sun</DaySelector>
              <DaySelector>Mon</DaySelector>
              <DaySelector>Tue</DaySelector>
              <DaySelector>Wed</DaySelector>
              <DaySelector>Thur</DaySelector>
              <DaySelector>Fri</DaySelector>
              <DaySelector>Sat</DaySelector>
            </div>
          </div>
        </div>
        <div>
          <h3 className="p-[10px]  text-[18px] my-[10px]">
            What time should attendance record student as early
          </h3>
          <div className="w-[100%]  mx-auto flex justify-between items-center">
            <fieldset className="hover:border-black p-[20px] mb-4 w-[48%] border-2 border-solid border-signup-gray rounded py-2">
              <legend className="text-lp-primary">From</legend>
              <div className="flex justify-between items-center">
                <span>{new Date().toDateString()}</span>
                <LiaClockSolid size={25} />
              </div>
            </fieldset>
            <fieldset className="hover:border-black p-[20px] mb-4 w-[48%] border-2 border-solid border-signup-gray rounded py-2">
              <legend className="text-lp-primary">To</legend>
              <div className="flex justify-between items-center">
                <span>{new Date().toDateString()}</span>
                <LiaClockSolid size={25} />
              </div>
            </fieldset>
          </div>
        </div>
        <div>
          <h3 className="p-[10px]  text-[18px] my-[10px]">
            What time should attendance record student as late
          </h3>
          <div className="w-[100%]  mx-auto flex justify-between items-center">
            <fieldset className="hover:border-black p-[20px] mb-4 w-[48%] border-2 border-solid border-signup-gray rounded py-2">
              <legend className="text-lp-primary">From</legend>
              <div className="flex justify-between items-center">
                <span>{new Date().toDateString()}</span>
                <LiaClockSolid size={25} />
              </div>
            </fieldset>
            <fieldset className="hover:border-black p-[20px] mb-4 w-[48%] border-2 border-solid border-signup-gray rounded py-2">
              <legend className="text-lp-primary">To</legend>
              <div className="flex justify-between items-center">
                <span>{new Date().toDateString()}</span>
                <LiaClockSolid size={25} />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session;
