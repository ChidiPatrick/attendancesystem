import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  programDurationStartDate: "",
  programDurationEndDate: "",
  earlinessStartingTime: "",
  earlinessEndingTime: "",
  latenessStartTime: "",
  lectureDays: [],
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
      state.lectureDays.push(action.payload);
      console.log(state.lectureDays);
    },
    removeLectureDay(state, action) {
      const newLectureDays = state.lectureDays.filter(
        (item) => item !== action.payload
      );

      state.lectureDays = newLectureDays;
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
} = classSetupSlice.actions;

export default classSetupSlice.reducer;
