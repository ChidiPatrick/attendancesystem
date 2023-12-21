// Third-party imports ///
import { updateDoc } from "firebase/firestore";

// Local directory imports ///
import { firestoreRefCreator } from "../../General app handlers/general.handlers";
import { db } from "../../Firebase/firebase";
import { getUserProfileData } from "../../Redux Slices/profileSlice";
import {
  hideSpinner,
  showFeedback,
  showNetworkFeedback,
  showSpinner,
} from "../../Redux Slices/signupSlice";

const saveProfileEdit = async (userDataObject, userId, dispatch) => {
  dispatch(showSpinner);

  if (!navigator.onLine) {
    dispatch(hideSpinner());
    dispatch(showNetworkFeedback());
    return;
  }

  const data = {
    firstName: userDataObject.firstName,
    lastName: userDataObject.lastName,
    userName: userDataObject.userName,
  };

  const userProfileDocumentRef = firestoreRefCreator(
    db,
    userId,
    "userProfileCollection",
    "profileDocument"
  );

  await updateDoc(userProfileDocumentRef, data).then(() => {
    try {
      getUserProfileData(userId, dispatch).then(() => {
        dispatch(hideSpinner());
        dispatch(showFeedback());
      });
    } catch (err) {
      dispatch(hideSpinner());
    }
  });
};

export { saveProfileEdit };
