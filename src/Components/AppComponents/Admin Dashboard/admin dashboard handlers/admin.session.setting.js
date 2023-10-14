// Third-party imports
import { update, ref } from "firebase/database";

// Local directory imports
import { rdb } from "../../../Firebase/firebase";

///////////////////////////////////////////////////////////////////
// PROGRAM DURATION UPDATING HANDLERS
const updateProgramStartingDate = (date, dispatch) => {
  const programStartingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programStartingDate"
  );

  update(programStartingRef, { date });
};

const updateProgramEndingDate = (endDate, dispatch) => {
  const programEndingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  update(programEndingRef, { endDate });
};

///////////////////////////////////////////////////////////////////

// EARLINESS TIME UPDATING HANDLERS
const updateEarlinessStartingTime = (startTime, dispatch) => {
  const earlinessStartingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessStartingTime"
  );

  update(earlinessStartingTimeRef, { startTime });
};

const updatingEarlinessEndTime = (endTime, dispatch) => {
  const earlinessEndingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessEndingTime"
  );

  update(earlinessEndingTimeRef, { endTime });
};

//////////////////////////////////////////////////////////////////

// LATENESS TIME UPDATING HANDLERS
const updateLatenessStartTime = (startTime, dispatch) => {
  const latenessStartTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/latenessStartingTime"
  );

  update(latenessStartTimeRef, { startTime });
};

////////////////////////////////////////////////////////////////////////////

//SETTING UPDATING INITIATORS

//Program duration updating handler
const updateProgramDurationSettings = async (settingsObject, dispatch) => {
  if (settingsObject.sessionDuration.startDate !== "") {
    updateProgramStartingDate(
      settingsObject.sessionDuration.startDate,
      dispatch
    );
  }

  if (settingsObject.sessionDuration.endDate !== "") {
    updateProgramEndingDate(settingsObject.sessionDuration.endDate, dispatch);
  }
};

//Lateness duration updating handler
const updateEarlinessTimeDuration = async (settingsObject, dispatch) => {
  if (settingsObject.earlyTimeFrame.startTime !== "") {
    updateEarlinessStartingTime(
      settingsObject.earlyTimeFrame.startTime,
      dispatch
    );
  }

  if (settingsObject.earlyTimeFrame.endTime !== "") {
    updatingEarlinessEndTime(settingsObject.earlyTimeFrame.endTime, dispatch);
  }
};

//Lateness duration updating handler
const updateLatenessTimeFrame = async (settingsObject, dispatch) => {
  updateLatenessStartTime(settingsObject.latenessTimeFrame.startTime, dispatch);
};

export {
  updateProgramStartingDate,
  updateProgramEndingDate,
  updateEarlinessTimeDuration,
  updateProgramDurationSettings,
  updateLatenessTimeFrame,
};
