import { configureStore, combineReducers } from "@reduxjs/toolkit";
import attendanceSlice from "../Redux Slices/Attendance Slice/attendanceSlice";
import signupSlice from "../Redux Slices/signupSlice";
import faceScanSlice from "../AppComponents/Face Scan component/faceScanSlice";

export const Store = configureStore({
  reducer: {
    attendanceRecord: attendanceSlice,
    signupSlice,
    faceScanSlice,
  },
});
