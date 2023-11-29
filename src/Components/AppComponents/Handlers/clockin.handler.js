//Third-party imports
import { onValue, ref } from "firebase/database";

//Local directory imports
import { rdb } from "../../Firebase/firebase";
import { setLatenessStartingTimeState } from "../../Redux Slices/classSetupSlice";
import { setLateHour } from "../../Redux Slices/attendanceSlice";

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

// Get lateness hours
const getLatenessHour = (dispatch) => {
  const latenessHourRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/latenessStartingTime"
  );
  let latenessHour = "";

  onValue(latenessHourRef, (snapshot) => {
    if (snapshot.val === null || snapshot.val() === undefined) return;
    console.log(snapshot.val());
    latenessHour = parseInt(snapshot.val().startTime.split(":")[0]);
    // console.log(latenessHour);
    dispatch(setLateHour(latenessHour));
  });

  console.log(latenessHour);
};

export { success, error, options, getLatenessHour };
