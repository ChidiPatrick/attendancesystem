import { ref, update } from "firebase/database";
import {
  ref as storageRef,
  getStorage,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { rdb } from "../../../Firebase/firebase";
import { toast } from "react-toastify";
import {
  hideAdminEditUi,
  setAdminData,
} from "../../../Redux Slices/adminSlice";

// Update admin profile information
const updateAdminProfile = (newAdminBioData, dispatch) => {
  if (!navigator.onLine) {
    toast("No internet connection 😫", {
      type: "warning",
      autoClose: 3000,
    });
    return;
  }

  if (
    newAdminBioData.firstName === undefined ||
    newAdminBioData.username === undefined ||
    newAdminBioData.lastName === undefined
  ) {
    toast("You can not submit an empty input field😕", {
      type: "warning",
      autoClose: 3000,
    });
    return;
  }

  const AdminProfileRef = ref(
    rdb,
    `admindashboard/adminsBioDatabase/${newAdminBioData.rdbKey}`
  );

  update(AdminProfileRef, {
    ...newAdminBioData,
  })
    .then(() => {
      dispatch(setAdminData(newAdminBioData));
    })
    .then(() => {
      toast("Updated successfully 🎊🎉", {
        type: "success",
        autoClose: 3000,
      });
    })
    .then(() => {
      dispatch(hideAdminEditUi());
    });
};

// Admin profile picture uploading handler
const uploadProfilePicture = (file, userId, showSpinner, setShowSpinner) => {
  if (!navigator.onLine) {
    toast("You are offline,please connect to the internet👨‍✈️", {
      type: "error",
      autoClose: 3000,
    });

    return;
  }

  if (file === null) {
    toast("Please select an image first🙄", {
      type: "warning",
      autoClose: 3000,
    });
    return;
  }
  const storage = getStorage();
  const adminsProfilePictureRef = storageRef(
    storage,
    `adminsProfilePictures/${userId}/${file.name}`
  );

  const metadata = {
    adminName: "Patrick chidi",
  };

  setShowSpinner(!showSpinner);
  uploadBytesResumable(adminsProfilePictureRef, file, { ...metadata })
    .then((uploadObject) => {
      console.log(uploadObject);

      toast("Uploaded successfully", {
        type: "success",
        autoClose: 3000,
      });
    })
    .then(() => console.log("DONE"));
};

export { updateAdminProfile, uploadProfilePicture };
