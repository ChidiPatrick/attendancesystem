import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  permissionsArray: [],
};

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState,
  reducers: {
    setPermissions(state, action) {
      state.permissionsArray = action.payload.reverse();
    },
  },
});

export const { setPermissions } = permissionSlice.actions;

export default permissionSlice.reducer;
