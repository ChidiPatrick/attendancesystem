// Third-party imports
import { increment, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

// Local directory imports
import {
  firestoreRefCreator,
  getStudentDocumentRef,
  cleanUpPreviousWeekData,
} from "../../General app handlers/general.handlers";
import { getAttendanceRecords } from "../../Redux Slices/attendanceSlice";
import {
  hideSpinner,
  showFeedback,
  showNetworkFeedback,
  showSpinner,
} from "../../Redux Slices/signupSlice";
import {
  addClockInDataToAdminDatabase,
  addClockOutDataToAdminDatabase,
} from "../Admin Dashboard/admin dashboard handlers/admin.handlers";
import { getWeekNumber } from "./get.current.week";
import { toast } from "react-toastify";

/////// HANDLERS ///////////////
const navigateToClockIn = (navigate, clockinPage) => {
  navigate(`/${clockinPage}`);
};

const updateAttendanceRecord = async (
  attendanceData,
  userId,
  dispatch,
  navigate,
  clockInAttendanceArray
) => {
  try {
    const attendanceRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const userProfileDocumentRef = firestoreRefCreator(
      db,
      userId,
      "userProfileCollection",
      "profileDocument"
    );

    const date = new Date();

    //User attendance data
    const userAttendanceData = {
      date: attendanceData.date,
      isOnTime: attendanceData.isOnTime,
      time: attendanceData.time,
      userId,
      clockoutObj: null,
    };

    //Admin data
    const adminData = {
      name: attendanceData.name,
      date: attendanceData.date,
      isOnTime: attendanceData.isOnTime,
      time: attendanceData.time,
      userId,
    };

    dispatch(showSpinner());

    // Check if user has internet connection
    if (!navigator.onLine) {
      dispatch(hideSpinner());
      dispatch(showNetworkFeedback());
      return;
    }

    if (new Date().getDay() === 6 || new Date().getDay() === 0) {
      dispatch(hideSpinner());
      toast("You can't clockin on weekends 😒", {
        autoClose: 3000,
        type: "warning",
      });

      return;
    }

    // if user is new to the system or it's a new week
    if (clockInAttendanceArray.length === 0) {
      const data = {
        dailyClockIns: [...clockInAttendanceArray, userAttendanceData],
      };

      const userProfileData = {
        ["currMonthRecord.totalDaysPresent"]: increment(1),
      };

      await updateDoc(attendanceRef, data)
        .then(async () => {
          await updateDoc(userProfileDocumentRef, userProfileData);
        })
        .then(async () => {
          addClockInDataToAdminDatabase(adminData);
        })
        .then(async () => {
          await getAttendanceRecords(userId, dispatch);
        })
        .then(() => {
          dispatch(hideSpinner());
          navigate("/attendanceSuccessful");
        });
      return;
    }

    const clockIns = [...clockInAttendanceArray];
    const lastClockInObj = clockIns.pop();

    console.log(clockIns);
    console.log(lastClockInObj);

    // if last clockin date equals current date, return
    if (lastClockInObj.date === new Date().toDateString()) {
      toast("You have already clocked in today", {
        type: "warning",
        autoClose: 3000,
      });
      dispatch(hideSpinner());
      return;
    }

    if (lastClockInObj.date !== new Date().toDateString()) {
      const data = {
        dailyClockIns: [...clockInAttendanceArray, userAttendanceData],
      };

      const newEntryData = {
        dailyClockIns: [attendanceData],
      };

      const userProfileData = {
        ["currMonthRecord.totalDaysPresent"]: increment(1),
      };

      if (getWeekNumber(lastClockInObj.date) !== getWeekNumber(new Date())) {
        await cleanUpPreviousWeekData(userId)
          .then(async () => await updateDoc(attendanceRef, newEntryData))

          .then(async () => {
            addClockInDataToAdminDatabase(adminData);
          })

          .then(async () => {
            await updateDoc(userProfileDocumentRef, userProfileData);
          })

          .then(async () => {
            await getAttendanceRecords(userId);
          })

          .then(() => {
            dispatch(hideSpinner());

            navigate("/attendanceSuccessful");
          });
      } else {
        await updateDoc(attendanceRef, data)
          .then(async () => {
            await updateDoc(userProfileDocumentRef, userProfileData);
          })

          .then(async () => {
            addClockInDataToAdminDatabase(adminData);
          })

          .then(async () => {
            await getAttendanceRecords(userId, dispatch);
          })

          .then(() => {
            dispatch(hideSpinner());
            navigate("/attendanceSuccessful");
          });
      }
    }
  } catch (err) {
    dispatch(hideSpinner());
    dispatch(showFeedback());
  }
};

// Add clock out data
const updateClockOutData = async (
  clockOutData,
  userId,
  dispatch,
  dailyClockInsArray
) => {
  try {
    dispatch(showSpinner());

    const attendanceDocumentRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    // Get last clockin object in the array
    const currClockinsArray = [...dailyClockInsArray];
    const lastClockinObject = currClockinsArray.pop();
    const newClockinObj = { ...lastClockinObject, clockoutObj: clockOutData };
    currClockinsArray.push(newClockinObj);

    const data = {
      dailyClockIns: currClockinsArray,
    };

    if (!navigator.onLine) {
      dispatch(hideSpinner());
      dispatch(showNetworkFeedback());
      return;
    }

    ///////////////////////////////////////////////////////
    await updateDoc(attendanceDocumentRef, data)
      .then(async () => {
        addClockOutDataToAdminDatabase(clockOutData);
      })
      .then(() => {
        dispatch(getAttendanceRecords(userId));
      })
      .then(() => {
        dispatch(hideSpinner());
      });
  } catch (err) {
    console.log(err);
    dispatch(showFeedback());
    dispatch(hideSpinner());
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

export { navigateToClockIn, updateAttendanceRecord, updateClockOutData };
