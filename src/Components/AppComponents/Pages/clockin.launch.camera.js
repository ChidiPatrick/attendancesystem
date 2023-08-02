import React, { useEffect } from "react";

/// Third-party imports ////
import { useDispatch, useSelector } from "react-redux";

/// Local directory imports /////
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import haversine from "../Handlers/haversine";
import { getGoelocation } from "../Handlers/clockin.handler";
import { setGeoCoords } from "../../Redux Slices/attendanceSlice";

function ClockLaunchCamera() {
  const dispatch = useDispatch();
  const geoCoords = useSelector((state) => state.attendanceRecord.geoCoords);

  const { latitude, longitude } = geoCoords;
  console.log(latitude, longitude);

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

  const location = haversine(6.204055, 7.067484, latitude, longitude);
  const decideLogin = (location) => {
    const locationInCentimeters = location * 100;
    if (locationInCentimeters >= 0 && locationInCentimeters <= 700) {
      console.log("Within proximity!");
    }
  };
  console.log(location);
  console.log(location * 100);
  decideLogin(location);
  return (
    <div className="w-full h-screen bg-[#FFFDFA] flex flex-col items-center justify-center">
      <h2 className="font-bold text-lp-primary text-xl text-center">
        Today’s attendance location is at the Reception
      </h2>
      <figure className="w-14 mt-10 h-14 bg-green-400">
        <img src="" className="w-full h-full " />
      </figure>
      <div className="font-bold text-xl mt-10">Launch Camera</div>
      <p className="mt-10">
        To take attendance, LM Tech hub will launch your camera
      </p>
      <div className=" flex justify-between items-center w-[80%] mt-10 mx-auto ">
        <ButtonFull>Proceed</ButtonFull>
        <ButtonLight>Cancel</ButtonLight>
      </div>
    </div>
  );
}

export default ClockLaunchCamera;
