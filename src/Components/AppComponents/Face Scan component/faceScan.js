import React, { useEffect } from "react";

/////// Third party imports ///////////////
import faceIO from "@faceio/fiojs";

/////// FACE SCAN COMPONENTS ////////////
function FaceScan() {
  //// Initializations ////

  ///// Component handler functions ///////////////
  let faceio;
  useEffect(() => {
    faceio = new faceIO("fioa59dc");
  }, []);

  const onBorderNewUser = () => {
    faceio.enroll();
  };
  /// Component body /////////////////////
  return (
    <div className="h-screen bg-fbc w-full p-4 border-t-2 border-lp-primary">
      <h2 className="text-center text-black font-bold text-2xl mt-5">
        Set up face id
      </h2>
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hi,</span>
        <span className="text-lg mt-2">
          Take a picture to setup your facial recognition
        </span>
      </h3>
      <div className="w-full flex justify-center items-center my-4   ">
        <figure className="w-3/4 text-center h-40 bg-signup-gray border rounded-r-3xl rounded-l-3xl  border-solid ">
          image here
        </figure>
      </div>
      {/* <label htmlFor="captureBtn">
        <div className="bg-lp-secondary text-xl text-white p-4 w-50 border rounded-3xl text-center">
          Capture
        </div>
        <input
          type="file"
          id="captureBtn"
          name="picture"
          accept="image/*"
          capture="user"
          hidden
        />
      </label> */}
      <button className="bg-lp-secondary p-2 " onClick={onBorderNewUser}>
        Enroll
      </button>
    </div>
  );
}

export default FaceScan;
