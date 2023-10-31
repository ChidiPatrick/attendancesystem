import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  permissionsArray: [],
  selectedPermissionRequest: {},
  displayPermissionModal: false,
  currStudentPermissionRequests: [],
};

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState,
  reducers: {
    setPermissions(state, action) {
      state.permissionsArray = action.payload.reverse();
    },
    setSelectedPermissionRequest(state, action) {
      state.selectedPermissionRequest = action.payload;
    },
    showPermissionModal(state, action) {
      state.displayPermissionModal = true;
    },
    hidePermissionModal(state, action) {
      state.displayPermissionModal = false;
    },
    setCurrStudentPermissionsArray(state, action) {
      state.currStudentPermissionRequests = action.payload;
    },
  },
});

export const {
  setPermissions,
  setSelectedPermissionRequest,
  showPermissionModal,
  hidePermissionModal,
  setCurrStudentPermissionsArray,
} = permissionSlice.actions;

export default permissionSlice.reducer;
