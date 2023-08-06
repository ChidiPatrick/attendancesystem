import { arrayUnion } from "firebase/firestore";

const navigateToClockIn = (navigate, clockinPage) => {
  navigate(clockinPage);
};

const updateAttendanceRecord = async (
  updateDoc,
  firestoreRefCreator,
  attendanceData,
  db,
  userId
) => {
  try {
    const attendanceRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const data = {
      dailyAttendanceRecords: attendanceData,
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

export { navigateToClockIn, updateAttendanceRecord };
