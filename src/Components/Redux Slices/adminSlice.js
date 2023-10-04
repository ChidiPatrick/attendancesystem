import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "firebase/firestore";

// Local directory imports ///
import { db } from "../Firebase/firebase";
import { getStudentDocumentRef } from "../General app handlers/general.handlers";

const initialState = {
  userId: "",
  weeklyAttendanceRecord: null,
  totalStudents: 0,
  displayWrongAdminLoginDetailsMessage: false,
  wrongAdminLoginMessage: "",
};

export const GetStudentAttendanceRecord = createAsyncThunk(
  "student/getAttendance",
  async (userId, { dispatch, getState }) => {
    console.log("ADMIN DASHBOARD CALLED...");
    try {
      const studentRef = getStudentDocumentRef(userId);

      const studentDocument = await getDoc(studentRef);
      console.log(studentDocument.data());

      if (studentDocument.exists()) {
        const data = studentDocument.data().weeklyAttendance;
        console.log(studentDocument.data());
        dispatch(setWeeklyAttendance(data));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const adminDashBoard = createSlice({
  name: "adninDashBoard",
  initialState,
  reducers: {
    setWeeklyAttendance(state, action) {
      state.weeklyAttendanceRecord = action.payload;
    },
    setTotalStudents(state, action) {
      state.totalStudents = action.payload;
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
  setWeeklyAttendance,
  setTotalStudents,
  showWrongAdminLoginMessage,
  hideWrongAdminLoginMessage,
  setWrongAdminLoginMessage,
} = adminDashBoard.actions;

export default adminDashBoard.reducer;
