import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { useNavigate } from "react-router";
import {
  setTime,
  setOnTime,
  updateWeeklyAttendance,
  showClockInDetails,
  setCurrHour,
} from "../../Redux Slices/attendanceSlice";
import { updateDoc } from "firebase/firestore";
import { updateAttendanceRecord } from "../Handlers/mark.attendance";
import { firestoreRefCreator } from "../../General app handlers/general.handlers";
import { db } from "../../Firebase/firebase";

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
  const userId = useSelector((state) => state.login.userId);

  // Local states ////
  const [time, setCurrTime] = useState(currTime);
  const [currDate, setCurrDate] = useState(date);

  /// Mark attendance ///
  const markAttendance = async () => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-US");
    const currHour = date.getUTCHours();

    setTime(time);
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
    dispatch(showClockInDetails());
    dispatch(setCurrHour(currHour));

    await updateAttendanceRecord(
      updateDoc,
      userId,
      firestoreRefCreator,
      data,
      db
    );

    navigate("/attendanceSuccessful");
  };

  return (
    <div className="w-full p-2 shadow-md h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      <figure className="w-24 h-24 border rounded-full border-bg-lp-secondary">
        <img src={userImage} alt="user" />
      </figure>

      <ButtonFull handleClick={markAttendance}>Mark attendance</ButtonFull>
    </div>
  );
}

export default MarkUser;
