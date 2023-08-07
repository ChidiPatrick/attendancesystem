import { arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  firestoreRefCreator,
  getStudentDocumentRef,
} from "../../General app handlers/general.handlers";

const navigateToClockIn = (navigate, clockinPage) => {
  console.log("called...");
  navigate(`/${clockinPage}`);
};

const updateAttendanceRecord = async (attendanceData, userId) => {
  try {
    const attendanceRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const data = {
      dailyAttendanceRecords: arrayUnion(attendanceData),
    };

    await updateDoc(attendanceRef, data).then(
      () => {
        alert("uploaded");
      },
      () => {
        alert("Network error!");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

///// Add record to dashboard ////
const addAttendanceToAdminCollection = (
  attendanceData,
  attendanceArray,
  userId
) => {
  const userAttendanceRef = getStudentDocumentRef(userId);

  const date = new Date();
  const day = date.getDay();

  const newArr = [...attendanceArray];

  newArr[day - 1] = true;

  const data = { weeklyAttendance: newArr };
};

export { navigateToClockIn, updateAttendanceRecord };
