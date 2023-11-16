import { onValue, ref, set, push } from "firebase/database";
import { rdb } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { hideSpinner, showSpinner } from "../../Redux Slices/signupSlice";

// Add permission to student's bio object
const addPermissionRequestToStudentBio = (
  permissionObject,
  studentID,
  studentsBioArray,
  adminPermissionRDBKey
) => {
  const studentBioObject = studentsBioArray.find(
    (studentBioObject) => studentBioObject.userId === studentID
  );

  const { rdbkey } = studentBioObject;

  const studentPermissionsRef = ref(
    rdb,
    `admindashboard/studentsBio/${rdbkey}/permissionsArray`
  );

  const permissionReference = push(studentPermissionsRef);

  set(permissionReference, {
    ...permissionObject,
    time: new Date().toLocaleTimeString(),
    dateSent: new Date().toDateString(),
    rdbKey: permissionReference.key,
    isNotified: false,
    adminPermissionRDBKey,
  });
};

// Permission request sending algorithm handler
const sendPermissionRequestHandler = (
  permissionObject,
  permissionBodyRef,
  studentsBioArray,
  dispatch
) => {
  if (!navigator.onLine) {
    toast(
      "No internet connection😕. Please check your internet connection and try again",
      {
        type: "error",
        autoClose: 3000,
      }
    );
    return;
  }

  if (
    permissionObject.permissionBody === "" ||
    permissionObject.permissionType === ""
  ) {
    toast("You can not send an empty permission request or type🙄", {
      type: "warning",
      autoClose: 3000,
    });
    return;
  }

  if (
    new Date(permissionObject.startingDate) < new Date() ||
    permissionObject.endingDate < new Date()
  ) {
    toast(
      "You can not go back in time, your date(s) must either be present or in the future🙄",
      {
        type: "warning",
        autoClose: 3000,
      }
    );
    return;
  }

  dispatch(showSpinner());

  const permissionsRef = ref(rdb, "admindashboard/permissions");
  const permissionReference = push(permissionsRef);

  set(permissionReference, {
    ...permissionObject,
    time: new Date().toLocaleTimeString(),
    dateSent: new Date().toDateString(),
    rdbKey: permissionReference.key,
    isNotified: false,
  })
    .then(() => {
      addPermissionRequestToStudentBio(
        permissionObject,
        permissionObject.userId,
        studentsBioArray,
        permissionReference.key
      );
    })
    .then(() => {
      dispatch(hideSpinner());
      toast("Permission request successfully sent 🎊🎊🎉", {
        type: "success",
        autoClose: 3000,
      });
    })
    .then(() => {
      permissionBodyRef.current.value = "";
    });
};

export { sendPermissionRequestHandler };
