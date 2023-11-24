import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
  clockinList: [],
  currStudentTotalClockinDays: 0,
  currStudentAttendanceArray: [],
  attendanceGraphArray: null,
  displayBigGraph: false,
  currStudentAttendanceGraphArray: [],
  latenssStartTime: 0,
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
    showBigGraph(state, action) {
      state.displayBigGraph = true;
    },
    hideBigGraph(state, action) {
      state.displayBigGraph = false;
    },
    setCurrStudentGraphAttendanceArray(state, action) {
      state.currStudentAttendanceGraphArray = action.payload;
    },
  },
});

export const {
  setClockinList,
  setCurrStudentClockinDays,
  setCurrStudentAttendanceArray,
  setAttendanceGraphArray,
  showBigGraph,
  hideBigGraph,
  setCurrStudentGraphAttendanceArray,
  setLateHour,
} = attendanceReportSlice.actions;

export default attendanceReportSlice.reducer;
