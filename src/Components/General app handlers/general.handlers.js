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
  return doc(
    db,
    "adminCollection",
    "adminDocument",
    `${studentId}`,
    "studentInfo"
  );
};

/* 
* 1. Complete the clean up function and test it with raw data
  2. implement the clean up function for clock in and clock out

*/

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
    console.log(userProfileDocument.data().profileDocument);

    if (userProfileDocument.exists()) {
      dispatch(setUserProfileDocument(userProfileDocument.data()));
    }
  } catch (err) {
    console.log(err);
  }
};

// Invoke all redux thunks for the user data ///
const invokeAllThunks = async (userId, dispatch) => {
  const initialResponse = await getUserDocument(userId, dispatch).then(
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
};
