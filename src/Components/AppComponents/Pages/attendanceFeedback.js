import React from "react";
import NavBar from "./navBar";
import { Link, useNavigate } from "react-router-dom";

// Local directory imports ///
import Menu from "./menu";
import { useDispatch, useSelector } from "react-redux";
function AttendanceFeedback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //////// Redux state //////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

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
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default AttendanceFeedback;
