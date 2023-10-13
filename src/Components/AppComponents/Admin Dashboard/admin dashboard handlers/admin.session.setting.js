// Third-party imports
import { update, ref } from "firebase/database";

// Local directory imports
import { rdb } from "../../../Firebase/firebase";
import {
  updateProgramEndingDateState,
  updateProgramStartingDateState,
  updateEarlinessEndTime,
  updateEarlinessStartTime,
  updateLatenessStartingTime,
} from "../../../Redux Slices/adminSlice";

///////////////////////////////////////////////////////////////////
// PROGRAM DURATION UPDATING HANDLERS
const updateProgramStartingDate = (date, dispatch) => {
  const programStartingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programStartingDate"
  );

  return update(programStartingRef, { date }).then(() =>
    dispatch(updateProgramStartingDateState(date))
  );
};

const updateProgramEndingDate = (endDate, dispatch) => {
  const programEndingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  return update(programEndingRef, { endDate }).then(() => {
    dispatch(updateProgramEndingDateState(endDate));
  });
};

///////////////////////////////////////////////////////////////////

// EARLINESS TIME UPDATING HANDLERS
const updateEarlinessStartingTime = (startTime, dispatch) => {
  const earlinessStartingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessStartingTime"
  );

  return update(earlinessStartingTimeRef, { startTime }).then(() => {
    dispatch(updateEarlinessStartTime(startTime));
  });
};

const updatingEarlinessEndTime = (endTime, dispatch) => {
  const earlinessEndingTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/earlinessEndingTime"
  );

  return update(earlinessEndingTimeRef, { endTime }).then(() => {
    dispatch(updateEarlinessEndTime(endTime));
  });
};

//////////////////////////////////////////////////////////////////

// LATENESS TIME UPDATING HANDLERS
const updateLatenessStartTime = (startTime, dispatch) => {
  const latenessStartTimeRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/latenessStartingTime"
  );

  return update(latenessStartTimeRef, { startTime }).then(() => {
    dispatch(updateLatenessStartTime(startTime));
  });
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
