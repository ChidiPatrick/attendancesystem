import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "dfjdfsl",
  geoCoords: {},
};

const attendanceSlice = createSlice({
  name: "attendanceRecord",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setGeoCoords(state, action) {
      state.geoCoords = action.payload;
    },
  },
});

export const { setUserId, setGeoCoords } = attendanceSlice.actions;

export default attendanceSlice.reducer;
