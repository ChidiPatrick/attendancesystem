// Third-party imports ////
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "firebase/firestore";

// Local directory imports ///
import { db } from "../Firebase/firebase";
import { firestoreRefCreator } from "../General app handlers/general.handlers";
import { act } from "react-dom/test-utils";

const initialState = {
  userId: "",
  userProfileDocument: {},
  announcementsDocument: {},
  attendanceDocument: {},
};

/// Redux thunks for Getting user information //////

/// Get user document /////
const GetUserDocument = createAsyncThunk(
  "userProfileDocument/getUserProfileDocument",
  async (userId, { dispatch, getState }) => {
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
  }
);

// Get announcement document /////
const GetAnnouncementDocument = createAsyncThunk(
  "getAnnouncements/getAnnouncementDocument",
  async (userId, { dispatch, getState }) => {
    try {
      const announcementsDocumentRef = firestoreRefCreator(
        db,
        userId,
        "announcementCollection",
        "announcementDocument"
      );

      const announcementsDocument = await getDoc(announcementsDocumentRef);

      if (announcementsDocument.exists()) {
        dispatch(setAnnouncementDocument(announcementsDocument.data()));
      }
    } catch (err) {}
  }
);

// Get attendance records ////
const GetAttendanceRecord = createAsyncThunk(
  "attendanceRecord/getAttendanceRecord",
  async (userId, { dispatch, getState }) => {
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
  }
);

/// Get Per  /////

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setUserProfileDocument(state, action) {
      state.userProfileDocument = action.payload;
    },

    setAnnouncementDocument(state, action) {
      state.announcementsDocument = action.payload;
    },

    setAttendanceDocument(state, action) {
      state.attendanceDocument = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const {
  setUserProfileDocument,
  setAnnouncementDocument,
  setAttendanceDocument,
  setUserId,
} = loginSlice.actions;

export { GetAnnouncementDocument, GetAttendanceRecord, GetUserDocument };

export default loginSlice.reducer;
