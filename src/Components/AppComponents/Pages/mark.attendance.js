import React, { useState } from "react";

//// Third-party imports ////
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsFillPersonFill } from "react-icons/bs";

/// Local directory imports ///
import {
  setTime,
  setOnTime,
  updateWeeklyAttendance,
  showClockInDetails,
  setCurrHour,
} from "../../Redux Slices/attendanceSlice";
import { updateAttendanceRecord } from "../Handlers/mark.attendance";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import { hideFeedback } from "../../Redux Slices/signupSlice";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import FeedbackModal from "../Modal/feedbackModal";
import NetworkFeedback from "../Modal/networkFeedback";
import { getWeekNumber } from "../Handlers/get.current.week";

function MarkUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states ///
  const isOnTime = useSelector((state) => state.attendanceRecord.isOnTime);
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const currTime = useSelector((state) => state.attendanceRecord.currTime);
  const date = useSelector((state) => state.attendanceRecord.date);
  const userId = useSelector((state) => state.loginSlice.userId);
  const dailyClockInsArray = useSelector(
    (state) => state.attendanceRecord.dailyClockIns
  );
  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );
  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );
  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );
  const latenessHour = useSelector(
    (state) => state.attendanceRecord.latenessHour
  );

  const userProfile = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const { profilePictureURL } = userProfile;

  // Local states ////
  const [time, setCurrTime] = useState(currTime);
  const [currDate, setCurrDate] = useState(date);
  const [userIsOnTime, setUserIsOnTime] = useState(isOnTime);

  /// Mark attendance ///
  const markAttendance = async (userId) => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-US");
    const currHour = date.getHours();
    console.log(`current hour: ${currHour}`);
    console.log(`lateness hour: ${latenessHour}`);

    setTime(time);
    setCurrDate(date.toLocaleDateString());

    if (currHour < latenessHour) {
      setUserIsOnTime(true);
      dispatch(setOnTime(true));
    } else {
      dispatch(setOnTime(false));
    }

    const data = {
      date: date.toDateString(),
      isOnTime: userIsOnTime,
      time,
      id: "clockin",
    };

    dispatch(updateWeeklyAttendance(data));
    dispatch(showClockInDetails());
    dispatch(setCurrHour(currHour));

    updateAttendanceRecord(
      data,
      userId,
      dispatch,
      navigate,
      dailyClockInsArray
    );
  };
  /**
   * UI LAYOUT TODOs
   * Add a back button to navigate user back to the previous page
   *
   */
  return (
    <div className="w-full relative p-2 shadow-md h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      {profilePictureURL === "" || !navigator.onLine ? (
        <BsFillPersonFill
          size={50}
          className="w-[200px] h-[40%] border rounded"
        />
      ) : (
        <img
          className="w-[200px] h-[40%] mb-[100px]   border rounded-xl  border-lp-secondary"
          src={profilePictureURL}
          alt="user"
        />
      )}
      <div className="mb-[50px] mt-[20px] text-center text-lp-primary font-bold">
        Click the "Mark Attendance" button to clock in
      </div>
      <ButtonFull handleClick={() => markAttendance(userId)}>
        Mark attendance
      </ButtonFull>
      {displaySpinner === true ? <SpinnerSmall /> : null}
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displayFeedback === true ? (
        <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
          Something went wrong, please login out and log in again
        </FeedbackModal>
      ) : null}
      {/* <ClockOut /> */}
    </div>
  );
}

export default MarkUser;
