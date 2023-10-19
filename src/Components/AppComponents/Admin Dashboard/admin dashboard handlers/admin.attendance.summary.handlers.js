const calcAttendanceSummary = (attendanceArray, totalOnBoardedStudents) => {
  console.log(attendanceArray);

  let numberOfEarlies = 0;
  let numberOfLates = 0;
  let totalStudentsPresent = attendanceArray.length;

  attendanceArray.forEach((attendanceObj) => {
    if (attendanceObj.isOnTime === true) {
      numberOfEarlies = numberOfEarlies + 1;
    } else {
      numberOfLates = numberOfLates + 1;
    }
  });

  const earlyPercentage = (numberOfEarlies / totalStudentsPresent) * 100;
  const latenessPercentage = (numberOfLates / totalStudentsPresent) * 100;
  const presentPercentage =
    (totalStudentsPresent / totalOnBoardedStudents) * 100;

  return [
    earlyPercentage,
    latenessPercentage,
    presentPercentage,
    totalStudentsPresent,
  ];
};

export { calcAttendanceSummary };
