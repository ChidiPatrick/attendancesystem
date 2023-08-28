import React, { useState } from "react";

/// Third-party imports ////
import { useDispatch, useSelector } from "react-redux";
import { LuCamera } from "react-icons/lu";

/// Local directory imports /////
import haversine from "../Handlers/haversine";
import { setGeoCoords } from "../../Redux Slices/attendanceSlice";
import NetworkFeedback from "../Modal/networkFeedback";
import FeedbackModal from "../Modal/feedbackModal";
import {
  showNetworkFeedback,
  showFeedback,
  hideFeedback,
} from "../../Redux Slices/signupSlice";
import { useNavigate } from "react-router";

/// Clock in component
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
  console.log(location);

  function checkProximity(location) {
    // convert location from Kilometer to meter
    const locationInMeters = location * 1000;

    if (!navigator.onLine) {
      dispatch(showNetworkFeedback());
      return;
    } else if (locationInMeters >= 0 && locationInMeters <= 12000) {
      navigate("/clockIn/webcam");
    } else {
      dispatch(showFeedback());
    }
  }

  const navigateBack = () => {
    navigate(-1);
  };

  /// Web camera settings ////

  return (
    <div className="w-full   py-6 h-auto  mx-auto">
      <div className="mx-auto max-w-[650px] w-[90%] md:w-full relative">
        {/* <div className=" flex items-center text-black bg-mywhite py-2 px-2  ">
          <span>
            <FaArrowLeft size={20} onClick={navigateBack} />
          </span>
          <p className=" mx-auto font-semibold text-[18px]">Clock In</p>
        </div> */}
        <h2 className="font-bold text-lp-primary text-lg md:text-xl text-center mt-6">
          Take a picture to clock in or clock out
        </h2>
        <figure className=" mt-4 md:mt-10  w-[80px] h-[80px] mx-auto ">
          <LuCamera className="w-[80px] h-[80px]" />
        </figure>
        <div className="font-bold text-lg md:text-xl mt-4 md:mt-10 text-center">
          Launch Camera
        </div>
        <p className="mt-10 text-center text-[15px] md:text-base">
          To take attendance, LM Tech hub will launch your camera
        </p>

        <div className=" flex justify-between items-center gap-3 w-[90%] mt-10 mx-auto ">
          <button
            onClick={() => checkProximity(location)}
            className={
              "px-1 py-2 md:px-[16] font-semibold md:py-2 w-40 bg-lp-secondary text-white text-lg border rounded-3xl"
            }
          >
            Proceed
          </button>
          <button
            onClick={navigateBack}
            className="px-1 py-2 md:px-2 md:py-3 shad font-semibold w-40 bg-white text-lp-secondary text-lg border-[0.5] border-solid border-lp-secondary rounded-3xl"
          >
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
          <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
            You're not within the hub's proximity
          </FeedbackModal>
        ) : null}
      </div>
    </div>
    // <div className="relative p-2 w-full h-screen bg-[#FFFDFA] flex flex-col items-center justify-center">
    //   <h2 className="font-bold text-lp-primary text-xl text-center">
    //     Take a picture to clock in or clock out
    //   </h2>
    //   <figure className="mt-10  w-[80px] h-[80px] ">
    //     <LuCamera className="w-[80px] h-[80px]" />
    //   </figure>
    //   <div className="font-bold text-xl mt-10">Launch Camera</div>
    //   <p className="mt-10 text-center">
    //     To take attendance, LM Tech hub will launch your camera
    //   </p>

    //   <div className=" flex justify-between items-center w-[90%] mt-10 mx-auto ">
    //     <button
    //       onClick={() => checkProximity(location)}
    //       className={
    //         "px-1 py-2 md:px-[16] font-semibold md:py-2 w-40 bg-lp-secondary text-white text-lg border rounded-3xl"
    //       }
    //     >
    //       Proceed
    //     </button>
    //     <button className="px-1 py-2 md:px-2 md:py-3 shad font-semibold w-40 bg-white text-lp-secondary text-lg border-[0.5] border-solid border-lp-secondary rounded-3xl">
    //       Cancel
    //     </button>
    //   </div>
    //   {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
    //   {displayFeedback === true ? (
    //     <FeedbackModal>
    //       Please ensure that you have strong internet, and refresh your page
    //     </FeedbackModal>
    //   ) : null}
    //   <div className="w-400 h-400">
    //     <img src={image} />
    //   </div>
    //   {displayFeedback === true ? (
    //     <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
    //       You're not within the hub's proximity
    //     </FeedbackModal>
    //   ) : null}
    // </div>
  );
}

export default ClockLaunchCamera;
