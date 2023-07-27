import React from "react";
import NavBar from "./navBar";
import { Link } from "react-router-dom";

// Local directory imports ///

function AttendanceFeedback() {
  return (
    <div className="p-2 bg-user-profile h-screen w-full">
      <NavBar>Welcome</NavBar>
      <figure className="h-80 w-full bg-signup-gray border rounded-3xl"></figure>
      <div className="mt-5 flex justify-center items-center flex-col">
        <div className="text-lp-primary font-bold text-xl">
          Attendance Recorded
        </div>
        <div className="font-md">You look good today</div>
        <div className="text-xs">Happy learning</div>
      </div>
      <div className="flex flex-col">
        <Link
          className="text-lp-primary border-b border-lp-primary p-1 w-24"
          to={"/home"}
        >
          View profile
        </Link>
        <Link
          className="text-lp-primary border-b border-lp-primary p-1 w-24"
          to={"/history"}
        >
          View history
        </Link>
      </div>
    </div>
  );
}

export default AttendanceFeedback;
