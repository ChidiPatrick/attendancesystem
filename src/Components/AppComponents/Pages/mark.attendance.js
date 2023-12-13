import React, { useState } from "react";

//// Third-party imports ////
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FcInspection } from "react-icons/fc";
import { HiChevronLeft } from "react-icons/hi";

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
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setPassedAndFutureBreakDays } from "../Admin Dashboard/admin dashboard handlers/admin.session.setting";
import { checkHolidayDates } from "../Handlers/break.days";

function MarkUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states ///
  const isOnTime = useSelector((state) => state.attendanceRecord.isOnTime);
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
    (state) => state.attendanceRecord.latenessStartTime
  );

  const userProfile = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const breakDaysArray = useSelector(
    (state) => state.attendanceRecord.breakDaysArray
  );

  const { profilePictureURL, firstName, lastName } = userProfile;

  // Local states ////
  const [time, setCurrTime] = useState(currTime);
  const [currDate, setCurrDate] = useState(date);
  const [userIsOnTime, setUserIsOnTime] = useState(isOnTime);

  const holidaysObject = setPassedAndFutureBreakDays(breakDaysArray);

  const { futureHolidaysArray } = holidaysObject;

  const isBreakDay = checkHolidayDates(futureHolidaysArray);

  /// Mark attendance ///
  const markAttendance = async (userId, latenessHour) => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-US");
    const currHour = date.getHours();

    setTime(time);
    setCurrDate(date.toLocaleDateString());

    if (currHour < 9) {
      toast("Sorry, you can't clock in until it is 9:00am 🧭", {
        autoClose: 3000,
        type: "Warning",
      });

      return;
    }

    if (isBreakDay === true) {
      toast("We are on break, you can't clock in today.Bye 🤭");
      return;
    }

    if (currHour >= 9 && currHour < latenessHour) {
      console.log("First case called");
      setUserIsOnTime(true);
      dispatch(setOnTime(true));

      const data = {
        date: date.toDateString(),
        isOnTime: currHour < latenessHour,
        time: date.toLocaleTimeString("en-US"),
        name: `${firstName} ${lastName}`,
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

      return;
    } else {
      console.log("Second called");
      setUserIsOnTime(false);
      dispatch(setOnTime(false));

      const data = {
        date: date.toDateString(),
        isOnTime: currHour < latenessHour,
        time: date.toLocaleTimeString("en-US"),
        name: `${firstName} ${lastName}`,
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
    }
  };

  return (
    <div className="w-full relative h-screen flex flex-col justify-between border border-bg-lp-secondary items-center">
      {/* {profilePictureURL === "" || !navigator.onLine ? (
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
      )} */}
      <div className="bg-user-profile p-[10px] flex flex-col justify-between w-full sm:shadow-md sm:max-w-[640px] h-screen sm:h-[80%] sm:my-auto">
        <Link to={-1} className="w-full flex ">
          <HiChevronLeft size={30} />
        </Link>
        <div className="flex flex-col justify-between items-center">
          <div>
            <FcInspection size={100} />
          </div>
          <div className="mb-[50px] mt-[40px] text-center text-lp-primary font-bold">
            Click the "Mark Attendance" button to clock in
          </div>
        </div>
        <ToastContainer style={{ width: "100%", textAlign: "center" }} />
        <div className="mb-[20px] w-[100%] flex justify-center items-center">
          <ButtonFull handleClick={() => markAttendance(userId, latenessHour)}>
            Mark attendance
          </ButtonFull>
        </div>
        {displaySpinner === true ? <SpinnerSmall /> : null}
        {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
        {displayFeedback === true ? (
          <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
            Something went wrong, please login out and log in again
          </FeedbackModal>
        ) : null}
        {/* <ClockOut /> */}
      </div>
    </div>
  );
}

export default MarkUser;
