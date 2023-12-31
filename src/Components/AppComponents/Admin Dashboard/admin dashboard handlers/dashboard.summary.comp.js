import { ref, onValue, getDatabase } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";
import { setPermissions } from "../../../Redux Slices/permission.slice";

// Get total number of students
const getStudentsTotalNumber = async (dispatch) => {
  const totalStudentsRef = ref(rdb, "admindashboard/studentsBio");

  onValue(totalStudentsRef, (snapshot) => {
    dispatch(setPermissions(Object.values(snapshot.val())));
  });
};

// Loop date
const loopDate = (programStartingDate, programEndingDate) => {
  let totalWorkDays = 0;
  const currDate = new Date(programStartingDate);

  if (new Date().valueOf() > new Date(programEndingDate).valueOf()) {
    return "Program ended";
  }

  while (currDate <= programEndingDate) {
    const dayOfWeek = currDate.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      totalWorkDays++;
    }
    currDate.setDate(currDate.getDate() + 1);
  }

  return totalWorkDays;
};

const calcProgramDaysUsed = (
  programStartingDate,
  currDate,
  programEndingDate
) => {
  if (new Date(currDate) > new Date(programEndingDate)) {
    return "Program completed";
  }

  let totalWorkDays = 0,
    startDate = new Date(programStartingDate),
    endDate = new Date(currDate);

  while (startDate <= endDate) {
    console.log("LOOP IS RUNNING");

    const workDay = new Date(startDate).getDay();
    if (workDay !== 0 && workDay !== 6) {
      totalWorkDays++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return totalWorkDays;
};

/// Get number of students in class
const getNumberOfStudentsInClass = (dispatch) => {
  const clockinRef = ref(rdb, "admindashboard/clockInList");
  let currDayClockInArray = "";

  onValue(clockinRef, (snapshot) => {
    const clockinList = Object.values(snapshot.val());

    currDayClockInArray = clockinList.filter(
      (clockinObject) => clockinObject.date === new Date().toDateString()
    );
  });

  return [currDayClockInArray.length, currDayClockInArray];
};

///////// Get permissions ///////////////////
const getPermissionRequests = (dispatch) => {
  const permissionsRef = ref(rdb, "admindashboard/permissions");
  onValue(permissionsRef, (snapshot) => {
    if (snapshot.val() === undefined || snapshot.val() === null) return;
    dispatch(setPermissions(Object.values(snapshot.val())));
  });
};

export {
  getStudentsTotalNumber,
  loopDate,
  calcProgramDaysUsed,
  getNumberOfStudentsInClass,
  getPermissionRequests,
};
