import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  programDurationStartDate: "",
  programDurationEndDate: "",
  earlinessStartingTime: "",
  earlinessEndingTime: "",
  latenessStartTime: "",
  lectureDays: [],
  breakObjects: [],
  breakDaysArray: [],
  passedHolidays: [],
  futureHolidays: [],
};

const classSetupSlice = createSlice({
  name: "classSetupSlice",
  initialState,
  reducers: {
    setProgramStartingDateState(state, action) {
      state.programDurationStartDate = action.payload;
    },
    setProgramEndingDateState(state, action) {
      state.programDurationEndDate = action.payload;
    },
    setEarlinessStartingTimeState(state, action) {
      state.earlinessStartingTime = action.payload;
    },
    setEarlinessEndingTimeState(state, action) {
      state.earlinessEndingTime = action.payload;
    },
    setLatenessStartingTimeState(state, action) {
      state.latenessStartTime = action.payload;
    },
    setLectureDays(state, action) {
      state.lectureDays = action.payload;
    },
    addLectureDay(state, action) {
      const newLectureDaysArray = state.lectureDays.filter(
        (item) => item !== action.payload
      );
      newLectureDaysArray.push(action.payload);
      state.lectureDays = newLectureDaysArray;
    },
    removeLectureDay(state, action) {
      const newLectureDays = state.lectureDays.filter(
        (item) => item !== action.payload
      );

      state.lectureDays = newLectureDays;
    },
    addBreakObject(state, action) {
      state.breakObjects.push(action.payload);
    },
    setFetchedBreakDays(state, action) {
      state.breakDaysArray = action.payload;
    },
    setPassedHolidays(state, action) {
      state.passedHolidays = action.payload;
    },
    setFutureHolidays(state, action) {
      state.futureHolidays = action.payload;
    },
  },
});

export const {
  setEarlinessEndingTimeState,
  setEarlinessStartingTimeState,
  setLatenessStartingTimeState,
  setProgramEndingDateState,
  setProgramStartingDateState,
  setLectureDays,
  addLectureDay,
  removeLectureDay,
  addBreakObject,
  setFetchedBreakDays,
  setPassedHolidays,
  setFutureHolidays,
} = classSetupSlice.actions;

export default classSetupSlice.reducer;
