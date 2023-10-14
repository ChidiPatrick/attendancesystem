// Third-party imports
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

//Local imports
import attendanceSlice from "../Redux Slices/attendanceSlice";
import signupSlice from "../Redux Slices/signupSlice";
import faceScanSlice from "../AppComponents/Face Scan component/faceScanSlice";
import menuSlice from "../Redux Slices/menu.slice";
import loginSlice from "../Redux Slices/login.slice";
import adminSlice from "../Redux Slices/adminSlice";
import profileSlice from "../Redux Slices/profileSlice";
import permissionSlice from "../Redux Slices/permission.slice";
import classSetupSlice from "../Redux Slices/classSetupSlice";

// Configure redux persist
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["signupSlice", "menuSlice"],
};

const rootReducer = combineReducers({
  attendanceRecord: attendanceSlice,
  signupSlice,
  faceScanSlice,
  menuSlice,
  loginSlice,
  adminSlice,
  profileSlice,
  permissionSlice,
  classSetupSlice,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(Store);
