import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDoc,
  doc,
  collection,
  collectionGroup,
  query,
} from "firebase/firestore";

// Local directory imports ///
import { db } from "../Firebase/firebase";

const initialState = {
  userId: "",
  displayMenu: false,
};

export const GetUsers = createAsyncThunk(
  "users/getUsers",
  async (userId, { dispatch, getState }) => {
    try {
      console.log(db);
      // const usersRef = doc(db, "users", "users");
      const users = query(collectionGroup(db, "users"));
      const querySnapshot = await getDoc(users);
      // const users = await getDoc(usersRef);
      // // if (salary.exists()) {
      // //   console.log(salary.data().salary);
      // //   dispatch(getSalary(salary.data().salary));
      // //   dispatch(getTotalExpenses(salary.data().totalExpenses));
      // // }
      console.log(querySnapshot);
    } catch (err) {
      console.log(err);
    }
  }
);

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
    setUserId(state, action) {
      console.log(action.payload);
      state.userId = action.payload;
    },
  },
});

export const { hideMenu, showMenu, setUserId } = menuSlice.actions;

export default menuSlice.reducer;
