import { createSlice } from "@reduxjs/toolkit";

/// Intial state
const initialState = {
  announcementTitle: "",
  announcementBody: "",
  announcementArray: [],
};

const announcementSlice = createSlice({
  name: "announcementSlice",
  initialState,
  reducer: {
    setAnnouncementTitle(state, action) {
      state.announcementTitle = action.payload;
    },
    setAnnouncementBody(state, action) {
      state.announcementBody = action.payload;
    },
    addAnnouncementObject(state, action) {
      state.announcementArray.push(action.payload);
    },
  },
});

export const {
  setAnnouncementBody,
  setAnnouncementTitle,
  addAnnouncementObject,
} = announcementSlice.actions;

export default announcementSlice.reducer;
