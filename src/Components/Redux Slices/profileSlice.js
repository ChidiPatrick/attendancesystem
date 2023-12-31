import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "firebase/firestore";

// Local directory imports ///
import { db } from "../Firebase/firebase";
import { firestoreRefCreator } from "../General app handlers/general.handlers";

export const getUserProfileData = async (userId, dispatch) => {
  try {
    const userProfileDocumentRef = firestoreRefCreator(
      db,
      userId,
      "userProfileCollection",
      "userProfileDocument"
    );

    const userProfileDocument = await getDoc(userProfileDocumentRef);

    if (userProfileDocument.exists()) {
      const userProfileData = userProfileDocument.data();
      dispatch(setUserProfileDocument(userProfileData));
      dispatch(setProfilePictureUrl(userProfileData.profilePicutureURL));
    }
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  userProfileData: {},
  userProfilePictureUrl: "",
  adminBio: "",
  displayProfilePictureUI: false,
};

const profileSlice = createSlice({
  name: "userProfileSlice",
  initialState,
  reducers: {
    setProfilePictureUrl(state, action) {
      state.userProfilePictureUrl = action.payload;
    },
    setUserProfileDocument(state, action) {
      state.userProfileData = action.payload;
    },
    showProfilePictureUI(state, action) {
      state.displayProfilePictureUI = true;
    },
    hideProfilePictureUI(state, action) {
      state.displayProfilePictureUI = false;
    },
  },
});

export const {
  setUserProfileDocument,
  setProfilePictureUrl,
  showProfilePictureUI,
  hideProfilePictureUI,
} = profileSlice.actions;

export default profileSlice.reducer;
