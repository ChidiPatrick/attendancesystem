// Local directory imports
import { setSearchBoxDataArray } from "../../../Redux Slices/adminSlice";
import { setSelectedStudent } from "../../../Redux Slices/adminStudentsSlice";
import { setStudentGraphArray } from "./graph.handlers";
import { getCurrStudentAttendanceArray } from "./admin.attendance.report.handlers";
import { setCurrStudentPermissionRequests } from "./admin.handlers";

// Get student names array for searchbox component
const getStudentsNameArray = (studentsBioArray, dispatch) => {
  const searchBoxDataArray = studentsBioArray.map((studentsBioObject) => {
    return {
      key: studentsBioObject.firstName,
      value: `${studentsBioObject.firstName} ${studentsBioObject.lastName}`,
    };
  });

  dispatch(setSearchBoxDataArray(searchBoxDataArray));
};

// Set up selected student's profile
const setStudentProfile = (
  studentsBioArray,
  permissionsArray,
  attendanceArray,
  studentId,
  dispatch,
  navigate
) => {
  const studentProfileObject = studentsBioArray.find(
    (studentBioObject) => studentBioObject.userId === studentId
  );

  dispatch(setSelectedStudent(studentProfileObject));

  setStudentGraphArray(attendanceArray, studentId, dispatch);

  getCurrStudentAttendanceArray(attendanceArray, dispatch, studentId);

  setCurrStudentPermissionRequests(permissionsArray, studentId, dispatch);

  navigate("/adminStudentProfile");
};

// Get selected student's id
const getSelectedStudentID = (studentName, studentsBioArray) => {
  const firstNameAndLastNameArray = studentName.split(" ");

  //   const studentBioObject = studentsBioArray.filter((bioObject) => {
  //     if (
  //       bioObject.firstName === firstNameAndLastNameArray[0] &&
  //       bioObject.lastName === firstNameAndLastNameArray[1]
  //     ) {
  //       return true;
  //     }
  //   });

  console.log(firstNameAndLastNameArray[0]);
  console.log(firstNameAndLastNameArray[1]);

  studentsBioArray.forEach((item) => {
    console.log(item.firstName === firstNameAndLastNameArray[0]);
    console.log(item.lastName === firstNameAndLastNameArray[1]);
    console.log(item.firstName);
    console.log(firstNameAndLastNameArray[0]);
    console.log(item.lastName);
    console.log(firstNameAndLastNameArray[1]);
  });

  //   console.log(studentBioObject.userId);

  //   return studentBioObject.userId;
};

export { getStudentsNameArray, setStudentProfile, getSelectedStudentID };
