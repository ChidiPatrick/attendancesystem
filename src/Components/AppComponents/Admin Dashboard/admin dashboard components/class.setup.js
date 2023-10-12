import React, { useState } from "react";

//Third-party imports
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCalendar4 } from "react-icons/bs";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { onValue, ref } from "firebase/database";
//Local imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import { Link } from "react-router-dom";
import { ButtonFullLong } from "../../../LandingPageComponents/Buttons/buttons";
import {
  updateProgramEndingDate,
  updateProgramStartingDate,
} from "../admin dashboard handlers/admin.class.setup";
import { rdb } from "../../../Firebase/firebase";
import { useDispatch } from "react-redux";

function ClassSetup() {
  const dispatch = useDispatch();

  // Local states
  const [date, setDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());

  const getProgramStartingDate = (newDate) => {
    setDate(new Date(newDate).toDateString());
  };

  const getProgramEndingDate = (newDate) => {
    setEndingDate(new Date(newDate).toDateString());
  };

  // Update program duration in database
  const updateProgramDurationSettings = (startingDate, endingDate) => {
    updateProgramStartingDate(startingDate, dispatch);
    updateProgramEndingDate(endingDate, dispatch);
  };

  /// Listen for change events in program starting date
  // const programStartingRef = ref(
  //   rdb,
  //   "admindashboard/classSetupDatabase/programStartingDate"
  // );

  // onValue(rdb, (snapshot) => {
  //   setDate(snapshot.val());
  // });

  /// Listen for change events in program ending date
  // const programEndingRef = ref(
  //   rdb,
  //   "admindashboard/classSetupDatabase/programEndingDate"
  // );

  // onValue(rdb, (snapshot) => {
  //   setEndingDate(snapshot.val());
  // });

  return (
    <div className="bg-user-profile min-h-screen w-full p-[10px]">
      <DashboardNavigationComponent title="Class Setup" />
      <div className="w-[100%] h-[100%] mt-[20px]">
        <div className="px-[20px]">
          <h2 className="py-[10px] font-bold text-[18px]">Session</h2>
          <div className=" flex justify-between items-center">
            <div className="w-[30%] flex justify-between items-center font-bold text-[18px]">
              <span>{new Date(date).toDateString()}</span>
              <HiArrowNarrowRight />
              <span>{new Date(endingDate).toDateString()}</span>
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
                <span className="text-[18px] py-[10px]"></span>
                <span className="text-[18px] font-bold">
                  {new Date(date).toDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] py-[10px]">End date:</span>
                <span className="text-[18px] font-bold">
                  {new Date(endingDate).toDateString()}
                </span>
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
              <h4 className="font-bold text-[20px]">
                Set Program Session Duration
              </h4>
              <p className="py-[10px]">
                Set out the specified duration for the program, and edit at will
              </p>
              <div className="w-[80%]  flex justify-between items-center hover:text-black">
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary ">From</legend>
                  <div className="flex justify-between items-center">
                    <DatePicker
                      value={date}
                      onChange={getProgramStartingDate}
                      className=""
                    />
                  </div>
                </fieldset>
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary ">To</legend>
                  <div className="flex justify-between items-center">
                    <DatePicker
                      value={date}
                      onChange={getProgramEndingDate}
                      className=""
                    />
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
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary hover:text-black">
                    From
                  </legend>
                  <div className="flex justify-between items-center">
                    {/* <span>{new Date().toDateString()}</span> */}
                    <DatePicker
                      value={date}
                      onChange={getProgramStartingDate}
                      // calendarClassName="border border-red text-green-300"
                      className=""
                    />
                    {/* <BsCalendar4 /> */}
                  </div>
                </fieldset>
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary hover:text-black">
                    To
                  </legend>
                  <div className="flex justify-between items-center">
                    <DatePicker
                      value={date}
                      onChange={getProgramEndingDate}
                      className=""
                    />
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
