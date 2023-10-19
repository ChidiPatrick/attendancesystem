import { onValue, ref } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";
import { setClockinList } from "../../../Redux Slices/attendanceReportSlice";
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
    console.log(clockinList);
    dispatch(setClockinList(clockinList));
  });
};

// Fetch all the attendance within the specified range
const fetchAttendanceWithinRange = (startDate, endDate, setAttendanceArray) => {
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
      console.log("Executed else!");
      console.log(attendanceArray);
      setAttendanceArray(attendanceArray);
      return attendanceArray;
    }
  });
};

// Attendance history generator
const generateAttendanceHistory = (startDate, endDate, setAttendanceArray) => {
  fetchAttendanceWithinRange(startDate, endDate, setAttendanceArray);
};

export { fetchCurrClockinArray, generateAttendanceHistory };
