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
   1. Check out why clock in validation is not working and fix it.
    */

const navigateToClockIn = (navigate, clockinPage) => {
  navigate(`/${clockinPage}`);
};

const updateAttendanceRecord = async (
  attendanceData,
  userId,
  dispatch,
  navigate,
  clockInAttendanceArray
) => {
  try {
    const clockOutIns = [...clockInAttendanceArray];
    const lastClockOutObj = clockOutIns[clockOutIns.length - 1];

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

// /// Add clock in data //
const updateClockOutData = async (
  clockOutData,
  userId,
  dispatch,
  attendanceData
) => {
  const clockOutsArray = [...attendanceData.dailyClockOuts];
  const lastClockOutObj = clockOutsArray[clockOutsArray.length - 1];

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
