import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  userId: "dfjdfsl",
  geoCoords: {},
  displayWebCam: false,
  dailyAttendance: [],
  image: "",
  isOnTime: false,
  currTime: 0,
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
      state.isOnTime = true;
    },
    setTime(state, action) {
      state.currTime = action.payload;
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
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
