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

  return update(programStartingRef, { date });
};

const updateProgramEndingDate = (date) => {
  const programEndingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  return update(programEndingRef, { date });
};

///////////////////////////////////////////////////////////////////

// EARLINESS TIME UPDATING HANDLERS
const updateEarlinessStartingTime = (startTime) => {
  const earlinessStartingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessStartingTime"
  );

  return update(earlinessStartingTimeRef, { startTime });
};

const updatingEarlinessEndTime = (startTime) => {
  const earlinessEndingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessEndingTime"
  );

  return update(earlinessEndingTimeRef, { startTime });
};

//////////////////////////////////////////////////////////////////

// LATENESS TIME UPDATING HANDLERS
const updateLatenessStartTime = (startTime) => {
  const latenessStartTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/latenessStartingTime"
  );

  return update(latenessStartTimeRef, { startTime });
};

////////////////////////////////////////////////////////////////////////////

//SETTING UPDATING INITIATORS

//Program duration updating handler
const updateProgramDurationSettings = (settingsObject) => {
  if (settingsObject.sessionDuration.startDate !== "") {
    updateProgramStartingDate(settingsObject.sessionDuration.startDate);
  }

  if (settingsObject.sessionDuration.endDate !== "") {
    updateProgramEndingDate(settingsObject.sessionDuration.endDate);
  }
};

//Lateness duration updating handler
const updateEarlinessTimeDuration = (settingsObject) => {
  if (settingsObject.earlyTimeFrame.startTime !== "") {
    updateEarlinessStartingTime(settingsObject.earlyTimeFrame.startTime);
  }

  if (settingsObject.earlyTimeFrame.endTime !== "") {
    updatingEarlinessEndTime(settingsObject.earlyTimeFrame.endTime);
  }
};

//Lateness duration updating handler
const updateLatenessTimeFrame = (settingsObject) => {
  updateLatenessStartTime(settingsObject.latenessTimeFrame.startTime);
};

export {
  updateProgramStartingDate,
  updateProgramEndingDate,
  updateEarlinessTimeDuration,
  updateProgramDurationSettings,
  updateLatenessTimeFrame,
};
