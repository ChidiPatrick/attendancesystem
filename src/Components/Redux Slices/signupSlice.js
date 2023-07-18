import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displaySpinner: false,
  displayNetWorkFeedback: false,
  displayFeedback: false,
};

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    showSpinner(state, action) {
      state.displaySpinner = true;
    },
    hideSpinner(state, action) {
      state.displaySpinner = false;
    },
    showNetworkFeedback(state, action) {
      console.log("Network function called");
      state.displayNetWorkFeedback = true;
    },
    hideNetworkFeedback(state, action) {
      state.displayNetWorkFeedback = false;
    },
    showFeedback(state, action) {
      console.log("Network function called");
      state.displayFeedback = true;
    },
    hideFeedback(state, action) {
      state.displayFeedback = false;
    },
  },
});

export const {
  showSpinner,
  hideSpinner,
  showNetworkFeedback,
  hideNetworkFeedback,
  showFeedback,
  hideFeedback,
} = signupSlice.actions;

export default signupSlice.reducer;
