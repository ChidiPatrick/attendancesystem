import React, { useState } from "react";
import NavBar from "./navBar";
import { Link, useNavigate } from "react-router-dom";

// Local directory imports ///
import Menu from "./menu";
import { useDispatch, useSelector } from "react-redux";
import { setTime, setCurrDate } from "../../Redux Slices/attendanceSlice";

/// Attendance feedback component ///
function AttendanceFeedback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //////// Redux state //////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const isOnTime = useSelector((state) => state.attendanceRecord.isOnTime);
  const currTime = useSelector((state) => state.attendanceRecord.currTime);
  const date = useSelector((state) => state.attendanceRecord.date);
  const latenessHour = useSelector(
    (state) => state.attendanceRecord.latenessHour
  );
  const attendanceData = useSelector(
    (state) => state.attendanceRecord.weeklyAttendance
  );
  const displayClockInDetails = useSelector(
    (state) => state.attendanceRecord.displayClockInDetails
  );
  const currHour = useSelector((state) => state.attendanceRecord.currHour);

  const currAttendanceData = attendanceData[attendanceData.length - 1];
  console.log(isOnTime);

  //////  Local states  ////
  const [image, setImage] = useState(userImage);
  const [time, setCurrTime] = useState(currTime);
  const [currDate, setCurrDate] = useState(date);
  // const [showClockInDetails, setShowClockInDetails] = useState(false);

  return (
    <div className="p-2 bg-user-profile h-screen w-full">
      <NavBar>Welcome</NavBar>
      <figure className="w-full flex justify-center items-center ">
        <img
          src={image}
          alt="user"
          className="w-[300px] h-[300px] border rounded-3xl"
        />
      </figure>
      <div className="mt-5 flex justify-center items-center flex-col">
        <div className="text-lp-primary font-bold text-xl">
          Attendance Recorded
        </div>
        <div className="font-md">You look good today</div>
        <div className="text-xs">Happy learning</div>
      </div>
      {displayClockInDetails === true ? (
        <div className="w-full p-2 border  border-gray-300 my-10 flex bg-gray-100  justify-between items-center">
          <div
            className={
              isOnTime === true
                ? "w-[20px] h-[20px] border rounded-full bg-green-600"
                : "w-[20px] h-[20px] border rounded-full bg-red-500"
            }
          ></div>

          <div className=" ml-5 text-lp-primary font-bold text-l">
            {currHour > 11 ? "Late" : "Early"}
          </div>

          <div className="w-[250px] text-lp-primary font-bold text-l flex flex-col items-end mr-2">
            <div> {currAttendanceData.time}</div>
            <div> {currAttendanceData.currDate}</div>
          </div>
        </div>
      ) : null}
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
