import React, { useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { useNavigate } from "react-router";
import {
  setTime,
  setCurrDate,
  setOnTime,
  updateWeeklyAttendance,
} from "../../Redux Slices/attendanceSlice";

function MarkUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states ///
  const isOnTime = useSelector((state) => state.attendanceRecord.isOnTime);
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const currTime = useSelector((state) => state.attendanceRecord.currTime);
  const date = useSelector((state) => state.attendanceRecord.date);
  const latenessHour = useSelector(
    (state) => state.attendanceRecord.latenessHour
  );

  // Local states ////
  const [time, setCurrTime] = useState(currTime);
  const [currDate, setCurrDate] = useState(date);
  const [currHour, setCurrHour] = useState(0);
  const [showClockInDetails, setShowClockInDetails] = useState(false);

  /// Mark attendance ///
  const markAttendance = () => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-US");
    const currHour = date.getUTCHours();

    setTime(time);

    // setCurrTime(time);

    setCurrDate(date.toLocaleDateString());

    if (currHour > latenessHour) {
      dispatch(setOnTime(false));
    } else {
      dispatch(setOnTime(true));
    }

    const data = {
      date,
      time,
      userImage,
      isOnTime,
    };
    console.log(data);
    dispatch(updateWeeklyAttendance(data));
    // setCurrHour(currHour);
    navigate("/attendanceSuccessful");
  };

  //TODO:
  // Create attendance successfull UI
  // Navigate users to to the UI if successful

  return (
    <div className="w-full p-2 shadow-md h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      <figure className="w-24 h-24 border rounded-full border-bg-lp-secondary">
        <img src={userImage} alt="user" />
      </figure>
      {showClockInDetails === true ? (
        <div className="w-full p-2 border  border-gray-300 my-10 flex bg-gray-100  justify-between items-center">
          <div
            className={
              isOnTime === true
                ? "w-[20px] h-[20px] border rounded-full bg-green-600"
                : "w-[20px] h-[20px] border rounded-full bg-red-500"
            }
          ></div>

          <div className=" ml-5 text-lp-secondary font-bold text-l">
            {currHour > 11 ? "Late" : "Early"}
          </div>

          <div className="w-[250px] text-lp-primary font-bold text-l flex flex-col items-end mr-2">
            <div> {time}</div>
            <div> {currDate}</div>
          </div>
        </div>
      ) : null}

      <ButtonFull handleClick={markAttendance}>Mark attendance</ButtonFull>
    </div>
  );
}

export default MarkUser;
