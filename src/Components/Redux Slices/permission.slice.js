import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  permissionsArray: [],
  selectedPermissionRequest: {},
  displayPermissionModal: false,
  currStudentPermissionRequests: [],
  unreadResponses: 0,
  displayPermissionResponseUI: false,
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
    setUnreadResponses(state, action) {
      state.unreadResponses = action.payload;
    },
    showRequestResponseUI(state, action) {
      state.displayPermissionResponseUI = true;
    },
    hideRequestResponseUI(state, action) {
      state.displayPermissionResponseUI = false;
    },
  },
});

export const {
  setPermissions,
  setSelectedPermissionRequest,
  showPermissionModal,
  hidePermissionModal,
  setCurrStudentPermissionsArray,
  setUnreadResponses,
  hideRequestResponseUI,
  showRequestResponseUI,
} = permissionSlice.actions;

export default permissionSlice.reducer;
