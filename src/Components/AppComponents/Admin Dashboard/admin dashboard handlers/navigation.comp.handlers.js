// Local directory imports
import { setSearchBoxDataArray } from "../../../Redux Slices/adminSlice";
import { setSelectedStudent } from "../../../Redux Slices/adminStudentsSlice";
import { setStudentGraphArray } from "./graph.handlers";
import { getCurrStudentAttendanceArray } from "./admin.attendance.report.handlers";
import { setCurrStudentPermissionRequests } from "./admin.handlers";

// TODOs:
// 1. Find out why student's graph is not updating

// Get student names array for searchbox component
const getStudentsNameArray = (studentsBioArray, dispatch) => {
  const searchBoxDataArray = studentsBioArray.map((studentsBioObject) => {
    return {
      key: studentsBioObject.firstName,
      value: `${studentsBioObject.firstName} ${studentsBioObject.lastName}`,
      userId: studentsBioObject.userId,
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
  const execPromise = Promise.resolve("Done");
  console.log(studentId);

  execPromise
    .then(() => {
      const studentProfileObject = studentsBioArray.find(
        (studentBioObject) => studentBioObject.userId === studentId
      );

      return studentProfileObject;
    })
    .then((studentProfileObject) => {
      console.log(studentProfileObject);
      dispatch(setSelectedStudent(studentProfileObject));
    })

    .then(() => {
      setStudentGraphArray(attendanceArray, studentId, dispatch);
    })

    .then(() => {
      getCurrStudentAttendanceArray(attendanceArray, dispatch, studentId);
    })

    .then(() => {
      setCurrStudentPermissionRequests(permissionsArray, studentId, dispatch);
    })

    .then(() => {
      navigate("/adminStudentProfile");
    });
};

export { getStudentsNameArray, setStudentProfile };
