import { createSlice } from "@reduxjs/toolkit";

//Initial state
const initialState = {
  clockinList: [],
};

const attendanceReportSlice = createSlice({
  name: "attendanceReportSlice",
  initialState,
  reducers: {
    setClockinList(state, action) {
      state.clockinList = action.payload;
    },
  },
});

export const { setClockinList } = attendanceReportSlice.actions;

export default attendanceReportSlice.reducer;
