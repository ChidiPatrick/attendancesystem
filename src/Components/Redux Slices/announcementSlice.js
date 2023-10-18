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
  reducers: {
    setAnnouncementTitle(state, action) {
      state.announcementTitle = action.payload;
    },
    setAnnouncementBody(state, action) {
      state.announcementBody = action.payload;
    },
    addAnnouncement(state, action) {
      state.announcementArray.push(action.payload);
    },
    setAnnouncementArray(state, action) {
      state.announcementArray = action.payload;
    },
  },
});

export const {
  setAnnouncementBody,
  setAnnouncementTitle,
  addAnnouncement,
  setAnnouncementArray,
} = announcementSlice.actions;

export default announcementSlice.reducer;
