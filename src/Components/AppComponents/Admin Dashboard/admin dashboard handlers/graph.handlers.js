// Third-party imports
import { ref } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";

// Local directory imports
import { onValue } from "firebase/database";
import {
  setAttendanceGraphArray,
  setClockinList,
} from "../../../Redux Slices/attendanceReportSlice";
import { getWeekNumber } from "../../Handlers/get.current.week";

// Get current week clockins array
const getCurrWeekClockinArray = (attendanceArray) => {
  const currWeekNumber = getWeekNumber(new Date());

  const currWeekClockInArray = [];

  attendanceArray.forEach((clockObject) => {
    const weekNumber = getWeekNumber(clockObject.date);

    if (weekNumber === currWeekNumber) {
      currWeekClockInArray.push(clockObject);
    }

    return currWeekClockInArray;
  });
};

// Get number of students present each day
const getNumbStudentsPresentDaily = (attendanceArray, dispatch) => {
  const currWeekClockInArray = getCurrWeekClockinArray(attendanceArray);

  let monday = 0,
    tuesday = 0,
    wednesday = 0,
    thursday = 0,
    friday = 0;

  currWeekClockInArray.forEach((clockinObject) => {
    if (new Date(clockinObject.date).getDay() === 1) {
      monday = monday + 1;
    }

    if (new Date(clockinObject.date).getDay() === 2) {
      tuesday = tuesday + 1;
    }

    if (new Date(clockinObject.date).getDay() === 1) {
      wednesday = wednesday + 1;
    }

    if (new Date(clockinObject.date).getDay() === 1) {
      thursday = thursday + 1;
    }

    if (new Date(clockinObject.date).getDay() === 1) {
      friday = friday + 1;
    }
  });

  const attendanceGraphArray =
    currWeekClockInArray.length === 0
      ? null
      : [
          { name: "Mon", students: monday },
          { name: "Tue", students: tuesday },
          { name: "Wed", students: wednesday },
          { name: "Thu", students: thursday },
          { name: "Fri", students: friday },
        ];

  dispatch(setAttendanceGraphArray(attendanceGraphArray));
};

// Get clockins array
const getClockinsArray = (dispatch) => {
  const clockinListRef = ref(rdb, "admindashboard/clockInList");

  let clockinsArray = "nothing yet";

  onValue(clockinListRef, (snapshot) => {
    clockinsArray = Object.values(snapshot.val());
    console.log(Object.values(snapshot.val()));
  });

  dispatch(setClockinList(clockinsArray));
};

export { getNumbStudentsPresentDaily, getClockinsArray };
