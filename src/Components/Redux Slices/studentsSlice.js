import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentsBioArray: [],
};

const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState,
  reducers: {
    setStudentBioArray(state, action) {
      state.studentsBioArray = action.payload;
    },
  },
});

export const { setStudentBioArray } = studentsSlice.actions;

export default studentsSlice.reducer;
