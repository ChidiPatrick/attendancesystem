import React, { useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { useNavigate } from "react-router";
import { setTime } from "../../Redux Slices/attendanceSlice";

function MarkUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux states ///
  const isOnTime = useSelector((state) => state.attendanceRecord.isOnTime);
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const currTime = useSelector((state) => state.attendanceRecord.currTime);

  const { time, setCurrTime } = useState(currTime);

  console.log(currTime);

  /// Mark attendance ///
  const markAttendance = () => {
    const date = new Date();
    console.log(date.toLocaleTimeString("en-US"));
    setTime(date.toLocaleTimeString("en-US"));
    setCurrTime(date.toLocaleTimeString("en-US"));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      <figure className="w-24 h-24 border rounded-full border-bg-lp-secondary">
        <img src={userImage} alt="user" />
      </figure>

      <div className="w-full border border-lp-secondary my-10 flex  justify-between items-center">
        <div
          className={
            isOnTime === true
              ? "w-[100px] h-[50px] bg-green-600"
              : "w-[100px] h-[50px] bg-red-500"
          }
        ></div>
        <div className="w-full bg-blue-400 flex flex-col items-end">
          <div>{currTime}</div>
          <div>Date</div>
        </div>
      </div>

      <ButtonFull handleClick={markAttendance}>Mark attendance</ButtonFull>
    </div>
  );
}

export default MarkUser;
