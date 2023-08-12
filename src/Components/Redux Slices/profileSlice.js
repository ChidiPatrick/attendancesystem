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
      dispatch(setUserProfileData(userProfileData));
    }
  } catch (err) {
    console.log(err);
  }
};

// export const GetUserProfile = createAsyncThunk(
//   "userProfile/getUserProfile",
//   async (userId, { dispatch, getState }) => {
//     try {
//       const userProfileDocumentRef = firestoreRefCreator(
//         db,
//         userId,
//         "userProfileCollection",
//         "userProfileDocument"
//       );

//       const userProfileDocument = await getDoc(userProfileDocumentRef);

//       if (userProfileDocument.exists()) {
//         const userProfileData = userProfileDocument.data();
//         dispatch(setUserProfileData(userProfileData));
//         // dispatch(setProfilePictureUrl(userProfileData.));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const initialState = {
  userProfileData: {},
  userProfilePictureUrl: "",
};

const profileSlice = createSlice({
  name: "userProfileSlice",
  initialState,
  reducers: {
    setProfilePictureData(state, action) {
      state.userProfileData = action.payload;
    },
    setProfilePictureUrl(state, action) {
      state.userProfilePictureUrl = action.payload;
    },
    setUserProfileDocument(state, action) {
      state.userProfileData = action.payload;
    },
  },
});

export const { setUserProfileData, setProfilePictureUrl } =
  profileSlice.actions;

export default profileSlice.reducer;
