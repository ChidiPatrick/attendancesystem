import React, { useState } from "react";

/// Third-party imports ////
import { useDispatch, useSelector } from "react-redux";

/// Local directory imports /////
import haversine from "../Handlers/haversine";
import { setGeoCoords } from "../../Redux Slices/attendanceSlice";
import NetworkFeedback from "../Modal/networkFeedback";
import FeedbackModal from "../Modal/feedbackModal";
import {
  showNetworkFeedback,
  showFeedback,
} from "../../Redux Slices/signupSlice";
import { useNavigate } from "react-router";

function ClockLaunchCamera() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states ////
  const geoCoords = useSelector((state) => state.attendanceRecord.geoCoords);

  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );

  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );

  // const [showFeedback, setShowFeedback] = useState(false);

  const [image, setImage] = useState(null);

  const { latitude, longitude } = geoCoords;

  // Get Coordinates ///
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //Function to call on successful retrieval of geolocation data
  function success(pos) {
    const geoData = pos.coords;
    console.log(geoData);
    dispatch(setGeoCoords(geoData));

    return geoData;
  }

  // Error code to run on error
  function error(err) {
    console.warn(
      `Could not get geolocation please ensure you have strong internet connectivity`
    );
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  ///Proximity checking algorithm /////
  const location = haversine(6.204055, 7.067484, latitude, longitude);

  function checkProximity(location) {
    // convert location from Kilometer to meter
    const locationInMeters = location * 1000;

    if (!navigator.onLine) {
      dispatch(showNetworkFeedback());
      return;
    } else if (locationInMeters >= 0 && locationInMeters <= 10) {
      navigate("/webcam");
    } else {
      dispatch(showFeedback());
    }
  }

  /// Web camera settings ////

  return (
    <div className="relative p-2 w-full h-screen bg-[#FFFDFA] flex flex-col items-center justify-center">
      <div
        className={
          showFeedback === false
            ? "hidden"
            : "text-[#d60808] w-full text-center"
        }
      >
        You're not within the hub's proximity. Ensure your in the hub so that
        you can clock in
      </div>
      <h2 className="font-bold text-lp-primary text-xl text-center">
        Today’s attendance location is at the Reception
      </h2>
      <figure className="w-14 mt-10 h-14 bg-green-400">
        <img src="" className="w-full h-full " />
      </figure>
      <div className="font-bold text-xl mt-10">Launch Camera</div>
      <p className="mt-10 text-center">
        To take attendance, LM Tech hub will launch your camera
      </p>

      <div className=" flex justify-between items-center w-[90%] mt-10 mx-auto ">
        <button
          onClick={() => checkProximity(location)}
          className={
            "px-1 py-2 md:px-[16] font-semibold md:py-2 w-40 bg-lp-secondary text-white text-lg border rounded-3xl"
          }
        >
          Proceed
        </button>
        <button className="px-1 py-2 md:px-2 md:py-3 shad font-semibold w-40 bg-white text-lp-secondary text-lg border-[0.5] border-solid border-lp-secondary rounded-3xl">
          Cancel
        </button>
      </div>
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displayFeedback === true ? (
        <FeedbackModal>
          Please ensure that you have strong internet, and refresh your page
        </FeedbackModal>
      ) : null}
      <div className="w-400 h-400">
        <img src={image} />
      </div>
      {displayFeedback === true ? (
        <FeedbackModal>You're not within the hub's proximity</FeedbackModal>
      ) : null}
    </div>
  );
}

export default ClockLaunchCamera;
