import React, { useState } from "react";

// Third-party imports
import { useSelector } from "react-redux";

/////// LOCAL IMPORTS /////
import {
  addLectureDay,
  removeLectureDay,
} from "../../../Redux Slices/classSetupSlice";

///// Third-party imports

function DaySelector({ children, dispatch }) {
  //// LOCAL STATES
  const [clicked, setClicked] = useState(true);

  //// REDUX STATES
  const leactureDaysArray = useSelector(
    (state) => state.classSetupSlice.lectureDays
  );

  //// Day selection handler /////
  const selectDay = (day) => {
    if (clicked) {
      console.log(day);
      setClicked(false);
      dispatch(addLectureDay(day));
    } else {
      setClicked(true);
      dispatch(removeLectureDay(day));
    }
  };

  return (
    <div
      onClick={() => selectDay(children)}
      className={
        clicked !== true
          ? `w-[70px] flex justify-center border rounded-xl items-center text-white bg-lp-primary h-[40px] p-[10px]`
          : "w-[70px] flex justify-center  bg-gray-300 border border-solid border-gray-600 rounded-xl items-center h-[40px] p-[10px]"
      }
    >
      {children}
    </div>
  );
}

export default DaySelector;
