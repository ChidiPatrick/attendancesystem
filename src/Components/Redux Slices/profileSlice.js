import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "firebase/firestore";

// Local directory imports ///
import { db } from "../Firebase/firebase";

const initialState = {};

const profileSlice = createSlice({
  name: "adninDashBoard",
  initialState,
  reducers: {},
});

export const { setWeeklyAttendance } = profileSlice.actions;

export default profileSlice.reducer;
