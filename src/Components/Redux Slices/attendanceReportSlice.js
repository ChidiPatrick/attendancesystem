import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
  clockinList: [],
  currStudentTotalClockinDays: 0,
  currStudentAttendanceArray: [],
  attendanceGraphArray: null,
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
    setAttendanceGraphArray(state, action) {
      state.attendanceGraphArray = action.payload;
    },
  },
});

export const {
  setClockinList,
  setCurrStudentClockinDays,
  setCurrStudentAttendanceArray,
  setAttendanceGraphArray,
} = attendanceReportSlice.actions;

export default attendanceReportSlice.reducer;
