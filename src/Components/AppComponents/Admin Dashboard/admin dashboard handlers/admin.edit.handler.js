import { ref, update } from "firebase/database";
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

export { updateAdminProfile };
