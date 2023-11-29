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
  wrongLoginMessage: "",
  wrongAdminLoginMessage: "",
  displayWrongAdminMessage: false,
  programStartingDate: "",
  programEndingDate: "",
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
    setWrongAdminLoginMessage(state, action) {
      state.wrongAdminLoginMessage = action.payload;
    },
    showWrongAdminLoginMessage(state, action) {
      state.displayWrongAdminMessage = true;
    },
    hideWrongAdminLoginMessage(state, action) {
      state.displayWrongAdminMessage = false;
      console.log("Hide admin message fully executed!");
    },
    setProgramStartingDate(state, action) {
      state.programStartingDate = action.payload;
    },
    setProgramEndingDate(state, action) {
      state.programEndingDate = action.payload;
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
  setProgramEndingDate,
  setProgramStartingDate,
} = loginSlice.actions;

export default loginSlice.reducer;
