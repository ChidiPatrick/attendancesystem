// Third-party imports
import { ref } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";

// Local directory imports
import { onValue } from "firebase/database";
import {
  setAttendanceGraphArray,
  setClockinList,
  setCurrStudentGraphAttendanceArray,
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

// Get students's current week attendance array
const getStundentCurrWeekAttendanceArray = (currStudentAttendanceArray) => {
  const currWeekNumber = getWeekNumber(new Date());

  const studentCurrWeekAttendanceArray = currStudentAttendanceArray.filter(
    (attendanceObject) =>
      getWeekNumber(new Date(attendanceObject.date) === currWeekNumber)
  );

  return studentCurrWeekAttendanceArray;
};

// Get student's attendance record
const getStudentAttendanceRecord = (attendanceArray, studentId) => {
  const currStudentAttendanceArray = attendanceArray.filter(
    (attendanceObject, index) => attendanceObject.userId === studentId
  );

  return currStudentAttendanceArray;
};

// Arrange the student's current week's graph data
const arrangeStudentCurrWeekAttendanceTimeGraphData = (
  studentCurrWeekAttendanceArray
) => {
  const currWeekNumber = getWeekNumber(new Date());

  const monday = { time: "", punctuality: false, name: "Mon" },
    tuesday = { name: "Tue", punctuality: false, time: "" },
    wednesday = { name: "Wed", punctuality: false, time: "" },
    thursday = { name: "Thur", punctuality: false, time: "" },
    friday = { name: "Fri", punctuality: false, time: "" };

  studentCurrWeekAttendanceArray.forEach((attendanceObject) => {
    if (new Date(attendanceObject.date).getDay() === 1) {
      const time = attendanceObject.time.split(":");
      const hourMinuteTime = parseInt(time[0]) + parseInt(time[1]) / 100;
      monday.time = hourMinuteTime;
      monday.punctuality = attendanceObject.isOnTime;
    }

    if (new Date(attendanceObject.date).getDay() === 2) {
      const time = attendanceObject.time.split(":");
      const hourMinuteTime = parseInt(time[0]) + parseInt(time[1]) / 100;
      tuesday.time = hourMinuteTime;
      tuesday.punctuality = attendanceObject.isOnTime;
    }

    if (new Date(attendanceObject.date).getDay() === 3) {
      const time = attendanceObject.time.split(":");
      const hourMinuteTime = parseInt(time[0]) + parseInt(time[1]) / 100;
      wednesday.time = hourMinuteTime;
      wednesday.punctuality = attendanceObject.isOnTime;
    }

    if (new Date(attendanceObject.date).getDay() === 4) {
      const time = attendanceObject.time.split(":");
      const hourMinuteTime = parseInt(time[0]) + parseInt(time[1]) / 100;
      thursday.time = hourMinuteTime;
      thursday.punctuality = attendanceObject.isOnTime;
    }

    if (new Date(attendanceObject.date).getDay() === 5) {
      const time = attendanceObject.time.split(":");
      const hourMinuteTime = parseInt(time[0]) + parseInt(time[1]) / 100;
      friday.time = hourMinuteTime;
      friday.punctuality = attendanceObject.isOnTime;
    }
  });
  console.log([monday, tuesday, wednesday, thursday, friday]);

  return [monday, tuesday, wednesday, thursday, friday];
};

// sort

// Student's individual performance graph data
const setStudentGraphArray = (attendanceArray, studentId, dispatch) => {
  console.log("student graph");
  const studentAttendanceArray = getStudentAttendanceRecord(
    attendanceArray,
    studentId
  );

  const studentCurrWeekAttendanceArray = getStundentCurrWeekAttendanceArray(
    studentAttendanceArray
  );

  const studentCurrWeekAttendanceGraph =
    arrangeStudentCurrWeekAttendanceTimeGraphData(
      studentCurrWeekAttendanceArray
    );

  console.log(studentCurrWeekAttendanceGraph);
  dispatch(setCurrStudentGraphAttendanceArray(studentCurrWeekAttendanceGraph));
};

export {
  getNumbStudentsPresentDaily,
  getClockinsArray,
  getAttendanceTimeDistribution,
  getCurrWeekClockinArray,
  setStudentGraphArray,
};
