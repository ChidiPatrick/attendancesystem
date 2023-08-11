import React from "react";

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

function ClockOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states ///
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const userId = useSelector((state) => state.loginSlice.userId);
  const attendanceData = useSelector(
    (state) => state.attendanceRecord.attendanceData
  );
  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );
  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );
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

    await updateClockOutData(data, userId, dispatch, attendanceData);
  };

  return (
    <div className="w-full relative p-2 shadow-md h-screen flex flex-col justify-center border border-bg-lp-secondary items-center">
      <img
        className="w-[100px] mb-[100px] h-[100px]  border rounded-full border-lp-secondary"
        src={userImage}
        alt="user"
      />
      <ButtonFull handleClick={clockOut}>Clock out</ButtonFull>
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displayFeedback === true ? (
        <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
          Something went wrong, please log out and log in again
        </FeedbackModal>
      ) : null}
    </div>
  );
}

export default ClockOut;
