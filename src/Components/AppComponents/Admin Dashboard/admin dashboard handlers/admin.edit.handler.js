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

// // File selection handler
// const getSelectedFile = (setFile,dispatch) => {

// }

// Admin profile picture uploading handler
const uploadProfilePicture = (file) => {
  const storage = getStorage();
  const adminsProfilePictureRef = storageRef(storage, "adminsProfilePictures");

  const metadata = {
    adminName: "Patrick chidi",
  };

  uploadBytesResumable(adminsProfilePictureRef, file, metadata).then(() =>
    console.log("DONE")
  );
};

export { updateAdminProfile, uploadProfilePicture };
