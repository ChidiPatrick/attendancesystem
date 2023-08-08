import { doc } from "firebase/firestore";
import {
  GetUserDocument,
  GetAnnouncementDocument,
  GetAttendanceRecord,
} from "../Redux Slices/login.slice";
import { GetStudentAttendanceRecord } from "../Redux Slices/adminSlice";
import { GetUserProfile } from "../Redux Slices/profileSlice";

import { userId } from "react";
import { auth } from "../Firebase/firebase";
import { signOut } from "firebase/auth";
import { hideMenu } from "../Redux Slices/menu.slice";
import { db } from "../Firebase/firebase";

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

// Invoke all redux thunks for the user data ///
const invokeAllThunks = async (userId, dispatch) => {
  console.log("Getting all thunks!");
  dispatch(GetUserDocument(userId));
  dispatch(GetAnnouncementDocument(userId));
  dispatch(GetAttendanceRecord(userId));
  dispatch(GetStudentAttendanceRecord(userId));
  dispatch(GetUserProfile(userId));
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
export {
  firestoreRefCreator,
  firestoreAdminRefCreatore,
  invokeAllThunks,
  logout,
  getStudentDocumentRef,
};
