import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  programDurationStartDate: "",
  programDurationEndDate: "",
  earlinessStartingTime: "",
  earlinessEndingTime: "",
  latenessStartTime: "",
  lectureDays: [],
  breakObjects: [],
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
  },
});

export const {
  setEarlinessEndingTimeState,
  setEarlinessStartingTimeState,
  setLatenessStartingTimeState,
  setProgramEndingDateState,
  setProgramStartingDateState,
  addLectureDay,
  removeLectureDay,
  addBreakObject,
} = classSetupSlice.actions;

export default classSetupSlice.reducer;
