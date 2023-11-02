import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  studentsBioArray: [],
  selectedStudentObj: {},
};

const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState,
  reducers: {
    setStudentsArray(state, action) {
      state.studentsBioArray = action.payload;
    },
    setSelectedStudent(state, action) {
      state.selectedStudentObj = action.payload;
    },
  },
});

export const { setStudentsArray, setSelectedStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
