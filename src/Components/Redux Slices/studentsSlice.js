import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentsBioArray: [],
  studentBio: "",
};

const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState,
  reducers: {
    setStudentBioArray(state, action) {
      state.studentsBioArray = action.payload;
    },
    setStudentBio(state, action) {
      state.studentBio = action.payload;
    },
  },
});

export const { setStudentBioArray, setStudentBio } = studentsSlice.actions;

export default studentsSlice.reducer;
