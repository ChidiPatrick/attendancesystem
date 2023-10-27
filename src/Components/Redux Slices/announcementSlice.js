import { createSlice } from "@reduxjs/toolkit";

/// Intial state
const initialState = {
  announcementTitle: "",
  announcementBody: "",
  announcementArray: [],
  displayNotification: false,
  notificationCounter: 0,
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
    showNotification(state, action) {
      state.displayNotification = true;
    },
    hideNotification(state, action) {
      state.displayNotification = false;
    },
    setCounterValue(state, action) {
      state.notificationCounter = action.payload;
    },
    resetNotificationCounter(state, action) {
      state.notificationCounter = 0;
    },
  },
});

export const {
  setAnnouncementBody,
  setAnnouncementTitle,
  addAnnouncement,
  setAnnouncementArray,
  showNotification,
  hideNotification,
  setCounterValue,
  resetNotificationCounter,
} = announcementSlice.actions;

export default announcementSlice.reducer;
