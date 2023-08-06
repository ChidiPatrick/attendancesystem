import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
