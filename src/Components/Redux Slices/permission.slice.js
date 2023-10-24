import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  permissionsArray: [],
  selectPermissionRequest: {},
};

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState,
  reducers: {
    setPermissions(state, action) {
      state.permissionsArray = action.payload.reverse();
    },
    setSelectedPermissionRequest(state, action) {
      state.selectPermissionRequest = action.payload;
    },
  },
});

export const { setPermissions, setSelectedPermissionRequest } =
  permissionSlice.actions;

export default permissionSlice.reducer;
