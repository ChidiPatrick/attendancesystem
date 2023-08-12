import { arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  firestoreRefCreator,
  getStudentDocumentRef,
} from "../../General app handlers/general.handlers";
import { getAttendanceRecords } from "../../Redux Slices/attendanceSlice";
import {
  hideSpinner,
  showFeedback,
  showSpinner,
} from "../../Redux Slices/signupSlice";

/*  
   TODOs:
   * 1. Include a loading spinner for both clock in and out logic
   * 2. Add error handler for potential errors in both clockin and clockout logic
   * 3. Add fetch logic to update the UI after clock in and out
    4. Add validation and restriction of clock in and out if the user has already 
       done that to avoid uploading multiple data
    5. Rearrange the population of UI data call during login such that concerns are
       separated accurately
 START HERE:
  * 6. Add fix to clockout bugs and complete the logic 
  * 7. Make your redux thunks in invokeAllThunks functions to be called sequentially
  * 8. Change all your firebase queries from the use of redux thunk to use async functions
    */

const navigateToClockIn = (navigate, clockinPage) => {
  navigate(`/${clockinPage}`);
};

const updateAttendanceRecord = async (
  attendanceData,
  userId,
  dispatch,
  navigate
) => {
  try {
    const clockOuts = [...attendanceData.dailyClockOuts];
    const lastClockOutObj = clockOuts[clockOuts.length - 1];

    if (!navigator.onLine) {
      dispatch(showFeedback());
      return;
    }

    if (lastClockOutObj.Date === new Date().toDateString()) {
      console.log("Already clocked in for today!");
      return;
    }

    const attendanceRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const data = {
      dailyClockIns: arrayUnion(attendanceData),
    };

    await updateDoc(attendanceRef, data)
      .then(() => {
        dispatch(showSpinner());
        getAttendanceRecords(userId);
      })
      .then(() => {
        dispatch(hideSpinner());
        navigate("/attendanceSuccessful");
      });
  } catch (err) {
    dispatch(hideSpinner());
    dispatch(showFeedback());
    console.log(err);
  }
};

/// Add clock in data //
const updateClockOutData = async (
  clockOutData,
  userId,
  dispatch,
  attendanceData
) => {
  const clockOuts = [...attendanceData.dailyClockOuts];
  const lastClockOutObj = clockOuts[clockOuts.length - 1];

  try {
    if (!navigator.onLine) {
      dispatch(showFeedback());
      return;
    }

    if (lastClockOutObj.Date === new Date().toDateString()) {
      console.log("Already clocked out for today!");
      return;
    }

    dispatch(showSpinner());

    const attendanceDocumentRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const data = {
      dailyClockOuts: arrayUnion(clockOutData),
    };

    await updateDoc(attendanceDocumentRef, data)
      .then(() => {
        console.log("Uploaded...");
        dispatch(getAttendanceRecords(userId));
      })
      .then(() => {
        dispatch(hideSpinner());
      });
  } catch (err) {
    dispatch(showFeedback());
    dispatch(hideSpinner());
  }
};

///// Add record to dashboard ////
const addAttendanceToAdminCollection = (
  attendanceData,
  attendanceArray,
  userId
) => {
  const userAttendanceRef = getStudentDocumentRef(userId);

  const date = new Date();
  const day = date.getDay();

  const newArr = [...attendanceArray];

  newArr[day - 1] = true;

  const data = { weeklyAttendance: newArr };
};

export { navigateToClockIn, updateAttendanceRecord, updateClockOutData };
