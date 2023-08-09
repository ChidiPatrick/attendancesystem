import { arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  firestoreRefCreator,
  getStudentDocumentRef,
} from "../../General app handlers/general.handlers";
import { GetAttendanceRecord } from "../../Redux Slices/attendanceSlice";
import { showSpinner } from "../../Redux Slices/signupSlice";

/*  
   TODOs:
    1. Include a loading spinner for both clock in and out logic
    2. Add error handler for potential errors in both clockin and clockout logic
    3. Add fetch logic to undate the UI after clock in and out
    4. Add validation and restriction of clock in and out if the user has already done that to avoid uploading multiple data
    
    
    */

const navigateToClockIn = (navigate, clockinPage) => {
  console.log("called...");
  navigate(`/${clockinPage}`);
};

const updateAttendanceRecord = async (attendanceData, userId) => {
  try {
    const attendanceRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const data = {
      dailyClockIns: arrayUnion(attendanceData),
    };

    await updateDoc(attendanceRef, data).then(
      () => {
        alert("uploaded");
      },
      (err) => {
        console.log(err);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

/// Add clock in data //
const updateClockOutData = async (clockOutData, userId, dispatch) => {
  try {
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

    await updateDoc(attendanceDocumentRef, data).then(() => {
      alert("uploaded");
      dispatch(GetAttendanceRecord(userId));
    });
  } catch (err) {
    console.log(err);
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
