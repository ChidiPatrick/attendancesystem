import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "dfjdfsl",
};

const attendanceSlice = createSlice({
  name: "attendanceRecord",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = attendanceSlice.actions;

export default attendanceSlice.reducer;
