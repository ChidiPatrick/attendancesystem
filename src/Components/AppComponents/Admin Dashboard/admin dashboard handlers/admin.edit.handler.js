import { ref, update } from "firebase/database";
import {
  ref as storageRef,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  list,
} from "firebase/storage";

import { rdb } from "../../../Firebase/firebase";
import { toast } from "react-toastify";
import {
  hideAdminEditUi,
  hideSmallSpinner,
  setAdminData,
  setAdminProfilePictureURL,
  showSmallSpinner,
} from "../../../Redux Slices/adminSlice";
import { upadateAdminProfilePictureURL } from "./admin.handlers";

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
const uploadProfilePicture = (file, userId, dispatch, adminBioObject) => {
  const storage = getStorage();
  const adminsProfilePictureRef = storageRef(
    storage,
    `userProfilePicture/${userId}/${file.name}`
  );

  const adminRef = storageRef(storage, `userProfilePicture/${userId}`);
  console.log(adminRef);

  const metadata = {
    adminName: "Patrick chidi",
  };

  const uploadTask = uploadBytesResumable(adminsProfilePictureRef, file, {
    ...metadata,
  });

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      toast("Something went wrong. Please try again later", {
        type: "warning",
        autoClose: 3000,
      });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          dispatch(setAdminProfilePictureURL(downloadURL));
          upadateAdminProfilePictureURL(adminBioObject, downloadURL);
        })

        .then(() => {
          dispatch(hideSmallSpinner());
          toast("Uploaded successfully🎉😃", {
            type: "success",
            autoClose: "3000",
          });
          console.log("Uploaded");
        })

        .catch((err) => {
          toast(
            "Something went wrong, please try again with strong network connection",
            {
              type: "error",
              autoClose: 3000,
            }
          );
        });
    }
  );
};

// Delete previouse Profile picture
const deletePreviousProfilePicture = async (userId) => {
  const storage = getStorage();
  const adminRef = storageRef(storage, `userProfilePicture/${userId}`);

  const profilePictureList = await list(adminRef, { maxResults: 1 });

  if (profilePictureList.items.length === 0) {
    Promise.resolve();
    return;
  }
  const imageName = profilePictureList.items[0]._location.path_.split("/");

  const imageRef = storageRef(
    storage,
    `userProfilePicture/${userId}/${imageName[2]}`
  );

  deleteObject(imageRef)
    .then(() => "Done")
    .catch((err) => console.log(err));
};

// Profile picture changing major handler
const changeProfilePictureHandler = async (
  file,
  userId,
  dispatch,
  adminBioObject
) => {
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
  dispatch(showSmallSpinner());
  deletePreviousProfilePicture(userId)
    .then(() => {
      uploadProfilePicture(file, userId, dispatch, adminBioObject);
    })
    .then(() => dispatch(hideSmallSpinner()));
};

export {
  updateAdminProfile,
  uploadProfilePicture,
  changeProfilePictureHandler,
};
