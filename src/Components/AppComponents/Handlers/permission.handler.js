import { onValue, ref, set, push, update } from "firebase/database";
import { rdb } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { hideSpinner, showSpinner } from "../../Redux Slices/signupSlice";
import {
  setPermissions,
  setStudentUISelectedPermissionObject,
  setUnreadResponses,
  showRequestResponseUI,
} from "../../Redux Slices/permission.slice";
import { getStudentBioObject } from "./profile.picture.upload.handler";
import { extractStudentBioObject } from "../../General app handlers/general.handlers";

//Project TODOs:
/**
 * Make unreadResponse calculation a realtime computation
 */

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
    `admindashboard/studentsBio/${rdbkey}/permissions`
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
  dispatch,
  userId
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

  const studentBioObject = extractStudentBioObject(studentsBioArray, userId);
  const { rdbkey } = studentBioObject;

  const studentPermissionObjectRef = ref(
    rdb,
    `admindashboard/studentsBio/${rdbkey}/permissions`
  );

  set(permissionReference, {
    ...permissionObject,
    timeSent: new Date().toLocaleTimeString(),
    dateSent: new Date().toDateString(),
    rdbKey: permissionReference.key,
    isNotified: false,
  })
    .then(() => {
      set(studentPermissionObjectRef, {
        ...permissionObject,
        timeSent: new Date().toLocaleTimeString(),
        dateSent: new Date().toDateString(),
        rdbKey: permissionReference.key,
        isNotified: false,
      });
    })
    .then(() => {
      getUserPermissionsArray(studentsBioArray, userId, dispatch);
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

// Get student bio object
const getStudentPermissionRequests = (
  studentsBioArray,
  studentID,
  dispatch
) => {
  const studentBiObejct = studentsBioArray.find(
    (studentBiObejct) => studentBiObejct.userId === studentID
  );

  const { permissionsArray } = studentBiObejct;

  if (permissionsArray === null || permissionsArray === undefined) return;

  const studentPermissionsArray = Object.values(permissionsArray);

  dispatch(setPermissions(studentPermissionsArray));

  return studentPermissionsArray;
};

// Get unread responses
const getUnreadResponseNumber = (studentsBioArray, dispatch, userId) => {
  let unreadResponses = 0;

  const studentPermissionsArray = getStudentPermissionRequests(
    studentsBioArray,
    userId,
    dispatch
  );

  if (studentPermissionsArray === undefined || studentPermissionsArray === null)
    return;

  studentPermissionsArray.map((permissionObject) => {
    if (permissionObject.isNotified === false) {
      unreadResponses = unreadResponses + 1;
    }
  });

  dispatch(setUnreadResponses(unreadResponses));
};

// Update permission notification to change isNotified property to true
const updatePermissionNotification = (
  permissionsArray,
  permissionObjectIndex,
  studentBioObject,
  dispatch
) => {
  const newPermissionsArray = [...permissionsArray];
  const permissionObject = newPermissionsArray[permissionObjectIndex];

  const updatedPermissionObject = { ...permissionObject, isNotified: true };
  newPermissionsArray[permissionObjectIndex] = updatedPermissionObject;

  if (
    permissionObject.status !== "Pending" &&
    permissionObject.isNotified === true
  ) {
    dispatch(setStudentUISelectedPermissionObject(permissionObject));
    // dispatch(setPermissions({ ...permissionsArray }));
    dispatch(showRequestResponseUI());
    return;
  }

  if (
    permissionObject.status === "Pending" &&
    permissionObject.isNotified === false &&
    !navigator.onLine
  ) {
    dispatch(setStudentUISelectedPermissionObject(permissionObject));
    // dispatch(setPermissions({ ...permissionsArray }));
    dispatch(showRequestResponseUI());
    return;
  }

  if (
    permissionObject.status !== "Pending" &&
    permissionObject.isNotified === false
  ) {
    const { rdbkey } = studentBioObject;
    const permissionObjectRef = ref(
      rdb,
      `admindashboard/studentsBio/${rdbkey}/permissions/${permissionObject.rdbkey}`
    );

    update(permissionObjectRef, { ...permissionObject, isNotified: true }).then(
      () => {
        dispatch(setStudentUISelectedPermissionObject(permissionObject));
        dispatch(setPermissions(permissionsArray));
        dispatch(showRequestResponseUI());
      }
    );
  }
};

// Listen for change in user bio database
const getUserPermissionsArray = (studentBioArray, userId, dispatch) => {
  const studentBioObject = extractStudentBioObject(studentBioArray, userId);
  const { rdbkey } = studentBioObject;
  const permissionsObjectRef = ref(
    rdb,
    `admindashboard/studentsBio/${rdbkey}/permissions`
  );

  let permissionsArray = "";

  onValue(permissionsObjectRef, (snapshot) => {
    permissionsArray = Object.values(snapshot.val());
  });

  dispatch(setPermissions(permissionsArray));

  getUnreadResponseNumber(studentBioArray, dispatch, userId);
};

export {
  sendPermissionRequestHandler,
  getStudentPermissionRequests,
  getUnreadResponseNumber,
  updatePermissionNotification,
  getUserPermissionsArray,
};
