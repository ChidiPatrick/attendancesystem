import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
  clockinList: [],
  currStudentTotalClockinDays: 0,
  currStudentAttendanceArray: [],
};

const attendanceReportSlice = createSlice({
  name: "attendanceReportSlice",
  initialState,
  reducers: {
    setClockinList(state, action) {
      state.clockinList = action.payload;
    },
    setCurrStudentClockinDays(state, action) {
      state.currStudentTotalClockinDays = action.payload;
    },
    setCurrStudentAttendanceArray(state, action) {
      state.currStudentAttendanceArray = action.payload;
    },
  },
});

export const {
  setClockinList,
  setCurrStudentClockinDays,
  setCurrStudentAttendanceArray,
} = attendanceReportSlice.actions;

export default attendanceReportSlice.reducer;
