import React from "react";

//// Third party imports /////////

function FaceScanSuccessful() {
  console.log(navigator.geolocation);

  // navigator.geolocation.getCurrentPosition(success, error, options);

  let id, target, options2;
  const success = (pos) => {
    const cords = pos.coords;
    console.log(pos);
    if (
      target.latitude === cords.latitude &&
      target.longitude === cords.longitude
    ) {
      console.log("Congratulations, you reached the target");
      navigator.geolocation.clearWatch(id);
    }
  };

  const error = (err) => {
    console.log(err.code, err.message);
  };

  target = {
    latitude: 0,
    longitude: 0,
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  id = navigator.geolocation.watchPosition(success, error, options);
  console.log(id);
  return (
    <div className="h-screen w-full bg-fbc p-4 border-t-2 border-lp-primary">
      <h2 className="text-center text-black font-bold text-2xl mt-5">
        Face Scan Update
      </h2>
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">
          Congratulation!
        </span>
        <span className="text-lg mt-2">
          You have successfully set up your account on LM Tech hub attendance
          system
        </span>
      </h3>
      <div className="w-full h-64 flex justify-center items-center bg-white border rounded-xl r  flex flex-col my-14">
        <figure className="w-20 text-center  h-20 bg-signup-gray border rounded-full  border-solid ">
          image here
        </figure>
        <div>
          <div>Full name</div>
          <div>user name</div>
          <div>Email</div>
        </div>
      </div>
      <label htmlFor="captureBtn">
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
      </label>
    </div>
  );
}

export default FaceScanSuccessful;
