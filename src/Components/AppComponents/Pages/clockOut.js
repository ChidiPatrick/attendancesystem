import React from "react";

// Third-party imports ///
import { updateDoc, doc } from "firebase/firestore";

/// Local directory imports ///
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateClockOutData } from "../Handlers/mark.attendance";

function ClockOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states ///
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const userId = useSelector((state) => state.loginSlice.userId);
  // const attendanceData = useSelector((state) => state.attendanceRecord.)

  /// Clock out handler ///
  const clockOut = async () => {
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString("en-US");

    const data = {
      id: "Clock out",
      date,
      time,
      userImage,
    };

    await updateClockOutData(data, userId);
  };

  return (
    <div className="w-full p-2 shadow-md h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      <img
        className="w-[100px] mb-[100px] h-[100px]  border rounded-full border-lp-secondary"
        src={userImage}
        alt="user"
      />

      <ButtonFull handleClick={clockOut}>Clock out</ButtonFull>
    </div>
  );
}

export default ClockOut;
