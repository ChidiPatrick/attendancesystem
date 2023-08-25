import { doc, getDoc, updateDoc } from "firebase/firestore";

// Thir-party imports ///
import { signOut } from "firebase/auth";

//// Local directory imports ////
import { getAttendanceRecords } from "../Redux Slices/attendanceSlice";
import { db } from "../Firebase/firebase";
import { setUserProfileDocument } from "../Redux Slices/profileSlice";

/// Firestore ref creator ////
const firestoreRefCreator = (db, userId, collection, document) => {
  return doc(db, "users", `${userId}`, `${collection}`, `${document}`);
};

const firestoreAdminRefCreatore = (db, studentId) => {
  return doc(db, "adminCollection", "studentsBio");
};

/* 
 *1. Implement weekly clean up function for both clock in and clock out
  2. Implement admin document updating for every student's log in
*/

/// Clean up previous week's clock in and clock out data ///
const cleanUpPreviousWeekData = async (userId) => {
  const attendanceRef = firestoreRefCreator(
    db,
    userId,
    "attendanceCollection",
    "attendanceDocument"
  );

  const data = { dailyClockIns: [], dailyClockOuts: [] };

  await updateDoc(attendanceRef, data);
};

/// Delete previous day's clock in image ///
const deletePreviousDayImage = async (attendanceArray, userId) => {
  const oldAttendanceArray = [...attendanceArray];

  const prevLastRecord = oldAttendanceArray.pop();

  const newLastRecord = { ...prevLastRecord, userImage: "" };

  oldAttendanceArray.push(newLastRecord);

  const newAttendanceArray = [...oldAttendanceArray];

  const attendanceRef = firestoreRefCreator(
    db,
    userId,
    "attendanceCollection",
    "attendanceDocument"
  );

  const data = {
    dailyClockIns: newAttendanceArray,
  };

  await updateDoc(attendanceRef, data).then(() => true);
};

/// Sign out function /////
const logout = async (auth, navigate, dispatch, hideMenu) => {
  await signOut(auth).then(() => {
    dispatch(hideMenu());
    navigate("/");
  });
};

/// Admin users ref creator ///
const getStudentDocumentRef = (userId) => {
  return doc(
    db,
    "adminCollection",
    "adminDocument",
    `${userId}`,
    "studentInfo"
  );
};

/// Get user document from firebase ////
const getUserDocument = async (userId, dispatch) => {
  try {
    const userProfileDocumentRef = firestoreRefCreator(
      db,
      userId,
      "userProfileCollection",
      "profileDocument"
    );

    const userProfileDocument = await getDoc(userProfileDocumentRef);

    if (userProfileDocument.exists()) {
      dispatch(setUserProfileDocument(userProfileDocument.data()));
    }
  } catch (err) {
    console.log(err);
  }
};

const calcNumWorkingDaysOfTheMonth = (year, month) => {
  const monthTotalDays = new Date(year, month, 0).getDate();

  console.log(monthTotalDays);

  let nummberOfBusinessDays = 0;

  for (let i = 1; i <= monthTotalDays; i++) {
    const day = new Date(year, month, i).getDay();

    if (day !== 0 && day !== 6) {
      nummberOfBusinessDays++;
    }
  }
  return nummberOfBusinessDays;
};

// Invoke all redux thunks for the user data ///
const invokeAllThunks = async (userId, dispatch) => {
  await getUserDocument(userId, dispatch).then(
    async () => await getAttendanceRecords(userId, dispatch)
  );
};

export {
  firestoreRefCreator,
  firestoreAdminRefCreatore,
  invokeAllThunks,
  logout,
  getStudentDocumentRef,
  getUserDocument,
  deletePreviousDayImage,
  cleanUpPreviousWeekData,
  calcNumWorkingDaysOfTheMonth,
};
