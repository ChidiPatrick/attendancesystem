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
  });
  return currWeekClockInArray;
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

    if (new Date(clockinObject.date).getDay() === 3) {
      wednesday = wednesday + 1;
    }

    if (new Date(clockinObject.date).getDay() === 4) {
      thursday = thursday + 1;
    }

    if (new Date(clockinObject.date).getDay() === 5) {
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

  onValue(clockinListRef, (snapshot) => {
    const clockinsArray = Object.values(snapshot.val());
    console.log(Object.values(snapshot.val()));
    dispatch(setClockinList(clockinsArray));
  });
};

// Get time distrubution for the current week's attendance
const getAttendanceTimeDistribution = (
  currWeekAttendanceArray,
  totalNumbStudents
) => {
  const currWeekNumber = getWeekNumber(new Date());

  const monday = {
      numbStudentsEarly: 0,
      numbStudentsLate: 0,
    },
    tuesday = {
      numbStudentsEarly: 0,
      numbStudentsLate: 0,
    },
    wednesday = {
      numbStudentsEarly: 0,
      numbStudentsLate: 0,
    },
    thursday = {
      numbStudentsEarly: 0,
      numbStudentsLate: 0,
    },
    friday = {
      numbStudentsEarly: 0,
      numbStudentsLate: 0,
    };

  // Loop through the attendance array
  currWeekAttendanceArray.forEach((attendanceObject) => {
    if (new Date(attendanceObject.date).getDay() === 1) {
      if (attendanceObject.isOnTime === true) {
        monday.numbStudentsEarly = monday.numbStudentsEarly + 1;
      } else {
        monday.numbStudentsLate = monday.numbStudentsLate + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 2) {
      if (attendanceObject.isOnTime === true) {
        tuesday.numbStudentsEarly = tuesday.numbStudentsEarly + 1;
      } else {
        tuesday.numbStudentsLate = tuesday.numbStudentsLate + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 3) {
      if (attendanceObject.isOnTime === true) {
        wednesday.numbStudentsEarly = wednesday.numbStudentsEarly + 1;
      } else {
        wednesday.numbStudentsLate = wednesday.numbStudentsLate + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 4) {
      if (attendanceObject.isOnTime === true) {
        thursday.numbStudentsEarly = thursday.numbStudentsEarly + 1;
      } else {
        thursday.numbStudentsLate = thursday.numbStudentsLate + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 5) {
      if (attendanceObject.isOnTime === true) {
        friday.numbStudentsEarly = friday.numbStudentsEarly + 1;
      } else {
        friday.numbStudentsLate = friday.numbStudentsLate + 1;
      }
    }
  });

  return [
    {
      ...monday,
      numbStudentsAbsent:
        totalNumbStudents - (this.numbStudentsLate + this.numbStudentsEarly),
    },
    {
      ...tuesday,
      numbStudentsAbsent:
        totalNumbStudents - (this.numbStudentsLate + this.numbStudentsEarly),
    },
    {
      ...wednesday,
      numbStudentsAbsent:
        totalNumbStudents - (this.numbStudentsLate + this.numbStudentsEarly),
    },
    {
      ...thursday,
      numbStudentsAbsent:
        totalNumbStudents - (this.numbStudentsLate + this.numbStudentsEarly),
    },
    {
      ...friday,
      numbStudentsAbsent:
        totalNumbStudents - (this.numbStudentsLate + this.numbStudentsEarly),
    },
  ];
};

export {
  getNumbStudentsPresentDaily,
  getClockinsArray,
  getAttendanceTimeDistribution,
};
