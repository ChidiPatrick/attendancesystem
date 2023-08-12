// Third-party imports ////
import { createSlice } from "@reduxjs/toolkit";

// Local directory imports ///

const initialState = {
  userId: "",

  attendanceDocument: {},
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setUserProfileDocument(state, action) {
      state.userProfileDocument = action.payload;
    },

    setAttendanceDocument(state, action) {
      state.attendanceDocument = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setAttendanceDocument, setUserId } = loginSlice.actions;

export default loginSlice.reducer;
