import React, { useState } from "react";

// Third-party imports ///
import { updateDoc, doc } from "firebase/firestore";

/// Local directory imports ///
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateClockOutData } from "../Handlers/mark.attendance";
import { hideFeedback, showFeedback } from "../../Redux Slices/signupSlice";
import NetworkFeedback from "../Modal/networkFeedback";
import FeedbackModal from "../Modal/feedbackModal";
import SpinnerSmall from "../Loading spinners/spinnerSmall";

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
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString("en-US");

    const data = {
      id: "Clock out",
      date,
      time,
      userImage,
    };

    setClockOutData(data);
    setShowBack(true);

    await updateClockOutData(data, userId, dispatch, attendanceData);
  };

  /* TODO:
  1. Add button for navigating backwards here
  2. Add something before the clock out button to make the UI more refined
  */
  return (
    <div className="w-full relative p-2 shadow-md h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      {/* <img
        className="w-[100px] mb-[100px] h-[100px]  border rounded-full border-lp-secondary"
        src={userImage}
        alt="user"
      /> */}
      {showFeedback === true ? (
        <div>
          <p>Clocked out successfully</p>
          <div className="flex justify-between items-center w-full p-2">
            <span>Clock out time:</span>{" "}
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
