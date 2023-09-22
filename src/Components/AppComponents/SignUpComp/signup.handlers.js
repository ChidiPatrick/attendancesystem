/// Third party imports ///
import { setDoc, doc, updateDoc } from "firebase/firestore";

/// Local directory imports ///
import {
  firestoreRefCreator,
  firestoreAdminRefCreatore,
} from "../../General app handlers/general.handlers";
import { getStudentsArray } from "../Admin Dashboard/admin dashboard handlers/admin.handlers";

//// User profile model creator ///
const userProfileModelCreator = async (
  db,
  userId,
  collection,
  document,
  values
) => {
  const userProfileRef = firestoreRefCreator(
    db,
    userId,
    collection,
    document,
    values
  );

  const data = {
    firstName: values.firstName,
    lastName: values.lastName,
    userName: values.userName,
    email: values.email,
    profilePictureURL: "",
    totalDaysPresent: 0,
    totalDaysAbsentWithPermission: 0,
    totalDaysAbsentWithOutPermission: 0,
    attendancePercentage: 0,
    totalPermissionSent: 0,
    totalRequestDenied: 0,
    totalRequestsApproved: 0,
    date: new Date().toDateString(),
    monthlyRecords: [],
  };

  await setDoc(userProfileRef, data);
};

/// Attendance Record Model creator ///
const attendanceCollectionModelCreator = async (
  db,
  userId,
  collection,
  document
) => {
  const userAttendanceRef = firestoreRefCreator(
    db,
    userId,
    collection,
    document
  );

  const data = {
    dailyClockIns: [],
    dailyClockOuts: [],
  };

  await setDoc(userAttendanceRef, data);
};

/// Permission model creator ///
const permissionCollectionModelCreator = async (
  db,
  userId,
  collection,
  document
) => {
  const permissionCollectionRef = firestoreRefCreator(
    db,
    userId,
    collection,
    document
  );

  const data = {
    firstName: "",
    lastName: "",
    fromDate: "",
    toDate: "",
    permissionReason: "",
  };

  await setDoc(permissionCollectionRef, data);
};

//// Announcement collection model creator ////
const announcementCollectionModelCreator = async (
  db,
  userId,
  collection,
  document
) => {
  const announcementCollectionRef = firestoreRefCreator(
    db,
    userId,
    collection,
    document
  );

  const data = {
    announcements: [],
  };

  await setDoc(announcementCollectionRef, data);
};

// Add student collection to the admin database
const addStudentBioToAdminDatabase = async (
  db,
  studentId,
  values,
  studentsBioArray
) => {
  const studentsBioDocumentRef = firestoreAdminRefCreatore(db, studentId);

  const studentAccount = {
    id: `${studentId}`,
    weeklyAttendance: ["Absent", "Absent", "Absent", "Absent", "Absent"],
    monthlyAttendanceRecords: [],
    userBio: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      userName: values.userName,
      tel: values.tel,
    },
  };

  const data = {
    studentsArray: [...studentsBioArray, studentAccount],
  };

  // await setDoc(adminDocumentRef, data);
  await updateDoc(studentsBioDocumentRef, data);
};

export {
  userProfileModelCreator,
  attendanceCollectionModelCreator,
  permissionCollectionModelCreator,
  announcementCollectionModelCreator,
  addStudentBioToAdminDatabase,
};
