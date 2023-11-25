import React, { useRef, useState } from "react";

// Third-party imports
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HiDotsVertical } from "react-icons/hi";

// Local directory imports
import {
  setSelectedPermissionRequest,
  showPermissionModal,
} from "../../../Redux Slices/permission.slice";
import { updatePermissionStatus } from "../admin dashboard handlers/admin.announcement.handler";
import { setSelectedStudent } from "../../../Redux Slices/adminStudentsSlice";
import { setCurrStudentPermissionRequests } from "../admin dashboard handlers/admin.handlers";
import { getCurrStudentAttendanceArray } from "../admin dashboard handlers/admin.attendance.report.handlers";

function AdminNotification({ permissionObject, keyIndex }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // References
  const permissionRef = useRef();

  // Local states
  const [showShortcut, setShowShortcut] = useState(false);

  /// Redux states
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const selectedPermissionRequest = useSelector(
    (state) => state.permissionSlice.selectedPermissionRequest
  );

  const adminBioObject = useSelector((state) => state.adminSlice.adminData);

  const studentsArray = useSelector(
    (state) => state.adminStudentsSlice.studentsBioArray
  );

  const clockinList = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );

  // View student's profile handler
  const setStudentProfile = (
    studentsBioArray,
    permissionsArray,
    studentId,
    dispatch
  ) => {
    const studentProfileObject = studentsBioArray.find(
      (studentBioObject) => studentBioObject.userId === studentId
    );

    dispatch(setSelectedStudent(studentProfileObject));

    getCurrStudentAttendanceArray(clockinList, dispatch, studentId);

    setCurrStudentPermissionRequests(permissionsArray, studentId, dispatch);

    setShowShortcut(!showShortcut);

    navigate("/adminStudentProfile");
  };

  // Permission UI Toggling handler
  const toggleUI = (e) => {
    if (e.target.id === "popUpWrapper" || e.target.id === "icon") {
      const permissionIndex = e.target.parentElement.id;

      dispatch(setSelectedPermissionRequest(permissionsArray[permissionIndex]));

      setShowShortcut(!showShortcut);
    }
  };

  // Open permission Request
  const openPermissionRequest = (e) => {
    const permissionIndex = e.target.id;
    console.log(permissionIndex);

    dispatch(setSelectedPermissionRequest(permissionsArray[permissionIndex]));
    dispatch(showPermissionModal());
  };

  return (
    <div
      key={keyIndex}
      className={`w-[100%]  z-1000 relative my-[10px] text-[16px] flex items-center bg-[#EDEDED] p-[10px] border border-transparent rounded-md`}
    >
      <div className={`w-[100%]`}>
        <div className="font-bold flex justify-between items-center mb-[10px]">
          <figure
            id={`${keyIndex}`}
            onClick={openPermissionRequest}
            className={
              permissionObject.isNotified === true
                ? `w-[10px] h-[10px] mr-[4px] border border-transparent rounded-full  bg-green-200
                    `
                : "w-[10px] h-[10px] mr-[4px] border border-transparent rounded-full bg-[#CC0000] animate-pulse"
            }
          ></figure>
          <div
            id={`${keyIndex}`}
            className="flex justify-between items-center  w-[94%]"
          >
            <span
              className=""
              id={`${keyIndex}`}
              onClick={openPermissionRequest}
            >
              {permissionObject.name}
            </span>
            <HiDotsVertical onClick={(e) => toggleUI(e)} id="icon" />
          </div>
        </div>
        <div
          ref={permissionRef}
          id={`${keyIndex}`}
          onClick={openPermissionRequest}
          className="flex justify-between items-center w-[100%]"
        >
          <div
            id={`${keyIndex}`}
            onClick={openPermissionRequest}
            className="font-semibold"
          >
            Permission Request
          </div>
          <span
            id={`${keyIndex}`}
            onClick={openPermissionRequest}
            className="text-lp-primary font-semibold"
          >
            {permissionObject.time}
          </span>
        </div>
        <div className="w-[100%] flex justify-end">
          {new Date(permissionObject.dateSent).toLocaleDateString()}
        </div>
        <div
          id="popUpWrapper"
          onClick={(e) => toggleUI(e)}
          data-index={keyIndex}
          className={
            showShortcut === true
              ? `flex justify-between z-[2000] flex-col items-start w-[200px] absolute ${
                  keyIndex === 0 ? "top-[20%]" : "top-[-180%]"
                } right-[0] p-[10px] bg-[#f4f4f4] min-h-[100px]`
              : "hidden"
          }
        >
          <button
            onClick={() => {
              setStudentProfile(
                studentsArray,
                permissionsArray,
                permissionObject.userId,
                dispatch
              );
            }}
            className="p-[10px]"
          >
            View profile
          </button>
          <button
            onClick={() =>
              updatePermissionStatus(
                selectedPermissionRequest,
                "Approved",
                adminBioObject
              )
            }
            className="p-[10px]"
          >
            Approve
          </button>
          <button
            onClick={() =>
              updatePermissionStatus(
                selectedPermissionRequest,
                "Denied",
                adminBioObject
              )
            }
            className="p-[10px]"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminNotification;
