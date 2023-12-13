// Third-party imports
import { update, ref, remove, onValue } from "firebase/database";
import { toast } from "react-toastify";
import { push, set } from "firebase/database";

// Local directory imports
import { rdb } from "../../../Firebase/firebase";
import {
  addBreakObject,
  setFetchedBreakDays,
} from "../../../Redux Slices/classSetupSlice";

///////////////////////////////////////////////////////////////////
// PROGRAM DURATION UPDATING HANDLERS
const updateProgramStartingDate = (date) => {
  const programStartingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programStartingDate"
  );

  update(programStartingRef, { date });
};

const updateProgramEndingDate = (endDate) => {
  const programEndingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  update(programEndingRef, { endDate });
};

///////////////////////////////////////////////////////////////////

// EARLINESS TIME UPDATING HANDLERS
const updateEarlinessStartingTime = (startTime) => {
  const earlinessStartingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessStartingTime"
  );

  update(earlinessStartingTimeRef, { startTime });
};

const updatingEarlinessEndTime = (endTime) => {
  const earlinessEndingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessEndingTime"
  );

  update(earlinessEndingTimeRef, { endTime });
};

//////////////////////////////////////////////////////////////////

// LATENESS TIME UPDATING HANDLERS
const updateLatenessStartTime = (startTime) => {
  const latenessStartTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/latenessStartingTime"
  );

  update(latenessStartTimeRef, { startTime });
};

// LECTURE DAYS ARRAY UPDATING HANDLER
const updateLectureDaysArray = (lectureDaysAarray) => {
  const lectureDaysArrayRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/lectureDaysArrayRef"
  );

  update(lectureDaysArrayRef, { lectureDaysAarray });
};
////////////////////////////////////////////////////////////////////////////

//SETTINGS UPDATING INITIATORS

//Program duration updating handler
const updateProgramDurationSettings = async (settingsObject) => {
  if (settingsObject.sessionDuration.startDate !== "") {
    updateProgramStartingDate(settingsObject.sessionDuration.startDate);
  }

  if (settingsObject.sessionDuration.endDate !== "") {
    updateProgramEndingDate(settingsObject.sessionDuration.endDate);
  }
};

//Lateness duration updating handler
const updateEarlinessTimeDuration = async (settingsObject) => {
  if (settingsObject.earlyTimeFrame.startTime !== "") {
    updateEarlinessStartingTime(settingsObject.earlyTimeFrame.startTime);
  }

  if (settingsObject.earlyTimeFrame.endTime !== "") {
    updatingEarlinessEndTime(settingsObject.earlyTimeFrame.endTime);
  }
};

//Lateness duration updating handler
const updateLatenessTimeFrame = async (settingsObject) => {
  if (settingsObject.latenessTimeFrame.startTime !== "")
    updateLatenessStartTime(settingsObject.latenessTimeFrame.startTime);
};

const updateLectureDays = async (settingsObject) => {
  if (settingsObject.lectureDays.length !== 0) {
    updateLectureDaysArray(settingsObject.lectureDays);
  }
};

///////////////////////////////////////////////////////////////
//////// BREAK AND ABSENT DAYS SETTINGS HANDLERS ////////////
const updateBreakDaysArray = async (breakObject) => {
  const breakDaysRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/breakDaysArray"
  );
  const breakListRef = push(breakDaysRef);
  set(breakListRef, { ...breakObject });
};

////////////// Toastify handler ///////////////////
const emmitToast = (toastString, toastObject) => {
  toast(toastString, { ...toastObject });
};

const setBreakDays = (breakObject, dispatch, toastObject) => {
  if (!navigator.onLine) {
    console.log("Called...");
    emmitToast("No internet connection", {
      type: "error",
      theme: "dark",
    });
    return;
  }

  const breakSettingObject = {
    breakStartingDate: breakObject.breakStartingDate,
    breakEndingDate: breakObject.breakEndingDate,
    breakTitle: breakObject.breakTitle,
  };

  updateBreakDaysArray(breakSettingObject).then(() => {
    dispatch(addBreakObject(breakSettingObject));
    emmitToast(toastObject.toastString, {
      ...toastObject.toastOptions,
    });
  });
};

//Get Break days
const getBreakDays = (dispatch) => {
  const classSetupRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/breakDaysArray"
  );

  onValue(classSetupRef, (snapshot) => {
    const breakDaysArray = Object.values(snapshot.val());
    console.log(breakDaysArray);

    dispatch(setFetchedBreakDays(breakDaysArray));
  });
};

// Set passed and future break days
const setPassedAndFutureBreakDays = (breakDaysArray) => {
  const passedHolidaysArray = [];
  const futureHolidaysArray = [];

  breakDaysArray.forEach((breakObject, index) => {
    if (
      new Date(breakObject.breakStartingDate).valueOf() < new Date().valueOf()
    ) {
      passedHolidaysArray.push(breakObject);
    }

    if (
      new Date(breakObject.breakStartingDate).valueOf() > new Date().valueOf()
    ) {
      futureHolidaysArray.push(breakObject);
    }
  });

  return { passedHolidaysArray, futureHolidaysArray };
};

// Calculate program duration month(s)
const calcProgramDurationMonth = (programStartingDate, programEndingDate) => {
  const yearDifference =
    new Date(programEndingDate).getFullYear() -
    new Date(programStartingDate).getFullYear();

  const monthsDifference =
    new Date(programEndingDate).getMonth() -
    new Date(programStartingDate).getMonth();

  const programMonths = yearDifference * 12 + monthsDifference;

  return programMonths;
};

// Clear clockins in admin dashboard
const clearStudentsClockins = () => {
  const clockinsRef = ref(rdb, "admindashboard/clockInList");

  remove(clockinsRef);
};

export {
  updateProgramStartingDate,
  updateProgramEndingDate,
  updateEarlinessTimeDuration,
  updateProgramDurationSettings,
  updateLatenessTimeFrame,
  updateLectureDays,
  setBreakDays,
  emmitToast,
  calcProgramDurationMonth,
  clearStudentsClockins,
  getBreakDays,
  setPassedAndFutureBreakDays,
};
