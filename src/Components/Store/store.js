import { configureStore, combineReducers } from "@reduxjs/toolkit";
import attendanceSlice from "../Redux Slices/attendanceSlice";

import signupSlice from "../Redux Slices/signupSlice";
import faceScanSlice from "../AppComponents/Face Scan component/faceScanSlice";
import menuSlice from "../Redux Slices/menu.slice";
import loginSlice from "../Redux Slices/login.slice";
import adminSlice from "../Redux Slices/adminSlice";
import profileSlice from "../Redux Slices/profileSlice";
import permissionSlice from "../Redux Slices/permission.slice";

export const Store = configureStore({
  reducer: {
    attendanceRecord: attendanceSlice,
    signupSlice,
    faceScanSlice,
    menuSlice,
    loginSlice,
    adminSlice,
    profileSlice,
    permissionSlice,
  },
});
