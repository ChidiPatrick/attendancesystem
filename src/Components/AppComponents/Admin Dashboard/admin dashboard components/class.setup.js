import React from "react";

//Third-party imports
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCalendar4 } from "react-icons/bs";

//Local imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import { Link } from "react-router-dom";
import { ButtonFullLong } from "../../../LandingPageComponents/Buttons/buttons";

function ClassSetup() {
  return (
    <div className="bg-user-profile min-h-screen w-full p-[10px]">
      <DashboardNavigationComponent title="Class Setup" />
      <div className="w-[100%] h-[100%] mt-[20px]">
        <div className="px-[20px]">
          <h2 className="py-[10px] font-bold text-[18px]">Session</h2>
          <div className=" flex justify-between items-center">
            <div className="w-[30%] flex justify-between font-bold text-[20px]">
              <span>Oct 17,2023</span>
              <span>Dash</span>
              <span>April 20,2024</span>
            </div>
            <button className="w-[200px] hover:bg-[#163a87] flex justify-center items-center  p-[10px] bg-lp-primary border rounded-2xl text-white font-bold">
              <AiOutlineUserAdd className="mr-[10px]" size={20} /> New session
            </button>
          </div>
        </div>
        <div className="w-[100%] flex">
          <div className="w-[50%] min-h-screen p-[20px] border mt-[30px] border-transparent border-r-gray-300">
            <div className="px-[20px] border border-transparent border-b-gray-300 pb-[40px]">
              <h4 className="text-[20px] font-bold">
                This session runs through
              </h4>
              <div className="w-[100%] py-[10px] flex justify-between">
                <span className="text-[18px] py-[10px]">Start date:</span>
                <span className="text-[18px] font-bold">Oct 17,2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] py-[10px]">End date:</span>
                <span className="text-[18px] font-bold">April 17,2024</span>
              </div>
            </div>
            <div>
              <div className="px-[20px] py-[10px] border border-transparent border-b-gray-300 pb-[40px]">
                <h4 className="text-[20px] font-bold">Lecture days and time</h4>
                <div className="w-[100%] py-[10px] flex justify-between">
                  <span className="text-[18px] py-[10px]">Class days:</span>
                  <span className="text-[18px] font-bold">
                    Mon, Tue, Wed,Thur,Fri
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">Early:</span>
                  <span className="text-[18px] font-bold">
                    9:00am : 10:00am
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">Late:</span>
                  <span className="text-[18px] font-bold">
                    10:30am : upwards
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="px-[20px] py-[10px]  pb-[40px]">
                <h4 className="text-[20px] font-bold">Session Summary</h4>
                <div className="w-[100%] py-[10px] flex justify-between">
                  <span className="text-[18px] py-[10px]">
                    Session Duration:
                  </span>
                  <span className="text-[18px] font-bold">6Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">Lecture days:</span>
                  <span className="text-[18px] font-bold">120days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">
                    Holidays/Breaks:
                  </span>
                  <span className="text-[18px] font-bold">10days</span>
                </div>
              </div>
            </div>
            <div className="w-[100%] p-[10px] flex justify-end items-center text-lp-primary">
              <Link
                to="#"
                className="p-[5px] font-bold border border-transparent border-b-lp-primary"
              >
                Edit session
              </Link>
            </div>
          </div>
          <div className="w-[50%] h-screen p-[20px] mt-[30px]">
            <div className="border border-transparent border-b-gray-300 pb-[50px]">
              <h4 className="font-bold text-[20px]">Set absence dates</h4>
              <p className="py-[10px]">
                Customize attendance for breaks and holidays
              </p>
              <div className="w-[80%]  flex justify-between items-center">
                <fieldset className="hover:border-black p-[20px] mb-4 w-[200px] border-2 border-solid border-signup-gray rounded py-2">
                  <legend className="text-lp-primary">From</legend>
                  <div className="flex justify-between items-center">
                    <span>{new Date().toDateString()}</span>
                    <BsCalendar4 />
                  </div>
                </fieldset>
                <fieldset className="hover:border-black p-[20px] mb-4 w-[200px] border-2 border-solid border-signup-gray rounded py-2">
                  <legend className="text-lp-primary">To</legend>
                  <div className="flex justify-between items-center">
                    <span>{new Date().toDateString()}</span>
                    <BsCalendar4 />
                  </div>
                </fieldset>
              </div>
              <div className="w-[100%] flex mt-[30px] p-[10px] items-center">
                <ButtonFullLong>Update</ButtonFullLong>
              </div>
            </div>
            <div className="border mt-[30px] border-transparent border-b-gray-300 pb-[50px]">
              <h4 className="font-bold text-[20px]">Update Class time</h4>
              <p className="py-[10px]">
                Set attendance marker schedule for classes
              </p>
              <div className="w-[80%]  flex justify-between items-center">
                <fieldset className="hover:border-black p-[20px] mb-4 w-[200px] border-2 border-solid border-signup-gray rounded py-2">
                  <legend className="text-lp-primary">From</legend>
                  <div className="flex justify-between items-center">
                    <span>{new Date().toDateString()}</span>
                    <BsCalendar4 />
                  </div>
                </fieldset>
                <fieldset className="hover:border-black p-[20px] mb-4 w-[200px] border-2 border-solid border-signup-gray rounded py-2">
                  <legend className="text-lp-primary">To</legend>
                  <div className="flex justify-between items-center">
                    <span>{new Date().toDateString()}</span>
                    <BsCalendar4 />
                  </div>
                </fieldset>
              </div>
              <div className="w-[100%] flex mt-[30px] p-[10px] items-center">
                <ButtonFullLong>Update</ButtonFullLong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassSetup;
