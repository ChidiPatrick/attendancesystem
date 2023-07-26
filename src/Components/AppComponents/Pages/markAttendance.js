import React from "react";

/// Third party imports ///////////
import { HiMenu } from "react-icons/hi";

// Local directory imports /////
import { ButtonFullLong } from "../../LandingPageComponents/Buttons/buttons";

function MarkAttendance() {
  return (
    <div className="bg-user-profile w-full h-screen p-2">
      <div className="grid grid-cols-8 ">
        <div className="col-start-1 col-end-3 flex justify-between items-center">
          <div>
            <HiMenu className="text-xl" />
          </div>
          <figure>
            <img src="images/logo.svg" />
          </figure>
        </div>
        <figure className="col-start-8 col-end-9 w-10 h-10 border border-lp-primary rounded-full bg-gray-400 "></figure>
      </div>
      <h2 className="font-bold text-xl mb-3">Hello Victoria</h2>
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
      <div className="w-full flex justify-center items-center">
        <ButtonFullLong>Mark Attendance</ButtonFullLong>
      </div>
    </div>
  );
}

export default MarkAttendance;
