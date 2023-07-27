import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  displayMenu: false,
};

const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    showMenu(state, action) {
      state.displayMenu = true;
    },
    hideMenu(state, action) {
      state.displayMenu = false;
    },
  },
});

export const { hideMenu, showMenu } = menuSlice.actions;

export default menuSlice.reducer;
