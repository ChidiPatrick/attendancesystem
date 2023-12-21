import { onValue, ref, set, push, update, remove } from "firebase/database";
import { rdb } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { hideSpinner, showSpinner } from "../../Redux Slices/signupSlice";
import {
  setIndividualStudentPermissionsArray,
  setStudentUISelectedPermissionObject,
  setUnreadResponses,
  showRequestResponseUI,
} from "../../Redux Slices/permission.slice";

import { setStudentBioArray } from "../../Redux Slices/studentsSlice";

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
    timeSent: new Date().toLocaleTimeString(),
    dateSent: new Date().toDateString(),
    rdbKey: permissionReference.key,
    isNotified: false,
  })
    .then(() => {
      updateStudentSlice(dispatch);
    })

    .then(() => getUnreadResponseNumber(dispatch, permissionObject.userId))

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
const getStudentPermissionRequests = (studentID, dispatch) => {
  const permissionsRef = ref(rdb, "admindashboard/permissions");

  let studentPermissionsArray = "";

  onValue(permissionsRef, (snapshot) => {
    if (snapshot.val() === null || snapshot.val() === undefined) return;

    const permissionsArray = Object.values(snapshot.val());

    studentPermissionsArray = permissionsArray.filter(
      (permissionObject) => permissionObject.userId === studentID
    );
  });

  return studentPermissionsArray;
};

// Get unread responses
const getUnreadResponseNumber = (dispatch, userId) => {
  let unreadResponses = 0;

  const studentPermissionsArray = getStudentPermissionRequests(
    userId,
    dispatch
  );

  if (
    studentPermissionsArray === undefined ||
    studentPermissionsArray.length === 0
  )
    return;

  dispatch(setIndividualStudentPermissionsArray(studentPermissionsArray));

  studentPermissionsArray.forEach((permissionObject) => {
    if (
      permissionObject.status !== "Pending" &&
      permissionObject.isNotified === false
    ) {
      unreadResponses = unreadResponses + 1;
    }
  });

  dispatch(setUnreadResponses(unreadResponses));
};

// Update permission notification to change isNotified property to true
const updatePermissionNotification = (
  permissionsArray,
  permissionObjectIndex,
  dispatch,
  studentsBioArray
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
    dispatch(showRequestResponseUI());
    return;
  }

  if (
    permissionObject.status === "Pending" &&
    permissionObject.isNotified === false &&
    !navigator.onLine
  ) {
    dispatch(setStudentUISelectedPermissionObject(permissionObject));
    dispatch(showRequestResponseUI());
    return;
  }

  if (
    permissionObject.status === "Pending" &&
    permissionObject.isNotified === false
  ) {
    dispatch(setStudentUISelectedPermissionObject(permissionObject));
    dispatch(showRequestResponseUI());
    return;
  }

  if (
    permissionObject.status !== "Pending" &&
    permissionObject.isNotified === false
  ) {
    studentPermissionNotificationUpdater(permissionObject)
      .then(() => {
        dispatch(setStudentUISelectedPermissionObject(permissionObject));
        dispatch(setIndividualStudentPermissionsArray(permissionsArray));
        dispatch(showRequestResponseUI());
      })
      .then(() => {
        updateStudentSlice(dispatch);
      })
      .then(() => {
        getUnreadResponseNumber(
          studentsBioArray,
          dispatch,
          permissionObject.userId,
          studentsBioArray
        );
      });
  } else {
  }
};

// Update studendsSlice state in redux
const updateStudentSlice = (dispatch) => {
  const studentsBioRef = ref(rdb, `admindashboard/studentsBio`);

  onValue(studentsBioRef, (snapshot) => {
    const studentBios = Object.values(snapshot.val());
    dispatch(setStudentBioArray(studentBios));
  });
};

// Get individual student's permissions requests
const getIndividualStudentPermissionRequests = (
  studentsBioArray,
  studentId,
  dispatch
) => {
  const permissionsRef = ref(rdb, "admindashboard/permissions");

  onValue(permissionsRef, (snapshot) => {
    const permissionsArray = Object.values(snapshot.val());

    const studentPermissionRequest = permissionsArray.filter(
      (permissionObject) => permissionObject.userId === studentId
    );

    dispatch(setIndividualStudentPermissionsArray(studentPermissionRequest));
  });
};

// Handle permissions update from student side
const studentPermissionNotificationUpdater = (permissionObject) => {
  const permissionsRef = ref(
    rdb,
    `admindashboard/permissions/${permissionObject.rdbKey}`
  );

  return update(permissionsRef, { ...permissionObject, isNotified: true });
};

export {
  sendPermissionRequestHandler,
  getStudentPermissionRequests,
  getUnreadResponseNumber,
  updatePermissionNotification,
};
