import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/// Third party imports ///////////

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Local directory imports /////
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import Menu from "./menu";
import NavBar from "./navBar";
import { setLinkToClockIn } from "../../Redux Slices/attendanceSlice";
import ImagePreview from "./image.preview";

function MarkAttendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states /////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const { firstName, profilePictureURL } = userProfileData;
  // Clock in handler ///
  const navigateToClockIn = async () => {
    navigate("/clockIn");
  };

  // Clock out handler ///
  const navigateToClockOut = () => {
    dispatch(setLinkToClockIn(false));
    navigate("/clockOut");
  };

  // const arr = [];
  // const value = arr.pop();
  // console.log(arr.length);
  /* 
     *1. Create edit profile UI and implement the functionality
      2. Modify the clock in picture taking UI 
*/
  return (
    <div className="w-full   py-6 h-auto  mx-auto">
      <div className="mx-auto max-w-[650px] w-[90%] md:w-full relative">
        <div className=" flex justify-between items-center bg-mywhite sticky  z-[999]">
          <span>
            <NavBar />
          </span>

          <figure className=" w-[40px] h-[40px] md:w-[50px] rounded-full md:h-[50px] overflow-hidden ">
            <img
              src={profilePictureURL}
              alt="pics_profile"
              className=" w-full h-full"
            />
          </figure>
          {displayMenu === true ? <Menu className=" z-[999]" /> : null}
        </div>
        <p className=" font-bold text-xl md:text-2xl py-3">
          Hello {firstName},
        </p>
        <p className=" border-b-[1px] border-black pb-3 text-[15px]">
          Welcome, please clock in and get yourself prepared for today's class
          and extracurricula activities.
        </p>
        <div className=" w-[80%] md:w-[70%] pt-4">
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
            <div className=" font-semibold text-[14px] md:text-base">
              12:01pm
            </div>
          </div>
        </div>

        <div className=" w-[150px] h-[150px] mx-auto pt-8 z-10">
          <CircularProgressbarWithChildren
            value={66}
            strokeWidth={6}
            styles={buildStyles({
              pathColor: "#4CAF50",
              trailColor: "#EDF7EE",
              strokeLinecap: "butt",
            })}
          >
            <p className=" font-bold text-xl">00:10</p>
            <p>mins</p>
          </CircularProgressbarWithChildren>
        </div>
        <div className=" mt-16 flex justify-between md:justify-center items-center gap-3">
          <ButtonFull handleClick={navigateToClockIn}>Clock in</ButtonFull>
          <ButtonLight handleClick={navigateToClockOut}>Clock out</ButtonLight>
        </div>

        <div className=" rounded-tl-md rounded-tr-md shadow-lg h-[100px] md:h-[200px] relative overflow-y-scroll  mt-3">
          <div className="sticky top-0 left-0 right-0 h-6 bg-white"></div>
          <p>name of student</p>
          <p>name of student</p>
          <p>name of student</p>
          <p>name of student</p>
          <p>name of student</p>
        </div>
      </div>
    </div>
    // {PATRICKS VERSION}

    // <div className="bg-user-profile w-full h-screen p-2">
    //   <div className="grid grid-cols-8 ">
    //     <div className="col-start-1 col-end-3 flex justify-between items-center">
    //       <div>
    //         <NavBar />
    //       </div>
    //       <figure>
    //         <img src="images/logo.svg" />
    //       </figure>
    //     </div>
    //     <figure className="col-start-8 col-end-9 w-10 h-10 border border-lp-primary rounded-full bg-gray-400 ">
    //       <img
    //         src={userProfileDocument.profilePictureURL}
    //         alt="profile picture"
    //         className="w-10 h-10  border border-lp-primary rounded-full"
    //       />
    //     </figure>
    //   </div>
    //   <h2 className="font-bold text-xl mb-3">
    //     Hello {userProfileDocument.firstName}
    //   </h2>
    //   <p className="border-b border-signup-gray">
    //     Welcome, please clock in and get yourself prepared for today's class and
    //     extracurricula activities.
    //   </p>
    //   <div className="my-5">
    //     <div className="flex justify-between">
    //       <div className="flex justify-between items-center">
    //         <div className="mr-2 w-4 border rounded h-4 bg-early-color"></div>
    //         <div>Early</div>
    //       </div>
    //       <div>9:00am - 10:00am</div>
    //     </div>
    //     <div className="flex justify-between">
    //       <div className="flex justify-between items-center">
    //         <div className="mr-2 w-4 border rounded h-4 bg-late-color"></div>
    //         <div>late</div>
    //       </div>
    //       <div>10:05am - 10:30am</div>
    //     </div>
    //     <div className="flex justify-between">
    //       <div className="flex justify-between items-center">
    //         <div className="mr-2 w-4 border rounded h-4 bg-absent-color"></div>
    //         <div>Absent</div>
    //       </div>
    //     </div>
    //     <div className="w-full h-48 bg-gray-200 mt-5 flex justify-center items-center">
    //       <figure className="w-24 h-24 bg-gray-200 border rounded-full border-lp-primary"></figure>
    //     </div>
    //   </div>
    //   <div className="w-[80%] my-0 mx-auto flex justify-between items-center">
    //     <ButtonFull handleClick={navigateToClockIn}>Clock in</ButtonFull>
    //     <ButtonLight handleClick={navigateToClockOut}>Clock out</ButtonLight>
    //   </div>
    //   {displayMenu === true ? <Menu /> : null}
    //   {/* <ImagePreview /> */}
    // </div>
  );
}

export default MarkAttendance;
