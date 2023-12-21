// Third-party imports
import {
  ref,
  getStorage,
  deleteObject,
  list,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { setProfilePictureUrl } from "../../Redux Slices/profileSlice";
import { rdb } from "../../Firebase/firebase";
import { onValue, update } from "firebase/database";
import { hideSpinner, showSpinner } from "../../Redux Slices/signupSlice";
import { toast } from "react-toastify";
import { ref as rdbRef } from "firebase/database";
import { getStudentsBioArrayFromDatabase } from "../LoginComp/login.handlers";

// Update student's profile picture URL in admin database
const updateStudentProfilePictureURLInAdminDatabase = (
  userBioObject,
  profilePictureURL
) => {
  const studentBioRef = rdbRef(
    rdb,
    `admindashboard/studentsBio/${userBioObject.rdbkey}`
  );

  update(studentBioRef, { ...userBioObject, profilePictureURL });
};

// Upload student's profile picture
const uploadProfilePicture = (file, userId, dispatch, studentBioObject) => {
  const storage = getStorage();
  const studentProfilePictureRef = ref(
    storage,
    `userProfilePicture/${userId}/${file.name}`
  );

  const studentRef = ref(storage, `userProfilePicture/${userId}`);
  const uploadTask = uploadBytesResumable(studentProfilePictureRef, file);

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
          console.log(downloadURL);
          dispatch(setProfilePictureUrl(downloadURL));
          updateStudentProfilePictureURLInAdminDatabase(
            studentBioObject,
            downloadURL
          );
        })
        .then(() => getStudentsBioArrayFromDatabase(dispatch))
        .then(() => {
          toast("Uploaded successfully🎉😃", {
            type: "success",
            autoClose: "3000",
          });
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
  const studentRef = ref(storage, `userProfilePicture/${userId}`);

  const profilePictureList = await list(studentRef, { maxResults: 1 });

  if (profilePictureList.items.length === 0) {
    return Promise.resolve("Done");
  }
  const imageName = profilePictureList.items[0]._location.path_.split("/");

  const imageRef = ref(storage, `userProfilePicture/${userId}/${imageName[2]}`);

  deleteObject(imageRef)
    .then(() => "Done")
    .catch((err) => console.log(err));
};

// Profile picture changing major handler
const changeProfilePictureHandler = async (
  file,
  userId,
  dispatch,
  studentBioObject
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
  dispatch(showSpinner());
  deletePreviousProfilePicture(userId)
    .then(() => {
      uploadProfilePicture(file, userId, dispatch, studentBioObject);
    })
    .then(() => dispatch(hideSpinner()))
    .then(() => {
      toast("Profile picture successfully uploaded", {
        autoClose: 3000,
        type: "success",
      });
    });
};

// Get student's bio object
const getStudentBioObject = (studentsBioArray, userId) => {
  const studentBioObject = studentsBioArray.find(
    (bioObject) => bioObject.userId === userId
  );

  return studentBioObject;
};

export { changeProfilePictureHandler, getStudentBioObject };
