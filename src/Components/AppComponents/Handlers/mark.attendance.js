import { arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  firestoreRefCreator,
  getStudentDocumentRef,
} from "../../General app handlers/general.handlers";
import { GetAttendanceRecord } from "../../Redux Slices/attendanceSlice";
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
    */

const navigateToClockIn = (navigate, clockinPage) => {
  console.log("called...");
  navigate(`/${clockinPage}`);
};

const updateAttendanceRecord = async (
  attendanceData,
  userId,
  dispatch,
  navigate
) => {
  try {
    if (!navigator.onLine) {
      dispatch(showFeedback());
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
        dispatch(GetAttendanceRecord(userId));
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
const updateClockOutData = async (clockOutData, userId, dispatch) => {
  try {
    if (!navigator.onLine) {
      dispatch(showFeedback());
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
        alert("uploaded");
        dispatch(GetAttendanceRecord(userId));
      })
      .then(() => {
        dispatch(hideSpinner());
      });
  } catch (err) {
    dispatch(showFeedback());
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
