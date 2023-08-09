import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/// Third-party import
import { getDoc } from "firebase/firestore";

// local directory imports ///
import { db } from "../Firebase/firebase";
import { firestoreRefCreator } from "../General app handlers/general.handlers";

// Get attendance records ////
export const GetAttendanceRecord = createAsyncThunk(
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
        dispatch(setAttendanceData(attendanceDocument.data()));
      }
    } catch (err) {}
  }
);

const initialState = {
  userId: "dfjdfsl",
  geoCoords: {},
  displayWebCam: false,
  weeklyAttendance: [],
  image: "",
  isOnTime: false,
  currTime: 0,
  date: null,
  latenessHour: 11,
  displayClockInDetails: false,
  currHour: 0,
  clockOutObj: null,
  attendanceData: null,
};

const attendanceSlice = createSlice({
  name: "attendanceRecord",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },

    setGeoCoords(state, action) {
      state.geoCoords = action.payload;
    },

    showWebCam(state, action) {
      state.displayWebCam = true;
    },

    hideWebCam(state, action) {
      state.displayWebCam = false;
    },

    setDailyAttendance(state, action) {
      state.dailyAttendance = action.payload;
    },

    setUserImage(state, action) {
      state.image = action.payload;
    },

    setOnTime(state, action) {
      state.isOnTime = action.payload;
    },
    setTime(state, action) {
      state.currTime = action.payload;
    },

    setDate(state, action) {
      state.date = action.payload;
    },

    updateWeeklyAttendance(state, action) {
      state.weeklyAttendance.push(action.payload);
    },

    showClockInDetails(state, action) {
      state.displayClockInDetails = true;
    },

    hideClockInDetails(state, action) {
      state.displayClockInDetails = false;
    },

    setCurrHour(state, action) {
      state.currHour = action.payload;
    },

    setClockOutObj(state, action) {
      state.clockOutObj = action.payload;
    },

    setAttendanceData(state, action) {
      state.attendanceData = action.payload;
    },
  },
});

export const {
  setUserId,
  setGeoCoords,
  showWebCam,
  hideWebCam,
  setDailyAttendance,
  setUserImage,
  setOnTime,
  setTime,
  setDate,
  updateWeeklyAttendance,
  showClockInDetails,
  hideClockInDetails,
  setCurrHour,
  setClockOutObj,
  setAttendanceData,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
