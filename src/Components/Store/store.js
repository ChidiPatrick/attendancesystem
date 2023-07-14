import { configureStore, combineReducers } from "@reduxjs/toolkit";
import attendanceSlice from "../Redux Slices/Attendance Slice/attendanceSlice";

export const Store = configureStore({
  reducer: {
    attendanceRecord: attendanceSlice,
  },
});
