import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/// Third-party import
import { getDoc } from "firebase/firestore";

// local directory imports ///
import { db } from "../Firebase/firebase";
import { firestoreRefCreator } from "../General app handlers/general.handlers";

// Get attendance records ////
export const getAttendanceRecords = async (userId, dispatch) => {
  try {
    const attendanceDocumentRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );
    // const dispatch = dispatch;
    const attendanceDocument = await getDoc(attendanceDocumentRef);

    if (attendanceDocument.exists()) {
      console.log(attendanceDocument.data().dailyClockIns);
      dispatch(setDailyClockIns(attendanceDocument.data().dailyClockIns));
      // dispatch(setDailyClockOuts(attendanceDocument.data().dailyClockOuts));
    }
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  userId: "dfjdfsl",
  geoCoords: {},
  displayWebCam: false,
  weeklyAttendance: [],
  image: "",
  isOnTime: false,
  currTime: 0,
  date: null,
  latenessHour: 10,
  displayClockInDetails: false,
  currHour: 0,
  clockOutObj: null,
  dailyClockIns: null,
  dailyClockOuts: null,
  linkToClockIn: true,
  linkToClockOut: false,
  clockInImage: null,
  currClockinObj: null,
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

    resetClockInImage(state, action) {
      state.image = null;
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

    setDailyClockIns(state, action) {
      state.dailyClockIns = action.payload;
    },

    setDailyClockOuts(state, action) {
      state.dailyClockOuts = action.payload;
    },

    setLinkToClockIn(state, action) {
      state.linkToClockIn = action.payload;
    },

    setLinkToClockOut(state, action) {
      state.linkToClockOut = action.payload;
    },
    setCurrClockinObj(state, action) {
      state.currClockinObj = action.payload;
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
  setDailyClockIns,
  setDailyClockOuts,
  setLinkToClockIn,
  setLinkToClockOut,
  resetClockInImage,
  setCurrClockinObj,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
