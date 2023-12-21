// Third-party imports
import { onValue } from "firebase/database";
import { ref } from "firebase/database";

// Local directory imports
import { setStudentBioArray } from "../../Redux Slices/studentsSlice";
import { rdb } from "../../Firebase/firebase";

// Get students bio array from database
const getStudentsBioArrayFromDatabase = (dispatch, studentID) => {
  const studentsBioArrayRef = ref(rdb, "admindashboard/studentsBio");

  onValue(studentsBioArrayRef, (snapshot) => {
    const studentsBioArray = Object.values(snapshot.val());
    dispatch(setStudentBioArray(studentsBioArray));
  });
};

export { getStudentsBioArrayFromDatabase };
