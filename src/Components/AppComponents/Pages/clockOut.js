import React, { useState } from "react";

// Third-party imports ///
import { updateDoc, doc } from "firebase/firestore";
import { FcInspection } from "react-icons/fc";
import { HiChevronLeft } from "react-icons/hi";

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
import {
  getCurrentClockinAttendanceObj,
  updateAddClockinDataToAdminDatabaseWithClockoutObj,
} from "../Admin Dashboard/admin dashboard handlers/admin.handlers";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
  const clockOutUser = async (dailyClockInsArray) => {
    /**
     * TODOs:
     * Check internet connectivity
     * Check if user has already clocked in
     * Check if user has already clocked out
     * Add clockout data to the day's clockin object
     * Block double clockouts
     */

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
    if (
      lastClockin === undefined ||
      lastClockin.date !== new Date().toDateString()
    ) {
      dispatch(hideSpinner());
      toast("You can not clock out without clocking in first", {
        autoClose: 3000,
        type: "warning",
      });
      return;
    }

    if (lastClockin.clockoutObj !== null) {
      dispatch(hideSpinner());
      toast(
        "You have already clocked out for today, you can't clockout twice!",
        {
          autoClose: 3000,
          type: "warning",
        }
      );
      return;
    }

    setClockOutData(data);

    await updateClockOutData(data, userId, dispatch, dailyClockInsArray)
      .then(() => {
        getAttendanceRecords(userId, dispatch);
      })
      .then(() => {
        const attendanceData =
          updateAddClockinDataToAdminDatabaseWithClockoutObj(
            lastClockin,
            data,
            userId,
            getCurrentClockinAttendanceObj
          );
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
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full relative flex justify-between flex-col items-center p-2 shadow-md h-[100%] sm:h-[80%] max-w-[620px] bg-user-profile sm:my-auto border border-bg-lp-secondary ">
        <Link to={-1} className="w-[100%] flex">
          <HiChevronLeft size={30} />
        </Link>
        <div className="w-[100%] flex justify-center items-center">
          <FcInspection size={100} />
        </div>
        <h2 className="my-[10px] text-lg text-center text-lp-primary w-[80%] mx-auto">
          Clock out to mark the end of your hub's activities for today, and also
          signify the time you left the hub
        </h2>
        <ToastContainer style={{ width: "100%", textAlign: "center" }} />
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
          <ButtonFull handleClick={() => clockOutUser(dailyClockInsArray)}>
            Clock out
          </ButtonFull>
        </div>
        {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}

        {displaySpinner === true ? <SpinnerSmall /> : null}
      </div>
    </div>
  );
}

export default ClockOut;
