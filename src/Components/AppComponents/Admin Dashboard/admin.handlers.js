import { getDoc, updateDoc } from "firebase/firestore";
import { firestoreAdminRefCreatore } from "../../General app handlers/general.handlers";
import { db } from "../../Firebase/firebase";

// Get students bio array from admin collection
const getStudentsArray = async (userId) => {
  try {
    const studentsBioArrayRef = firestoreAdminRefCreatore(db, userId);

    const studentsBioArray = await getDoc(studentsBioArrayRef);

    if (
      studentsBioArray.data().studentsArray === undefined ||
      studentsBioArray.data().studentsArray.length === 0
    ) {
      return [];
    }

    if (studentsBioArray.exists()) {
      console.log(studentsBioArray.data().studentsArray);
      return studentsBioArray.data().studentsArray;
    }
  } catch (err) {
    console.log(err);
  }
};

const addClockInDataToAdminDocument = async (
  clockInData,
  studentsBioArray,
  userId
) => {
  console.log(studentsBioArray);
  const studentsBioArrayRef = firestoreAdminRefCreatore(db, userId);

  const newStudentBioArray = studentsBioArray.map((studentBio, index) => {
    if (studentBio.id === userId) {
      const { weeklyAttendance } = studentBio;

      const date = new Date();

      weeklyAttendance[date.getDay() - 1] = { clockInData: clockInData };

      const newStudentBioObject = { ...studentBio, weeklyAttendance };

      return newStudentBioObject;
    } else {
      return studentBio;
    }
  });

  const data = {
    studentsArray: newStudentBioArray,
  };

  await updateDoc(studentsBioArrayRef, data);
};

const addClockOutDataToAdminDocument = (
  clockOutData,
  studentsBioArray,
  userId
) => {};

export { getStudentsArray, addClockInDataToAdminDocument };
