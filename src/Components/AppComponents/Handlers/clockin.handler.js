import { setGeoCoords } from "../../Redux Slices/attendanceSlice";

//Geolocation retrieval options ///
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//Function to call on successful retrieval of geolocation data
function success(pos) {
  const geoData = pos.coords;
  console.log(geoData);

  return geoData;
}

// Error code to run on error
function error(err) {
  console.warn(
    `Could not get geolocation please ensure you have strong internet connectivity`
  );
}

function getGoelocation(dispatch, setGeoCoords) {
  const locationCoords = navigator.geolocation.getCurrentPosition(
    success,
    error,
    options
  );
  console.log(locationCoords);
  return locationCoords;
}

export { getGoelocation };
