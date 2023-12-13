import { rdb } from "../../../Firebase/firebase";
import { set, ref, onValue, push, update } from "firebase/database";
import {
  setSearchBoxDataArray,
  setStudentsBioArray,
} from "../../../Redux Slices/adminSlice";
import { setStudentsArray } from "../../../Redux Slices/adminStudentsSlice";
import { setCurrStudentPermissionsArray } from "../../../Redux Slices/permission.slice";

//Add new user bio into admin dabase
const addStudentBioToAdminDatabase = async (valuesObject, userId) => {
  const databaseRef = ref(rdb, `admindashboard/studentsBio`);
  const studentsBioRef = push(databaseRef);

  await set(studentsBioRef, {
    ...valuesObject,
    userId,
    rdbKey: studentsBioRef.key,
  });
};

// Set students bio array
const getStudentsArray = (dispatch) => {
  const studentsBioRef = ref(rdb, "admindashboard/studentsBio");

  onValue(studentsBioRef, (snapshot) => {
    console.log(Object.values(snapshot.val()));
    const studentsBioArray = Object.values(snapshot.val());
    dispatch(setStudentsArray(studentsBioArray));
  });
};

// Add admin's bio data to the database
const addAdminBioDataToDatabase = async (valuesObject) => {
  const adminsBioDatabaseRef = ref(rdb, "admindashboard/adminsBioDatabase");
  const adminRefNumber = push(adminsBioDatabaseRef);

  await set(adminRefNumber, {
    ...valuesObject,
    rdbKey: adminRefNumber.key,
    profilePicture: "",
  });
};

// Upate admin profile picture URL
const upadateAdminProfilePictureURL = (
  adminBioObject,
  newProfilePictureURL
) => {
  const adminBioRef = ref(
    rdb,
    `admindashboard/adminsBioDatabase/${adminBioObject.rdbKey}`
  );

  update(adminBioRef, {
    ...adminBioObject,
    profilePicture: newProfilePictureURL,
  });
};

//Add clockin data to admin database
const addClockInDataToAdminDatabase = async (clockInData) => {
  const clockInDatabaseRef = ref(rdb, `admindashboard/clockInList`);
  const clockInListRef = push(clockInDatabaseRef);

  console.log(clockInListRef.key);

  set(clockInListRef, {
    ...clockInData,
    rdbKey: clockInListRef.key,
  })
    .then(() => console.log("Uploaded!!"))
    .catch((err) => console.log(err));
};

// Add clockout data to admin database
const addClockOutDataToAdminDatabase = (clockOutData) => {
  const clockOutListRef = ref(rdb, `admindashboard/clockoutList`);

  const newListRef = push(clockOutListRef);

  set(newListRef, { ...clockOutData })
    .then(() => console.log("Uploaded!!"))
    .catch((err) => console.log(err));
};

const getCurrentClockinAttendanceObj = () => {
  const clockInDatabaseRef = ref(rdb, `admindashboard/clockInList`);

  let curAttendance = "No value";

  onValue(clockInDatabaseRef, (snapshot) => {
    curAttendance = snapshot.val();
  });

  const currAttendanceArray = Object.values(curAttendance);

  return currAttendanceArray;
};

/////// Get students Number ////////////
const getStudentsNumber = () => {
  const studentsBioRef = ref(rdb, `admindashboard/studentsBio`);
  let numberOfStudents = "";

  onValue(studentsBioRef, (snapshot) => {
    const studentsBioObj = snapshot.val();
    const studentsBioArray = Object.values(studentsBioObj);
    numberOfStudents = studentsBioArray.length;
  });

  return numberOfStudents;
};

/////////// Get students bio ///////////
const getStudentsBioArray = (dispatch) => {
  const studentsBioRef = ref(rdb, `admindashboard/studentsBio`);

  onValue(studentsBioRef, (snapshot) => {
    const studentsBioObj = snapshot.val();
    dispatch(setStudentsBioArray(Object.values(studentsBioObj)));
  });
};

const updateAddClockinDataToAdminDatabaseWithClockoutObj = (
  clockinObject,
  clockoutObject,
  userId,
  getAttenceFunction
) => {
  const currAttendanceArray = getAttenceFunction();

  const userCurrAttendanceObj = currAttendanceArray.find(
    (attendance) =>
      attendance.date === new Date().toDateString() &&
      attendance.userId === userId
  );

  const userCurrAttendanceRef = ref(
    rdb,
    `admindashboard/clockInList/${userCurrAttendanceObj.rdbKey}`
  );

  const updatedClockinObj = {
    ...clockinObject,
    clockoutObject: clockoutObject,
  };

  update(userCurrAttendanceRef, updatedClockinObj);
};

// Get students logins
const getStudentsLogins = () => {
  const clockinListRef = ref(rdb, "admindashboard/clockInList");
  let data, clockinArray, filteredArr;

  onValue(clockinListRef, (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    data = snapshot.val();
    clockinArray = Object.values(data);
    filteredArr = clockinArray.filter(
      (item, index) => item.date === new Date().toDateString()
    );
  });

  return filteredArr;
};

// Get student's unique permission requests
const setCurrStudentPermissionRequests = async (
  permissionsArray,
  studentId,
  dispatch
) => {
  const studentPermissions = permissionsArray.filter(
    (permissionObject) => permissionObject.userId === studentId
  );

  dispatch(setCurrStudentPermissionsArray(studentPermissions));
};

// Create searchbox data array
const createSearchBoxArray = (studentsBioArray, dispatch) => {
  const data = [];

  studentsBioArray.forEach((bioObject) => {
    let fullName = `${bioObject.firstName} ${bioObject.lastName}`;
    data.push({
      key: bioObject.firstName,
      value: fullName,
      userId: bioObject.userId,
    });
  });

  // dispatch(setSearchBoxDataArray(data));
  return data;
};

export {
  addStudentBioToAdminDatabase,
  addClockInDataToAdminDatabase,
  addClockOutDataToAdminDatabase,
  addAdminBioDataToDatabase,
  getStudentsLogins,
  updateAddClockinDataToAdminDatabaseWithClockoutObj,
  getCurrentClockinAttendanceObj,
  getStudentsNumber,
  getStudentsBioArray,
  getStudentsArray,
  setCurrStudentPermissionRequests,
  upadateAdminProfilePictureURL,
  createSearchBoxArray,
};
