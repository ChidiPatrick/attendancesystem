import { getDoc, updateDoc } from "firebase/firestore";
import { firestoreAdminRefCreatore } from "../../../General app handlers/general.handlers";
import { db, rdb } from "../../../Firebase/firebase";
import { set, ref, onValue, push, off, update } from "firebase/database";

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
  set(clockInListRef, { ...clockInData, rdbKey: clockInListRef.key })
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

const updateAddClockinDataToAdminDatabaseWithClockoutObj = (
  clockinObject,
  clockoutObject
) => {
  const clockInDatabaseRef = ref(rdb, `admindashboard/clockInList`);
  const clocinObjectRef = clockInDatabaseRef.child(`${clockinObject.rdbKey}`);

  const updatedClockinObject = {
    ...clockinObject,
    clockoutObj: clockoutObject,
  };

  update(clocinObjectRef, updatedClockinObject);
  // const
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

const getStudentsBios = () => {
  const studentsBioRef = ref(rdb, "admindashboard/studentsBio");
  onValue(studentsBioRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
};

// Get students bio list

export {
  addStudentBioToAdminDatabase,
  addClockInDataToAdminDatabase,
  addClockOutDataToAdminDatabase,
  addAdminBioDataToDatabase,
  getStudentsLogins,
  getStudentsBios,
};
