import React, { useEffect, useState, progress } from "react";
import "react-circular-progressbar/dist/styles.css";

/// Third party imports ///////////

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsFillPersonFill } from "react-icons/bs";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

// Local directory imports /////
import NavBar from "./navBar";
import {
  setLinkToClockIn,
  setOnTime,
} from "../../Redux Slices/attendanceSlice";
import { getStudentsLogins } from "../Admin Dashboard/admin dashboard handlers/admin.handlers";
import { getStudentBioObject } from "../Handlers/profile.picture.upload.handler";

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

  const userId = useSelector((state) => state.loginSlice.userId);

  const studentBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const { firstName, profilePictureURL, lastName, currMonthRecord } =
    userProfileData;
  console.log(studentBioArray);

  const studentsClockInList = getStudentsLogins();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  // Clock in page navigator handler ///
  const navigateToClockIn = async () => {
    navigate("/clockIn");
  };

  // Clock out page navigator handler //
  const navigateToClockOut = () => {
    dispatch(setLinkToClockIn(false));
    navigate("/clockOut");
  };

  const studentBioObject = getStudentBioObject(studentBioArray, userId);

  return (
    <div className="w-[100%] min-h-screen relative  sm:flex sm:flex-col sm:justify-center sm:items-center">
      <div className="min-w-[400px] max-w-[640px] h-[100%] mx-auto px-[10px] sm:w-[70%] bg-user-profile border  relative">
        <div className=" flex justify-between items-center bg-mywhite sticky  z-[999]">
          <div className="w-[90%]">
            <NavBar>Home</NavBar>
          </div>

          <figure className=" w-[40px] h-[40px] md:w-[50px] rounded-full md:h-[50px] overflow-hidden ">
            {profilePictureURL === "" || !navigator.onLine ? (
              <BsFillPersonFill size={"100%"} />
            ) : (
              <img
                src={studentBioObject.profilePictureURL}
                alt="pics_profile"
                className=" w-[100%] h-[100%]"
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
        <div className="mt-[40px] mb-[50px] w-[80%] flex justify-center items-center mx-auto  ">
          <button
            className="p-[10px] bg-lp-secondary mr-[40px] border rounded-lg w-[150px] text-white font-bold text-[20px]"
            onClick={navigateToClockIn}
          >
            Clock in
          </button>
          <button
            className="p-[10px] bg-white border rounded-lg w-[150px] text-lp-secondary border-lp-secondary font-bold text-[20px]"
            onClick={navigateToClockOut}
          >
            Clock out
          </button>
        </div>

        {studentsClockInList === undefined ? null : (
          <div className="rounded-tl-md rounded-tr-md shadow-lg px-[10px] h-[100px] md:h-[200px] relative overflow-y-scroll  mt-[20px]">
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
