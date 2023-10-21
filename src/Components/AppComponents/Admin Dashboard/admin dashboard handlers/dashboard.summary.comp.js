import { ref, onValue, getDatabase } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";
import { date } from "yup";

// Get total number of students
const getStudentsTotalNumber = async (dispatch) => {
  const totalStudentsRef = ref(rdb, "admindashboard/studentsBio");

  onValue(totalStudentsRef, (snapshot) => {
    const studentsObjectArray = Object.values(snapshot.val());
    console.log(studentsObjectArray);
    return studentsObjectArray.length;
  });
};

const loopDate = (programStartingDate, programEndingDate) => {
  let totalWorkDays = 0;
  const currDate = new Date(programStartingDate);

  while (currDate <= programEndingDate) {
    const dayOfWeek = currDate.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      totalWorkDays++;
    }
    currDate.setDate(currDate.getDate() + 1);
  }

  return totalWorkDays;
};

const calcProgramDaysUsed = (programStartingDate, endDate) => {
  let totalWorkDays = 0,
    startDate = new Date(programStartingDate);

  while (startDate <= endDate) {
    console.log(new Date(startDate).getDay());

    const workDay = new Date(startDate).getDay();
    if (workDay !== 0 && workDay !== 6) {
      totalWorkDays++;
    }
    startDate = startDate.setDate(startDate.getDate() + 1);
  }
  return totalWorkDays;
};

export { getStudentsTotalNumber, loopDate, calcProgramDaysUsed };
