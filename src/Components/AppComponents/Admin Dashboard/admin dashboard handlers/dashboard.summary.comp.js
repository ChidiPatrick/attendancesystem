import { ref, onValue, getDatabase } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";

// Get total number of students
const getStudentsTotalNumber = async (dispatch) => {
  const totalStudentsRef = ref(rdb, "admindashboard/studentsBio");

  onValue(totalStudentsRef, (snapshot) => {
    const studentsObjectArray = Object.values(snapshot.val());
    console.log(studentsObjectArray);
    return studentsObjectArray.length;
  });
};

export { getStudentsTotalNumber };
