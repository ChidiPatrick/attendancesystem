// Third-party imports ////
import { createSlice } from "@reduxjs/toolkit";

// Local directory imports ///

const initialState = {
  userId: "",
  user: "",
  attendanceDocument: {},
  studentsEmail: [],
  adminsEmail: [],
  displayWrongLoginCategory: false,
  displayWrongAdminLoginDetailsMessage: false,
  wrongLoginMessage: "",
  wrongAdminLoginMessage: "",
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
    setAdminsEmails(state, action) {
      state.adminsEmail = action.payload;
    },
    showWrongAdminLoginMessage(state, action) {
      state.displayWrongAdminLoginDetailsMessage = true;
    },
    hideWrongAdminLoginMessage(state, action) {
      state.displayWrongAdminLoginDetailsMessage = false;
    },
    setWrongAdminLoginMessage(state, action) {
      state.wrongAdminLoginMessage = action.payload;
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
  setAdminsEmails,
  showWrongAdminLoginMessage,
  hideWrongAdminLoginMessage,
  setWrongAdminLoginMessage,
} = loginSlice.actions;

export default loginSlice.reducer;
