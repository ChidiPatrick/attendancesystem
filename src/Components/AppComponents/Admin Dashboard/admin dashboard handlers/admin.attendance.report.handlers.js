import { onValue, ref } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";
import {
  setClockinList,
  setCurrStudentAttendanceArray,
  setCurrStudentClockinDays,
} from "../../../Redux Slices/attendanceReportSlice";
import { toast } from "react-toastify";

/// Fetch current clockin array
const fetchCurrClockinArray = (dispatch) => {
  if (!navigator.onLine) {
    toast("No internet connection😥", {
      theme: "dark",
      type: "warning",
      autoClose: 3000,
    });
  }

  console.log("fetching clockin array");
  const clockinRef = ref(rdb, "admindashboard/clockInList");

  onValue(clockinRef, (snapshot) => {
    const clockinList = Object.values(snapshot.val());
    dispatch(setClockinList(clockinList));
  });
};

// Fetch all the attendance within the specified range
const fetchAttendanceWithinRange = (startDate, endDate, setAttendanceArray) => {
  if (!navigator.onLine) {
    toast("You dont have internet connection", {
      theme: "dark",
      type: "error",
    });
    return;
  }

  console.log(startDate < endDate);

  if (endDate < startDate) {
    console.log("Checking date");
    toast(
      "Attendance history ending date can not be less than the starting date 🙄",
      {
        theme: "dark",
        type: "info",
      }
    );
    return;
  }

  const clockinListRef = ref(rdb, "admindashboard/clockInList");

  let generalAttendanceArray = "",
    attendanceArray = "";

  onValue(clockinListRef, (snapshot) => {
    generalAttendanceArray = Object.values(snapshot.val());

    // Filter general attendance Array for attendance objects within range
    attendanceArray = generalAttendanceArray.filter((attendanceObj) => {
      if (
        attendanceObj.date >= new Date(startDate).toDateString() &&
        attendanceObj.date <= new Date(endDate).toDateString()
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (attendanceArray.length === 0) {
      console.log("Executed first case!");
      toast("No attendance data within the specified date range 🙁", {
        theme: "dark",
        type: "warning",
      });
      return false;
    } else {
      setAttendanceArray(attendanceArray);
      return attendanceArray;
    }
  });
};

// Attendance history generator
const generateAttendanceHistory = (startDate, endDate, setAttendanceArray) => {
  fetchAttendanceWithinRange(startDate, endDate, setAttendanceArray);
};

// Get ClockIn attendance array
const calcCurrStudentTotalAttendanceDays = (
  attendanceArray,
  dispatch,
  studentId
) => {
  const currStudentAttendanceArray = attendanceArray.filter(
    (attendanceObject) => attendanceObject.userId === studentId
  );
  dispatch(setCurrStudentClockinDays(currStudentAttendanceArray.length));
  return currStudentAttendanceArray.length;
};

//Get selected student's daily clockin array
const getCurrStudentAttendanceArray = async (
  attendanceArray,
  dispatch,
  studentId
) => {
  const currStudentAttendanceArray = attendanceArray.filter(
    (attendanceObject) => attendanceObject.userId === studentId
  );

  dispatch(setCurrStudentAttendanceArray(currStudentAttendanceArray));
};

// Calculate number of days absent with permission
const calcNumbDaysAbsent = (numbDaysUsed, studentClockinArray) => {
  const numbDaysAbsent = numbDaysUsed - studentClockinArray.length;

  return numbDaysAbsent;
};

// Calculate number of days absent without permission
const CalcDaysAbsentWithoutPermission = (
  numbDaysUsed,
  studentClockinArray,
  studentPermissionsArray
) => {
  const totalNumbAbsentDays = calcNumbDaysAbsent(
    numbDaysUsed,
    studentClockinArray
  );

  let numbDaysAbsentWithPermission = studentPermissionsArray.filter(
    (permissionObject) => permissionObject.permissionType === "Absent"
  ).length;

  const numbDaysAbsentWithoutPermission =
    totalNumbAbsentDays - numbDaysAbsentWithPermission;
  console.log(studentPermissionsArray);
  return numbDaysAbsentWithoutPermission;
};

// Calculate number of days absent with permission
const calcNumbDaysAbsentWithPermission = (
  numbDaysUsed,
  studentClockinArray,
  studentPermissionsArray
) => {
  const numbDaysAbsentWithOutPermission = CalcDaysAbsentWithoutPermission(
    numbDaysUsed,
    studentClockinArray,
    studentPermissionsArray
  );

  const totalNumbAbsentDays = calcNumbDaysAbsent(
    numbDaysUsed,
    studentClockinArray
  );

  const numbDaysAbsentWithPermission =
    totalNumbAbsentDays - numbDaysAbsentWithOutPermission;
  console.log(`Total absent days: ${totalNumbAbsentDays}`);
  console.log(
    `Days absent without permission: ${numbDaysAbsentWithOutPermission}`
  );
  console.log(`Days absent with permission: ${numbDaysAbsentWithPermission}`);

  return numbDaysAbsentWithPermission;
};

// Calculate number of denied requests
const calcNumbDeniedRequests = (studentPermissionsArray) => {
  const numbDeniedRequests = studentPermissionsArray.filter(
    (permissionObject) => permissionObject.status === "Denied"
  );

  return numbDeniedRequests.length;
};

// Calculate number of Approved requests
const calcNumbApprovedRequests = (studentPermissionsArray) => {
  const numbApprovedRequests = studentPermissionsArray.filter(
    (permissionObject) => permissionObject.status === "Denied"
  ).length;

  return numbApprovedRequests;
};

//Calculate total days late in class
const calcNumbDaysLate = (studentAttendanceArray) => {
  const numbDaysLate = studentAttendanceArray.filter(
    (attendanceObject) => attendanceObject.isOnTime === false
  ).length;

  return numbDaysLate;
};

export {
  fetchCurrClockinArray,
  generateAttendanceHistory,
  calcCurrStudentTotalAttendanceDays,
  calcNumbDaysAbsentWithPermission,
  CalcDaysAbsentWithoutPermission,
  getCurrStudentAttendanceArray,
  calcNumbApprovedRequests,
  calcNumbDeniedRequests,
  calcNumbDaysAbsent,
  calcNumbDaysLate,
};
