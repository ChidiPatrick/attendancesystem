import React, { useEffect, useState } from "react";

import haversine from "../Handlers/haversine";

function FaceScanTesting() {
  const [faceio, setFaceio] = useState(null);

  function daysInMonth(month, year, day) {
    console.log(new Date(year, month, day));
    return new Date(year, month, 0).getDate();
  }

  daysInMonth(6, 2023, 0);

  const successCallback = (position) => {
    console.log(position);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  const distance = haversine(6.204061, 7.067757, 6.2040729, 7.06752523);
  console.log(distance);

  return (
    <div className=" w-screen h-screen">
      <h1>Welcome</h1>
      <button className="bg-lp-secondary p-2 ">Enroll</button>
    </div>
  );
}

export default FaceScanTesting;
