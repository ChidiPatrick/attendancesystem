import { getDoc, updateDoc } from "firebase/firestore";
import { firestoreAdminRefCreatore } from "../../General app handlers/general.handlers";
import { db, rdb } from "../../Firebase/firebase";
import { set, ref, onValue, push } from "firebase/database";

//Add new user bio into admin dabase
const addStudentBioToAdminDatabase = async (valuesObject, userId) => {
  const databaseRef = ref(rdb, `admindashboard/studentsBio`);
  const studentsBioRef = push(databaseRef);
  await set(studentsBioRef, { ...valuesObject });
};

// Add admin's bio data to the database
const addAdminBioDataToDatabase = async (valuesObject) => {
  const adminsBioDatabaseRef = ref(rdb, "admindashboard/adminsBioDatabase");
  const adminRefNumber = push(adminsBioDatabaseRef);
  await set(adminRefNumber, { ...valuesObject });
};

//Add clockin data to admin database
const addClockInDataToAdminDatabase = async (clockInData) => {
  const clockInDatabaseRef = ref(rdb, `admindashboard/clockInList`);
  const clockInListRef = push(clockInDatabaseRef);
  set(clockInListRef, { ...clockInData })
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

// Get students bio array from admin collection
// const getStudentsArray = async (userId) => {
//   try {
//     const studentsBioArrayRef = firestoreAdminRefCreatore(db, userId);

//     const studentsBioArray = await getDoc(studentsBioArrayRef);

//     if (
//       studentsBioArray.data().studentsArray === undefined ||
//       studentsBioArray.data().studentsArray.length === 0
//     ) {
//       return [];
//     }

//     if (studentsBioArray.exists()) {
//       console.log(studentsBioArray.data().studentsArray);
//       return studentsBioArray.data().studentsArray;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const addClockInDataToAdminDocument = async (
//   clockInData,
//   studentsBioArray,
//   userId
// ) => {
//   console.log(studentsBioArray);
//   const studentsBioArrayRef = firestoreAdminRefCreatore(db, userId);

//   console.log(clockInData);

//   const newStudentBioArray = studentsBioArray.map((studentBio, index) => {
//     if (studentBio.id === userId) {
//       const { weeklyAttendance } = studentBio;

//       const date = new Date();

//       console.log(clockInData);

//       weeklyAttendance[date.getDay() - 1] = {
//         clockInData: clockInData,
//       };

//       const newStudentBioObject = { ...studentBio, weeklyAttendance };

//       return newStudentBioObject;
//     } else {
//       return studentBio;
//     }
//   });

//   const data = {
//     studentsArray: newStudentBioArray,
//   };

//   await updateDoc(studentsBioArrayRef, data);
// };

// const addClockOutDataToAdminDocument = async (
//   clockOutData,
//   studentsBioArray,
//   userId
// ) => {
//   const studentsBioArrayRef = firestoreAdminRefCreatore(db, userId);

//   const studentsBioData = await getDoc(studentsBioArrayRef);

//   const modifiedBioArray = studentsBioArray.map((studentBio) => {
//     if (studentBio.id === userId) {
//       const { weeklyAttendance } = studentBio;

//       const date = new Date();

//       const attendanceData = weeklyAttendance[date.getDay() - 1];

//       weeklyAttendance[date.getDay() - 1] = {
//         ...attendanceData,
//         clockOutData: clockOutData,
//       };

//       const newStudentBioObject = { ...studentBio, weeklyAttendance };

//       return newStudentBioObject;
//     } else {
//       return studentBio;
//     }
//   });
// };

export {
  addStudentBioToAdminDatabase,
  addClockInDataToAdminDatabase,
  addClockOutDataToAdminDatabase,
  addAdminBioDataToDatabase,
};
