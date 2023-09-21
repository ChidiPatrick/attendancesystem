import React, { useEffect, useState, progress } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/// Third party imports ///////////

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsFillPersonFill } from "react-icons/bs";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

// Local directory imports /////
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import NavBar from "./navBar";
import { setLinkToClockIn } from "../../Redux Slices/attendanceSlice";
import { getStudentsLogins } from "../Admin Dashboard/admin.handlers";

function MarkAttendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local states
  const [value, setValue] = useState(new Date());

  /// Redux states /////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const { firstName, profilePictureURL, lastName, currMonthRecord } =
    userProfileData;
  console.log(currMonthRecord.totalDaysPresent);

  const studentsClockInList = getStudentsLogins();
  console.log(studentsClockInList);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  // Clock in handler ///
  const navigateToClockIn = async () => {
    navigate("/clockIn");
  };

  // Clock out handler ///
  const navigateToClockOut = () => {
    dispatch(setLinkToClockIn(false));
    navigate("/clockOut");
  };

  // console.log(currTime);

  return (
    <div className="w-full">
      <div className="min-w-[400px] mx-auto px-[10px] sm:w-[70%] bg-gray-50 relative">
        <div className=" flex justify-between items-center bg-mywhite sticky  z-[999]">
          <div className="w-[90%]">
            <NavBar>Home</NavBar>
          </div>

          <figure className=" w-[40px] h-[40px] md:w-[50px] rounded-full md:h-[50px] overflow-hidden ">
            {profilePictureURL === "" || !navigator.onLine ? (
              <BsFillPersonFill size={"100%"} />
            ) : (
              <img
                src={profilePictureURL}
                alt="pics_profile"
                className=" w-full h-full"
              />
            )}
          </figure>
        </div>
        <p className=" font-bold text-xl md:text-2xl py-3">
          Hello {firstName},
        </p>
        <p className=" border-b-[1px] border-black pb-3 text-[15px]">
          Welcome, please clock in and get yourself prepared for today's class
          and extracurricula activities.
        </p>
        <div className=" w-[100%] sm:w-[80%] mx-auto pt-4">
          <div className="flex justify-between">
            <div className="flex justify-between items-center">
              <div className=" w-3 md:w-4 mr-2 border rounded h-4 bg-early-color"></div>
              <div className=" font-semibold text-[14px] md:text-base">
                Early
              </div>
            </div>
            <div className=" font-semibold text-[14px] md:text-base">
              9:00am - 10:00am
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-between items-center">
              <div className="w-3 md:w-4 mr-2 border rounded h-4 bg-late-color"></div>
              <div className=" font-semibold text-[14px] md:text-base">
                Late
              </div>
            </div>
            <div className=" font-semibold text-[14px] md:text-base">
              10:01am - 12:00noon
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-between items-center">
              <div className="w-3 md:w-4 mr-2 border rounded h-4 bg-absent-color"></div>
              <div className=" font-semibold  text-[14px] md:text-base">
                Absent
              </div>
            </div>
            <div className=" font-semibold text-[14px] md:text-base"></div>
          </div>
        </div>

        <div className=" w-[150px] h-[150px] flex justify-center items-center mx-auto pt-8 z-10">
          <Clock value={value} />
        </div>
        <div className="my-[30px] flex justify-between md:justify-center items-center gap-3">
          <ButtonFull handleClick={navigateToClockIn}>Clock in</ButtonFull>
          <ButtonLight handleClick={navigateToClockOut}>Clock out</ButtonLight>
        </div>

        {studentsClockInList === undefined ? null : (
          <div className=" rounded-tl-md rounded-tr-md shadow-lg px-[10px] h-[100px] md:h-[200px] relative overflow-y-scroll  mt-3">
            <div className="sticky top-0 left-0 right-0 h-6 bg-white"></div>

            {studentsClockInList?.map((clockinObj) => (
              <div className="odd:bg-white even:bg-gray-100 p-[10px] flex justify-between items-center m-b[30px]">
                <p className="">{clockinObj?.name}</p>
                <div className="text-lp-primary text-[10px] flex justify-end">
                  {clockinObj?.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkAttendance;
