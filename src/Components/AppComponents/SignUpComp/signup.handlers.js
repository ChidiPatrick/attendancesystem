/// Third party imports ///
import { setDoc, doc } from "firebase/firestore";

/// Local directory imports ///
import { firestoreRefCreator } from "../../General app handlers/general.handlers";

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
    currMonthRecord: {
      totalDaysPresent: 0,
      totalDaysAbsentWithPermission: 0,
      totalDaysAbsentWithOutPermission: 0,
      attendancePercentage: 0,
      totalPermissionSent: 0,
      totalRequestDenied: 0,
      totalRequestsApproved: 0,
    },
    date: new Date(),
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
    dailyAttendanceRecords: [],
    monthlyAttendanceRecords: [],
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

export {
  userProfileModelCreator,
  attendanceCollectionModelCreator,
  permissionCollectionModelCreator,
  announcementCollectionModelCreator,
};
