import { doc } from "firebase/firestore";
import {
  GetUserDocument,
  GetAnnouncementDocument,
  GetAttendanceRecord,
} from "../Redux Slices/login.slice";
import { userId } from "react";
import { auth } from "../Firebase/firebase";
import { signOut } from "firebase/auth";
import { hideMenu } from "../Redux Slices/menu.slice";

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
};

/// Sign out function /////
const logout = async (auth, navigate, dispatch, hideMenu) => {
  await signOut(auth).then(() => {
    dispatch(hideMenu());
    navigate("/");
  });
};

export {
  firestoreRefCreator,
  firestoreAdminRefCreatore,
  invokeAllThunks,
  logout,
};
