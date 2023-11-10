import React from "react";

//Third-party imports
import { HiArrowNarrowRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

// Local directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import StudentHistoryCard from "./student.history.card";
import { calcProgramDaysUsed } from "../admin dashboard handlers/dashboard.summary.comp";
import {
  calcCurrStudentTotalAttendanceDays,
  calcNumbApprovedRequests,
  calcNumbDaysAbsent,
  calcNumbDaysLate,
  calcNumbDeniedRequests,
} from "../admin dashboard handlers/admin.attendance.report.handlers";
import { setStudentGraphArray } from "../admin dashboard handlers/graph.handlers";
import StudentAttendanceGraph from "./student.attendance.graph";

function AdminStudentProfile() {
  const dispatch = useDispatch();

  /////// Redux states ///////
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const studentProfileObject = useSelector(
    (state) => state.adminStudentsSlice.selectedStudentObj
  );

  const programStartingDate = useSelector(
    (state) => state.classSetupSlice.programDurationStartDate
  );

  const clockinArray = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );

  const studentPermissionRequests = useSelector(
    (state) => state.permissionSlice.currStudentPermissionRequests
  );

  const currStudentAttendanceArray = useSelector(
    (state) => state.attendanceReportSlice.currStudentAttendanceArray
  );

  const userId = useSelector((state) => state.loginSlice.userId);

  setStudentGraphArray(clockinArray, userId, dispatch);

  console.log(permissionsArray);
  console.log(currStudentAttendanceArray);
  console.log(studentPermissionRequests);
  console.log(studentProfileObject);

  return (
    <div className="w-full min-h-screen bg-user-profile p-[10px]">
      <div className="border border-transparent border-b-gray-300">
        <DashboardNavigationComponent title="Student profile" />
      </div>
      <div className="w-full flex justify-center h-screen">
        <div className="w-[50%] h-[100%] overflow-scroll border border-tansparent border-r-gray-300">
          <div className="w-[100%] mx-auto flex flex-col mt-[20px] p-[10px] justify-center items-center">
            <figure className="w-[200px] h-[200px] border-transparent border-solid border-[5px] border-gray-200 rounded-full">
              <img
                src="images/skalo.jpg"
                alt="profile picture"
                className="w-[100%] h-[100%] border border-transparent rounded-full"
              />
            </figure>
            <div className="mb-[5px] mt-[20px] font-bold text-[20px]">
              {`${studentProfileObject?.firstName} ${studentProfileObject?.lastName} (${studentProfileObject?.userName})`}
            </div>
            <div className="mb-[5px] font-bold text-[20px]">
              {studentProfileObject?.tel}
            </div>
            <div className="mb-[5px] font-bold text-[20px] text-lp-primary border border-transparent border-b-lp-primary border-[2px]">
              {studentProfileObject?.email}
            </div>
          </div>
          <div>
            <div className="w-[90%] mx-auto mt-[10px] p-[10px] flex justify-between items-center">
              <StudentHistoryCard title="Days Present" iconName="totalGrad.svg">
                <div className="font-bold text-lp-primary mt-[20px] text-[20px]">
                  <span>
                    {calcCurrStudentTotalAttendanceDays(
                      clockinArray,
                      dispatch,
                      studentProfileObject?.userId
                    ) <= 9
                      ? `0${calcCurrStudentTotalAttendanceDays(
                          clockinArray,
                          dispatch,
                          studentProfileObject?.userId
                        )}`
                      : calcCurrStudentTotalAttendanceDays(
                          clockinArray,
                          dispatch,
                          studentProfileObject?.userId
                        )}{" "}
                    /{" "}
                    {calcProgramDaysUsed(programStartingDate, new Date()) <= 9
                      ? `0${calcProgramDaysUsed(
                          programStartingDate,
                          new Date()
                        )}`
                      : calcProgramDaysUsed(programStartingDate, new Date())}
                  </span>
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard title="Days absent" iconName="absentGrad.svg">
                <div className="flex mt-[20px] justify-between items-center">
                  {/* <div>Days absent</div> */}
                  <div className="font-bold text-lp-primary text-[20px]">
                    {calcNumbDaysAbsent(
                      calcProgramDaysUsed(programStartingDate, new Date()),
                      currStudentAttendanceArray
                    )}
                  </div>
                </div>
                {/* <div className="flex mt-[10px] justify-between items-center">
                  <div>Without permission</div>
                  <div className="font-bold text-lp-primary text-[20px]">0</div>
                </div> */}
              </StudentHistoryCard>
              <StudentHistoryCard title="Late" iconName="lateGrad.svg">
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  {calcNumbDaysLate(currStudentAttendanceArray) <= 9
                    ? `0${calcNumbDaysLate(currStudentAttendanceArray)}`
                    : calcNumbDaysLate(currStudentAttendanceArray)}{" "}
                  / {calcProgramDaysUsed(programStartingDate, new Date())}
                </div>
              </StudentHistoryCard>
            </div>
            <div className="w-[90%] mx-auto mt-[10px] p-[10px] flex justify-between items-center">
              <StudentHistoryCard
                title="Requests sent"
                iconName="requestSent.svg"
              >
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  {studentPermissionRequests.length <= 9
                    ? `0${studentPermissionRequests.length}`
                    : studentPermissionRequests.length}
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard
                title="Request denied"
                iconName="lateGrad.svg"
              >
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  {calcNumbDeniedRequests(studentPermissionRequests) <= 9
                    ? `0${calcNumbDeniedRequests(studentPermissionRequests)}`
                    : calcNumbDeniedRequests(studentPermissionRequests)}
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard
                title="Requests approved"
                iconName="lateGrad.svg"
              >
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  {calcNumbApprovedRequests(studentPermissionRequests) <= 9
                    ? `0${calcNumbApprovedRequests(studentPermissionRequests)}`
                    : calcNumbApprovedRequests(studentPermissionRequests)}
                </div>
              </StudentHistoryCard>
            </div>
          </div>
          <div className="w-[90%] mx-auto p-[10px] mt-[20px] h-[400px] bg-[#FBFCFE] border border-transparent rounded-xl">
            <div className="w-[100%] border border-transparent border-b-gray-400 flex justify-between items-center">
              <div className="w-[50%] py-[10px] font-semibold ">
                Attendance report
              </div>
              <div className="w-[40%] flex justify-end items-center ">
                <button className="text-lp-primary py-[5px] font-semibold ">
                  This week
                </button>
                {/* <button>This Month</button> */}
              </div>
            </div>
            <div className="w-[100%] h-[80%]  mt-[30px] mx-auto font-bold text-[30] text-lp-primary">
              <StudentAttendanceGraph />
            </div>
          </div>
          {/* <div className="p-[10px] mt-[20px]">
            <h3 className="text-[20px] font-bold mb-[20px]">Summary</h3>
            <div className="w-[100%]">
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Session</span>
                <span className="font-bold">87days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Holidays</span>
                <span className="font-bold">7days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Class days</span>
                <span className="font-bold">65days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Number of days present</span>
                <span className="font-bold">87days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Number of days early</span>
                <span className="font-bold">87days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Number of days late</span>
                <span className="font-bold">87days</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className="w-[50%] p-[20px] h-screen overflow-scroll ">
          <h3 className="font-bold text-[20px] py-[10px]">Request History</h3>
          <div>
            {permissionsArray.map((permissionObject, index) => {
              return (
                <div
                  className="w-[100%] p-[10px] overflow-auto h-[250px]  border  border-[2px] mb-[20px] rounded-xl bg-[#FBFCFE] shadow-md"
                  key={index}
                >
                  <h4 className="flex justify-between items-center">
                    <span className="font-bold text-[18px]">
                      Permission to be {permissionObject.permissionType}
                    </span>
                    <span className="text-gray-500 font-bold">
                      {new Date().toDateString()}
                    </span>
                  </h4>
                  <p className="mt-[20px] ">
                    {permissionObject.permissionBody}
                  </p>
                  <div className="mt-[20px] flex justify-between items-center">
                    <span className="text-black ">Duration</span>
                    <div className="text-[14px] font-semibold w-[47%] flex justify-between items-center text-gray-800">
                      {permissionObject.startingDate} <HiArrowNarrowRight />{" "}
                      {permissionObject.endingDate}
                    </div>
                  </div>
                  <div className="mt-[20px] flex justify-between items-center">
                    <span className="text-black font-semibold">Status</span>
                    <span className="text-[18px] font-semibold text-green-500 w-[47%] flex justify-end items-center">
                      {permissionObject.status}
                    </span>
                  </div>
                  {permissionObject.status === "Pending" ? null : (
                    <div className="mt-[20px] flex justify-between items-center">
                      <span className="text-black font-semibold">
                        {permissionObject.status === "Approved"
                          ? "Approved by"
                          : "Denied by"}
                      </span>
                      <span className="text-[18px] font-semibold  w-[47%] flex justify-end items-center">
                        {permissionObject.approvedBy}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStudentProfile;
