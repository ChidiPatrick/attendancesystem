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
      name: "Mon",
      early: 0,
      late: 0,
    },
    tuesday = {
      name: "Tue",
      early: 0,
      late: 0,
    },
    wednesday = {
      name: "Wed",
      early: 0,
      late: 0,
    },
    thursday = {
      name: "Thu",
      early: 0,
      late: 0,
    },
    friday = {
      name: "Fri",
      early: 0,
      late: 0,
    };

  // Loop through the attendance array
  currWeekAttendanceArray.forEach((attendanceObject) => {
    if (new Date(attendanceObject.date).getDay() === 1) {
      if (attendanceObject.isOnTime === true) {
        monday.early = monday.early + 1;
      } else {
        monday.late = monday.late + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 2) {
      if (attendanceObject.isOnTime === true) {
        tuesday.early = tuesday.early + 1;
      } else {
        tuesday.late = tuesday.late + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 3) {
      if (attendanceObject.isOnTime === true) {
        wednesday.early = wednesday.early + 1;
      } else {
        wednesday.late = wednesday.late + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 4) {
      if (attendanceObject.isOnTime === true) {
        thursday.early = thursday.early + 1;
      } else {
        thursday.late = thursday.late + 1;
      }
    }

    if (new Date(attendanceObject.date).getDay() === 5) {
      if (attendanceObject.isOnTime === true) {
        friday.early = friday.early + 1;
      } else {
        friday.late = friday.late + 1;
      }
    }
  });

  return [
    {
      ...monday,
      absent: totalNumbStudents - (monday.late + monday.early),
    },
    {
      ...tuesday,
      absent: totalNumbStudents - (tuesday.late + tuesday.early),
    },
    {
      ...wednesday,
      absent: totalNumbStudents - (wednesday.late + wednesday.early),
    },
    {
      ...thursday,
      absent: totalNumbStudents - (thursday.late + thursday.early),
    },
    {
      ...friday,
      absent: totalNumbStudents - (friday.late + friday.early),
    },
  ];
};

// Student individual performance graph data
const getStudentGraphArray = (attendanceArray, studentId) => {
  const currStudentAttendanceArray = attendanceArray.filter(
    (attendanceObject, index) => attendanceObject.userId === studentId
  );
};

export {
  getNumbStudentsPresentDaily,
  getClockinsArray,
  getAttendanceTimeDistribution,
  getCurrWeekClockinArray,
};
