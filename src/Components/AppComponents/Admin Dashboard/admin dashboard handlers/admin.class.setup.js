import { update, ref, onValue } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";

// Local directory imports
import {
  setEarlinessEndingTimeState,
  setEarlinessStartingTimeState,
  setLatenessStartingTimeState,
  setProgramEndingDateState,
  setProgramStartingDateState,
  setLectureDays,
} from "../../../Redux Slices/classSetupSlice";

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

const getClassSetupData = (dispatch) => {
  const classSetupRef = ref(rdb, "admindashboard/classSetupDatabase");

  onValue(classSetupRef, (snapshot) => {
    // dispatch(setEarlinessEndingTimeState);
    const {
      earlinessStartingTime,
      earlinessEndingTime,
      latenessStartingTime,
      programEndingDate,
      programStartingDate,
      lectureDaysArrayRef,
    } = snapshot.val();
    dispatch(setEarlinessStartingTimeState(earlinessStartingTime.startTime));
    dispatch(setEarlinessEndingTimeState(earlinessEndingTime.endTime));
    dispatch(setLatenessStartingTimeState(latenessStartingTime.startTime));
    dispatch(setProgramStartingDateState(programStartingDate.date));
    dispatch(setProgramEndingDateState(programEndingDate.endDate));
    dispatch(setLectureDays(lectureDaysArrayRef.lectureDaysAarray));
  });
};

export {
  updateProgramStartingDate,
  updateProgramEndingDate,
  getClassSetupData,
};
