// Third-party imports
import { update, ref } from "firebase/database";

// Local directory imports
import { rdb } from "../../../Firebase/firebase";

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

  update(lectureDaysArrayRef, lectureDaysAarray);
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

export {
  updateProgramStartingDate,
  updateProgramEndingDate,
  updateEarlinessTimeDuration,
  updateProgramDurationSettings,
  updateLatenessTimeFrame,
};
