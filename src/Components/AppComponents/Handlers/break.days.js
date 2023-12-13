// Local directory imports
import { setBreakDaysArray } from "../../Redux Slices/attendanceSlice";
import { rdb } from "../../Firebase/firebase";

// Third-party imports
import { onValue, ref } from "firebase/database";
import { toast } from "react-toastify";

// Get holiday / break days
const getBreakDays = (dispatch) => {
  const breakDaysRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/breakDaysArray"
  );

  onValue(breakDaysRef, (snapshot) => {
    const breakDaysArray = Object.values(snapshot.val());

    dispatch(setBreakDaysArray(breakDaysArray));
  });
};

// Loop through holiday dates
const checkHolidayDates = (futureHolidaysArray) => {
  let currDate = new Date().getDate();
  const arrLength = futureHolidaysArray.arrLength;

  for (let i = 0; i < arrLength; i++) {
    const holidayObject = futureHolidaysArray[i];

    let holidayStartDate = new Date(holidayObject.breakStartingDate).getDate();

    let holidatEndDate = new Date(holidayObject.breakEnidngDate).getDate();

    const dateDifference = holidatEndDate - holidayStartDate;

    for (let k = 0; k < dateDifference; k++) {
      if (holidayStartDate === currDate) {
        return true;
      }
      holidayStartDate = holidayStartDate + 1;
    }
  }
};

export { getBreakDays, checkHolidayDates };
