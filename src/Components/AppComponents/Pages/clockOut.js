import React, { useState } from "react";

// Third-party imports ///
import { updateDoc, doc } from "firebase/firestore";

/// Local directory imports ///
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateClockOutData } from "../Handlers/mark.attendance";
import {
  hideFeedback,
  hideSpinner,
  showFeedback,
  showSpinner,
} from "../../Redux Slices/signupSlice";
import NetworkFeedback from "../Modal/networkFeedback";
import FeedbackModal from "../Modal/feedbackModal";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import NavBar from "./navBar";
import { getAttendanceRecords } from "../../Redux Slices/attendanceSlice";

function ClockOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states ///
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const userId = useSelector((state) => state.loginSlice.userId);
  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );
  const attendanceData = useSelector(
    (state) => state.attendanceRecord.dailyClockOuts
  );
  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );
  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );

  // Local states ///
  const [showFeedback, setShowBack] = useState(false);
  const [clockOutData, setClockOutData] = useState(null);

  /// Clock out handler ///
  const clockOut = async () => {
    dispatch(showSpinner());

    const dailyClockOuts = [...attendanceData];
    const lastClockOut = dailyClockOuts.pop();

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString("en-US");

    if (!navigator.onLine) {
      dispatch(hideSpinner());
      return;
    }

    if (lastClockOut.date === date) {
      dispatch(hideSpinner());
      alert("Already clocked  out for today, you can't clockout twice!");
      return;
    }

    const data = {
      id: "Clock out",
      date,
      time,
      userImage,
    };

    setClockOutData(data);

    await updateClockOutData(data, userId, dispatch, attendanceData)
      .then(() => {
        getAttendanceRecords(userId);
      })
      .then(() => {
        setShowBack(true);
      });
  };

  /* TODO:
  1. Add button for navigating backwards here
  2. Add something before the clock out button to make the UI more refined
  */
  return (
    <div className="w-full relative p-2 shadow-md h-screen flex flex-col  border border-bg-lp-secondary items-center">
      <div>Clock Out</div>
      <h2 className="my-[50px] text-lg">
        Clock out to mark the end of your hub's activities for today, and also
        signify the time you left the hub
      </h2>
      {showFeedback === true ? (
        <div className="w-full">
          <h2 className="text-lp-primary text-center font-bold text-xl">
            Clocked out successfully
          </h2>
          <div className="flex text-lg border border-lp-secondary rounded-xl p-2 font-bold justify-between items-center w-[80%] my-[50px] mx-auto p-2">
            <span className="">Clock out time:</span>
            <span className="text-lp-primary">{clockOutData?.time}</span>
          </div>
        </div>
      ) : null}
      <ButtonFull handleClick={clockOut}>Clock out</ButtonFull>
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displayFeedback === true ? (
        <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
          Something went wrong, please log out and log in again
        </FeedbackModal>
      ) : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );
}

export default ClockOut;
