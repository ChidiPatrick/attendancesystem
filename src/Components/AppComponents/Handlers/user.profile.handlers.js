import { onValue, ref } from "firebase/database";
import { rdb } from "../../Firebase/firebase";
import {
  setProgramEndingDate,
  setProgramStartingDate,
} from "../../Redux Slices/login.slice";
import { snapshotEqual } from "firebase/firestore";
import { setStudentNumClockins } from "../../Redux Slices/attendanceSlice";

// Get program starting date from admin database
const getProgramStartingDate = (dispatch) => {
  const programStartingDateRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programStartingDate"
  );

  onValue(programStartingDateRef, (snapshot) => {
    dispatch(setProgramStartingDate(snapshot.val().date));
  });
};

// Get programEndingDate
const getProgramEndingDate = (dispatch) => {
  const programeEndingDateRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  onValue(programeEndingDateRef, (snapshot) => {
    dispatch(setProgramEndingDate(snapshot.val().endDate));
  });
};

// Get student's total clockins
const getTotalClockins = (studentID, dispatch) => {
  const clockinRef = ref(rdb, "admindashboard/clockInList");

  let allClockinArray = [];

  onValue(clockinRef, (snapshot) => {
    allClockinArray = Object.values(snapshot.val());

    const studentClockinArray = allClockinArray.filter(
      (clockObject) => clockObject.userId === studentID
    );

    console.log(studentClockinArray.length);

    dispatch(setStudentNumClockins(studentClockinArray.length));
  });
};

export { getProgramStartingDate, getProgramEndingDate, getTotalClockins };
