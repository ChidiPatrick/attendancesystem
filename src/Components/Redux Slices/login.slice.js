// Third-party imports ////
import { createSlice } from "@reduxjs/toolkit";

// Local directory imports ///

const initialState = {
  userId: "",
  user: "",
  attendanceDocument: {},
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
  },
});

export const { setAttendanceDocument, setLoginUserId, setUser } =
  loginSlice.actions;

export default loginSlice.reducer;
