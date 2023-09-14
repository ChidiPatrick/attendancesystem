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
  showNetworkFeedback,
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
  // const userImage = useSelector((state) => state.attendanceRecord.image);
  const userId = useSelector((state) => state.loginSlice.userId);
  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );
  const dailyClockInsArray = useSelector(
    (state) => state.attendanceRecord.dailyClockIns
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

  console.log(dailyClockInsArray);

  // Local states ///
  const [showFeedback, setShowBack] = useState(false);
  const [clockOutData, setClockOutData] = useState(null);

  /// Clock out handler ///
  const clockOutUser = async (attendanceData, dailyClockInsArray) => {
    dispatch(showSpinner());

    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString("en-US");

    const data = {
      id: "Clock out",
      date,
      time,
    };

    const lastClockin = dailyClockInsArray[dailyClockInsArray.length - 1];

    // Check Newtwork connection
    if (!navigator.onLine) {
      dispatch(hideSpinner());
      dispatch(showNetworkFeedback());
      return;
    }

    // Block user from clocking out without clocking in first
    if (lastClockin.date !== new Date().toDateString()) {
      dispatch(hideSpinner());
      alert("You can not clock out without clocking in first");
      return;
    }

    if (attendanceData.length === 0) {
      //Check array length
      const dailyClockOuts = [...attendanceData];

      setClockOutData(data);

      await updateClockOutData(data, userId, dispatch, attendanceData)
        .then(() => {
          getAttendanceRecords(userId, dispatch);
        })
        .then(() => {
          setShowBack(true);
          dispatch(hideSpinner());
        })
        .catch((err) => {
          console.log(err);
          dispatch(hideSpinner());
        });

      return;
    }

    const dailyClockOuts = [...attendanceData];
    const lastClockOut = dailyClockOuts.pop();

    if (lastClockOut.date === date) {
      dispatch(hideSpinner());
      alert("Already clocked  out for today, you can't clockout twice!");
      return;
    }

    setClockOutData(data);

    await updateClockOutData(data, userId, dispatch, attendanceData)
      .then(() => {
        getAttendanceRecords(userId, dispatch);
      })
      .then(() => {
        setShowBack(true);
        dispatch(hideSpinner());
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideSpinner());
      });
  };

  return (
    <div className="w-full relative p-2 shadow-md h-screen flex flex-col  border border-bg-lp-secondary ">
      <NavBar>Clock out</NavBar>
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
      <div className="w-full flex justify-center">
        <ButtonFull
          handleClick={() => clockOutUser(attendanceData, dailyClockInsArray)}
        >
          Clock out
        </ButtonFull>
      </div>
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}

      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );
}

export default ClockOut;
