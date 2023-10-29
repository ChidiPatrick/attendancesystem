import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
  clockinList: [],
  currStudentTotalClockinDays: 0,
};

const attendanceReportSlice = createSlice({
  name: "attendanceReportSlice",
  initialState,
  reducers: {
    setClockinList(state, action) {
      state.clockinList = action.payload;
    },
    setCurrStudentTotalClockInDays(state, action) {
      state.currStudentTotalClockinDays = action.payload;
    },
  },
});

export const { setClockinList, setCurrStudentTotalClockInDays } =
  attendanceReportSlice.actions;

export default attendanceReportSlice.reducer;
