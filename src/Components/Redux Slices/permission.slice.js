import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  permissionsArray: [],
  selectedPermissionRequest: {},
  displayPermissionModal: false,
  currStudentPermissionRequests: [],
  unreadResponses: 0,
  displayPermissionResponseUI: false,
  studentUISelectedPermissionObject: {},
  individualStudentPermissionsArray: [],
};

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState,
  reducers: {
    setPermissions(state, action) {
      // if (action.payload === undefined || action.payload === null) return [];
      state.permissionsArray = action.payload?.reverse();
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
    setStudentUISelectedPermissionObject(state, action) {
      state.studentUISelectedPermissionObject = action.payload;
    },
    setIndividualStudentPermissionsArray(state, action) {
      state.individualStudentPermissionsArray = action.payload;
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
  setIndividualStudentPermissionsArray,
  setStudentUISelectedPermissionObject,
} = permissionSlice.actions;

export default permissionSlice.reducer;
