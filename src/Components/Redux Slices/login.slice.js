// Third-party imports ////
import { createSlice } from "@reduxjs/toolkit";

// Local directory imports ///

const initialState = {
  userId: "",
  user: "",
  attendanceDocument: {},
  studentsEmail: [],
  displayWrongLoginCategory: false,
  wrongLoginMessage: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setAttendanceDocument(state, action) {
      state.attendanceDocument = action.payload;
    },
    setLoginUserId(state, action) {
      state.userId = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setStudentsEmail(state, action) {
      state.studentsEmail = action.payload;
    },
    showWrongLoginCategory(state, action) {
      state.displayWrongLoginCategory = true;
    },
    hideWrongLoginCategory(state, action) {
      state.displayWrongLoginCategory = false;
    },
    setWrongLoginMessage(state, action) {
      state.wrongLoginMessage = action.payload;
    },
  },
});

export const {
  setAttendanceDocument,
  setLoginUserId,
  setUser,
  setStudentsEmail,
  showWrongLoginCategory,
  hideWrongLoginCategory,
  setWrongLoginMessage,
} = loginSlice.actions;

export default loginSlice.reducer;
