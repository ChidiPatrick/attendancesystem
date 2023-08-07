import React from "react";

/// Third party imports ///////////
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Local directory imports /////
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import Menu from "./menu";
import NavBar from "./navBar";
import { navigateToClockIn } from "../Handlers/mark.attendance";

function MarkAttendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states /////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const userData = useSelector((state) => state.loginSlice.userProfileDocument);

  return (
    <div className="bg-user-profile w-full h-screen p-2">
      <div className="grid grid-cols-8 ">
        <div className="col-start-1 col-end-3 flex justify-between items-center">
          <div>
            <NavBar />
          </div>
          <figure>
            <img src="images/logo.svg" />
          </figure>
        </div>
        <figure className="col-start-8 col-end-9 w-10 h-10 border border-lp-primary rounded-full bg-gray-400 "></figure>
      </div>
      <h2 className="font-bold text-xl mb-3">Hello {userData.firstName}</h2>
      <p className="border-b border-signup-gray">
        Welcome, please clock in and get yourself prepared for today's class and
        extracurricula activities.
      </p>
      <div className="my-5">
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <div className="mr-2 w-4 border rounded h-4 bg-early-color"></div>
            <div>Early</div>
          </div>
          <div>9:00am - 10:00am</div>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <div className="mr-2 w-4 border rounded h-4 bg-late-color"></div>
            <div>late</div>
          </div>
          <div>10:05am - 10:30am</div>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <div className="mr-2 w-4 border rounded h-4 bg-absent-color"></div>
            <div>Absent</div>
          </div>
        </div>
        <div className="w-full h-48 bg-gray-200 mt-5 flex justify-center items-center">
          <figure className="w-24 h-24 bg-gray-200 border rounded-full border-lp-primary"></figure>
        </div>
      </div>
      <div className="w-[80%] my-0 mx-auto flex justify-between items-center">
        <ButtonFull handleClick={() => navigateToClockIn(navigate, "clockin")}>
          Clock in
        </ButtonFull>
        <ButtonLight>Clock out</ButtonLight>
      </div>
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default MarkAttendance;
