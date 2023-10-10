import { arrayUnion, increment, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
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

/* 
TODOs:
   Walk through the attendance marking process again
   Implement attendance updating logic to add clockout data

*/

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
    //Create document reference
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

    // if user is new to the system or it's a new week
    if (clockInAttendanceArray.length === 0) {
      console.log("Calling the first case...");
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
          console.log("Calling addClockInDataToAdminDatabase...");
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
      alert("You have already clocked in today");
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
        console.log("Calling the else statement");
        // await deletePreviousDayImage(clockInAttendanceArray, userId)
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
    console.log(err);
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

    // console.log(attendanceData);
    // if (attendanceData.length === 0) {
    //   await updateDoc(attendanceDocumentRef, data)
    //     .then(async () => {
    //       console.log("Adding clock out data to admin database");
    //       addClockOutDataToAdminDatabase(clockOutData);
    //     })

    //     .then(() => {
    //       console.log("Uploaded...");
    //       getAttendanceRecords(userId, dispatch);
    //     })

    //     .then(() => {
    //       dispatch(hideSpinner());
    //     });

    //   return;
    // }

    // console.log(attendanceData);
    // const clockOutsArray = [...attendanceData];
    // const lastClockOutObj = clockOutsArray[clockOutsArray.length - 1];
    // console.log(clockOutData);

    // if (
    //   clockOutsArray.length > 0 &&
    //   lastClockOutObj.date === new Date().toDateString()
    // ) {
    //   alert("Already clocked out for today!");

    //   dispatch(hideSpinner());

    //   return;
    // } else if (
    //   clockOutsArray === 0 ||
    //   lastClockOutObj.date !== new Date().toDateString()
    // ) {
    //   await updateDoc(attendanceDocumentRef, data)
    //     .then(async () => {
    //       console.log("Adding clock out data to admin database");
    //       addClockOutDataToAdminDatabase(clockOutData);
    //     })
    //     .then(() => {
    //       console.log("Uploaded...");
    //       dispatch(getAttendanceRecords(userId));
    //     })
    //     .then(() => {
    //       dispatch(hideSpinner());
    //     });
    // }

    ///////////////////////////////////////////////////////
    await updateDoc(attendanceDocumentRef, data)
      .then(async () => {
        console.log("Adding clock out data to admin database");
        addClockOutDataToAdminDatabase(clockOutData);
      })
      .then(() => {
        console.log("Uploaded...");
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
