import { arrayUnion, increment, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  firestoreRefCreator,
  getStudentDocumentRef,
  deletePreviousDayImage,
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
  addClockInDataToAdminDocument,
  getStudentsArray,
} from "../Admin Dashboard/admin.handlers";

/* 
TODOs:
  1. Implement admin database updating algorithm for all clock in and outs
* 2. Fix bug in user profile line 57
* 3. Add password reset logic
* 4. Rearrange admin database structure
* 5. Populate attendance history page with data
* 6. Create password reset page and implement the logic


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

    dispatch(showSpinner());

    if (!navigator.onLine) {
      dispatch(showNetworkFeedback());
      return;
    }

    // if user is new to the system
    if (clockInAttendanceArray.length === 0) {
      const data = {
        dailyClockIns: [...clockInAttendanceArray, attendanceData],
      };

      const userProfileData = {
        totalDaysPresent: increment(1),
      };

      await updateDoc(attendanceRef, data)
        .then(async () => {
          await updateDoc(userProfileDocumentRef, userProfileData);
        })

        .then(async () => await getStudentsArray(userId))

        .then(async (studentBioArray) => {
          console.log(studentBioArray);
          /* 
why is admin collection showing dailyClockings as a property?
*/
          await addClockInDataToAdminDocument(
            attendanceData,
            studentBioArray,
            userId
          );
        })

        .then(async () => {
          await getAttendanceRecords(userId);
        })

        .then(() => {
          dispatch(hideSpinner());

          navigate("/attendanceSuccessful");
          return;
        });
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
        dailyClockIns: [...clockInAttendanceArray, attendanceData],
        // totalDaysPresent: increment(1),
      };

      const userProfileData = {
        ["currMonthRecord.totalDaysPresent"]: increment(1),
      };

      if (date.getDay() === 1) {
        await cleanUpPreviousWeekData(userId)
          .then(async () => await updateDoc(attendanceRef, data))

          .then(async () => {
            await updateDoc(userProfileDocumentRef, userProfileData);
          })

          .then(async () => await getStudentsArray(userId))

          .then(async (studentBioArray) => {
            await addClockInDataToAdminDocument(data, studentBioArray, userId);
          })

          .then(async () => {
            await getAttendanceRecords(userId);
          })

          .then(() => {
            dispatch(hideSpinner());

            navigate("/attendanceSuccessful");
          });
      } else {
        await deletePreviousDayImage(clockInAttendanceArray, userId)
          .then(async () => await updateDoc(attendanceRef, data))

          .then(async () => {
            await updateDoc(userProfileDocumentRef, userProfileData);
          })

          .then(async () => {
            console.log("calling getStudentsArray()");
            const studentBioArray = await getStudentsArray(userId);
            return studentBioArray;
          })

          .then(async (studentBioArray) => {
            console.log("calling addClockInDataToAdminDocument()");
            await addClockInDataToAdminDocument(data, studentBioArray, userId);
          })

          .then(async () => {
            await getAttendanceRecords(userId);
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

// Add clock in data
const updateClockOutData = async (
  clockOutData,
  userId,
  dispatch,
  attendanceData
) => {
  try {
    dispatch(showSpinner());

    const attendanceDocumentRef = firestoreRefCreator(
      db,
      userId,
      "attendanceCollection",
      "attendanceDocument"
    );

    const data = {
      dailyClockOuts: arrayUnion(clockOutData),
    };

    if (!navigator.onLine) {
      dispatch(hideSpinner());
      dispatch(showNetworkFeedback());
      return;
    }

    if (attendanceData.length === 0) {
      await updateDoc(attendanceDocumentRef, data)
        .then(() => {
          console.log("Uploaded...");
          dispatch(getAttendanceRecords(userId));
        })
        .then(() => {
          dispatch(hideSpinner());
        });

      return;
    }

    console.log(attendanceData);
    const clockOutsArray = [...attendanceData];
    const lastClockOutObj = clockOutsArray[clockOutsArray.length - 1];
    console.log(clockOutData);

    if (
      clockOutsArray.length > 0 &&
      lastClockOutObj.date === new Date().toDateString()
    ) {
      alert("Already clocked out for today!");

      dispatch(hideSpinner());

      return;
    } else if (
      clockOutsArray === 0 ||
      lastClockOutObj.date !== new Date().toDateString()
    ) {
      await updateDoc(attendanceDocumentRef, data)
        .then(() => {
          console.log("Uploaded...");
          dispatch(getAttendanceRecords(userId));
        })
        .then(() => {
          dispatch(hideSpinner());
        });
    }
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
