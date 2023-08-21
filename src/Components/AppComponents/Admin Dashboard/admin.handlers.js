import { getDoc } from "firebase/firestore";
import { firestoreAdminRefCreatore } from "../../General app handlers/general.handlers";
import { db } from "../../Firebase/firebase";

// Get students bio array from admin collection
const getStudentsArray = async (userId) => {
  const studentsBioArrayRef = firestoreAdminRefCreatore(db, userId);

  const studentsBioArray = await getDoc(studentsBioArrayRef);

  if (studentsBioArray.exists()) {
    console.log(studentsBioArray.data().studentsArray);

    return studentsBioArray.data().studentsArray;
  }
};

export { getStudentsArray };
