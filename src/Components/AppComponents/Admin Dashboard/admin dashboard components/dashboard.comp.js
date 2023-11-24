import React, { useEffect } from "react";

//Third-party imports
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { BsCalendar4 } from "react-icons/bs";

//Local Imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import SummaryBox from "./summary.box";
import { useDispatch, useSelector } from "react-redux";
import AttendanceDisplayUI from "./attendance.display.UI";
import {
  loopDate,
  calcProgramDaysUsed,
  getPermissionRequests,
} from "../admin dashboard handlers/dashboard.summary.comp";
import { getStudentsNumber } from "../admin dashboard handlers/admin.handlers";
import NotificationBar from "./notification.bar";
import { ToastContainer } from "react-toastify";
import AreaCharts from "./area.charts";
import TimeDistributionGraph from "./time.distribution.graph";
import PermissionModal from "./permission.modal";
import DenyReequestUI from "./deny.request.UI";
import StudentsBio from "./students.bio";

/**
 * Modify announcement UI component such that sent announcements appears great
 * Implement permission notification in student's app
 * Add links to all the icons on the navigation UI
 * Link class setup settings with student's app
 * Make the permission display UI to be accessible anywhere the permission UI is
 * Modify admin profile picture uploading UI
 *
 */

function DashboardComponent() {
  const dispatch = useDispatch();

  // Redux  states
  const programDurationStartDate = useSelector(
    (state) => state.classSetupSlice.programDurationStartDate
  );
  const programDurationEndDate = useSelector(
    (state) => state.classSetupSlice.programDurationEndDate
  );
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const showPermissionModal = useSelector(
    (state) => state.permissionSlice.displayPermissionModal
  );

  const adminBioObject = useSelector((state) => state.adminSlice.adminData);

  const selectedPermissionRequest = useSelector(
    (state) => state.permissionSlice.selectedPermissionRequest
  );

  const displayPermissionDenialUI = useSelector(
    (state) => state.permissionSlice.displayPermissionDenialUI
  );

  useEffect(() => {
    getPermissionRequests(dispatch);
    console.log(
      calcProgramDaysUsed(
        new Date(programDurationStartDate),
        new Date(),
        new Date(programDurationEndDate)
      )
    );
  }, []);

  return (
    <div className="w-full p-[10px] relative flex min-h-screen  bg-[#F7F7F7]">
      <div className="w-full min-h-screen bg-user-profile">
        <DashboardNavigationComponent title="Dashboard" />
        <div className="w-full flex justify-between p-[10px] mt-[20px]">
          <div className="w-full flex justify-between items-center">
            <SummaryBox
              bgValue="bg-[#2926B8]"
              title="Total Students"
              IconName={HiOutlineAcademicCap}
              number={getStudentsNumber() === "" ? 0 : getStudentsNumber()}
              valueIdentifier="Students"
            />
            <SummaryBox
              bgValue="bg-[#326EB5]"
              title="Time Used"
              IconName={BsCalendar4}
              number={calcProgramDaysUsed(
                new Date(programDurationStartDate),
                new Date(),
                new Date(programDurationEndDate)
              )}
              valueIdentifier="working days used"
            />
            <SummaryBox
              bgValue="bg-[#21938C]"
              title="Session Duration"
              IconName={BsCalendar4}
              number={loopDate(
                new Date(programDurationStartDate),
                new Date(programDurationEndDate)
              )}
              valueIdentifier="Working days"
            />
          </div>
          <ToastContainer style={{ width: "100%", textAlign: "center" }} />
          {/* <div className="w-[15%] h-[200px] bg-[#FBFCFE] shadow-md border border-tranparent rounded-md">
            <h3 className="text-center text-black p-[10px]">Daily six</h3>
            <div className="grid grid-cols-2 w-[80%] mx-auto justify-items-center">
              <figure className="w-[40px] h-[40px] border rounded-full">
                <img
                  src="/images/skalo.jpg"
                  className="w-[100%] h-[100%] border rounded-full"
                />
              </figure>
              <figure className="w-[40px] h-[40px] border rounded-full">
                <img
                  src="/images/skalo.jpg"
                  className="w-[100%] h-[100%] border rounded-full"
                />
              </figure>
            </div>
          </div> */}
        </div>
        <div className="flex justify-between items-center p-[10px]">
          <div className="bg-white  w-[60%] p-[15px] h-[300px] border rounded-md flex flex-col items-center justify-center">
            <div className="w-[100%] flex justify-between items-center">
              <div>Attendance Summary</div>
              <div className="text-lp-secondary">This week</div>
            </div>
            <AreaCharts />
          </div>
          <div className="bg-white w-[38%] p-[15px] h-[300px] border rounded-md flex items-center flex-col justify-center">
            <div className="w-[100%] flex justify-between items-center">
              <div>Time distribution</div>
              <div className="text-lp-secondary">This week</div>
            </div>
            <TimeDistributionGraph />
          </div>
          {/* <StudentsInclass /> */}
        </div>
        <div className="flex just-between mt-[30px] px-[10px]">
          <AttendanceDisplayUI />
          <div className="bg-[#fff] p-[10px] w-[35%] ml-[20px] h-[380px] border rounded-[10px] overflow-y-scroll">
            <h3 className="text-center font-bold text-lp-primary border border-transparent border-b-lp-secondary">
              Permission Requests
            </h3>
            {permissionsArray.map((permissionObject, index) => {
              return (
                <div key={index}>
                  <NotificationBar
                    permissionObject={permissionObject}
                    width="100%"
                    backgroundColor="#F6F9FE"
                    padding="5px"
                    fontSize="12px"
                    keyIndex={index}
                    isNotified={permissionObject.isNotified}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {displayPermissionDenialUI === true ? (
        <DenyReequestUI
          permissionRequest={selectedPermissionRequest}
          response="Denied"
          adminBioObject={adminBioObject}
        />
      ) : null}
      {showPermissionModal === true ? <PermissionModal /> : null}
    </div>
  );
}

export default DashboardComponent;
