import { doc, getDoc } from "firebase/firestore";
import {
  GetUserDocument,
  GetAnnouncementDocument,
} from "../Redux Slices/login.slice";
import { GetStudentAttendanceRecord } from "../Redux Slices/adminSlice";
import { GetAttendanceRecord } from "../Redux Slices/attendanceSlice";
import { GetUserProfile } from "../Redux Slices/profileSlice";
import { signOut } from "firebase/auth";
import { db } from "../Firebase/firebase";
import { setUserProfileDocument } from "../Redux Slices/login.slice";
import { setAttendanceDocument } from "../Redux Slices/login.slice";

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

/// Get attendance document ///
const getAttendanceDocument = async (userId, dispatch) => {
  try {
    const attendanceDocumentRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const attendanceDocument = await getDoc(attendanceDocumentRef);

    if (attendanceDocument.exists()) {
      console.log(attendanceDocument);
      dispatch(setAttendanceDocument(attendanceDocument.data()));
    }
  } catch (err) {}
};

// Invoke all redux thunks for the user data ///
const invokeAllThunks = async (userId, dispatch) => {
  const initialResponse = await getUserDocument(userId, dispatch).then(
    async () => await getAttendanceDocument(userId, dispatch)
  );
};

export {
  firestoreRefCreator,
  firestoreAdminRefCreatore,
  invokeAllThunks,
  logout,
  getStudentDocumentRef,
  getUserDocument,
  getAttendanceDocument,
};
