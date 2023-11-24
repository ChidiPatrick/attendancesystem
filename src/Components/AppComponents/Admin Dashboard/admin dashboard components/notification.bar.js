import React, { useRef, useState } from "react";

// Third-pary imports
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedPermissionRequest,
  showPermissionDenialUI,
  showPermissionModal,
} from "../../../Redux Slices/permission.slice";
import { updatePermissionStatus } from "../admin dashboard handlers/admin.announcement.handler";
import { setSelectedStudent } from "../../../Redux Slices/adminStudentsSlice";
import { setCurrStudentPermissionRequests } from "../admin dashboard handlers/admin.handlers";
import { getCurrStudentAttendanceArray } from "../admin dashboard handlers/admin.attendance.report.handlers";
import { setStudentGraphArray } from "../admin dashboard handlers/graph.handlers";
import DenyReequestUI from "./deny.request.UI";
/**
 *# Create a function to dispatch selected student's requests array
 *# Implement routing to student's profile to complete and populate the students profile UI with the students data
 *# Complete the student's permissions algorithm you were working on
 *  Finish up the student's profile algorithm
 */

function NotificationBar({
  width,
  backgroundColor,
  padding,
  fontSize,
  keyIndex,
  permissionObject,
  isNotified,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local states
  const [showShortcut, setShowShortcut] = useState(false);

  const permissionRef = useRef();

  ///////// Redux states //////////////////////////
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

  const displayPermissionDenialUI = useSelector(
    (state) => state.permissionSlice.displayPermissionDenialUI
  );

  //View student's profile handler
  const setStudentProfile = (
    studentsBioArray,
    permissionsArray,
    attendanceArray,
    studentId,
    dispatch
  ) => {
    console.log("First");

    const studentProfileObject = studentsBioArray.find(
      (studentBioObject) => studentBioObject.userId === studentId
    );

    dispatch(setSelectedStudent(studentProfileObject));

    setStudentGraphArray(attendanceArray, studentId, dispatch);

    getCurrStudentAttendanceArray(attendanceArray, dispatch, studentId);

    setCurrStudentPermissionRequests(permissionsArray, studentId, dispatch);

    setShowShortcut(!showShortcut);

    navigate("/adminStudentProfile");
  };

  // Permission UI Toggling handler
  const toggleUI = (e) => {
    if (e.target.id === "popUpWrapper" || e.target.id === "icon") {
      console.log(e);
      const selectedPermissionRequestObject =
        permissionsArray[parseFloat(e.target.parentElement.id)];

      dispatch(setSelectedPermissionRequest(permissionObject));

      setShowShortcut(!showShortcut);
    }
  };

  const openPermissionRequest = (e) => {
    dispatch(setSelectedPermissionRequest(permissionObject));
    dispatch(showPermissionModal());
  };

  return (
    <div
      // onClick={}
      key={keyIndex}
      className={`w-[${width}]  z-1000 relative my-[10px] text-[${fontSize}] flex items-center bg-[${backgroundColor}] p-[${padding}] border border-transparent rounded-md`}
    >
      <div className={`w-[100%] bg-[${backgroundColor}]`}>
        <div className="font-bold flex justify-between items-center mb-[10px]">
          <figure
            id={`${keyIndex}`}
            onClick={openPermissionRequest}
            className={
              isNotified === true
                ? `w-[10px] h-[10px] mr-[4px] border border-transparent rounded-full  bg-green-200
              `
                : "w-[10px] h-[10px] mr-[4px] border border-transparent rounded-full bg-[#CC0000] animate-pulse"
            }
          ></figure>
          <div className="flex justify-between items-center  w-[94%]">
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
        <div className="w-[100%] flex justify-end items-center">
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
                clockinList,
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
                adminBioObject,
                dispatch
              )
            }
            className="p-[10px]"
          >
            Approve
          </button>
          <button
            onClick={() => dispatch(showPermissionDenialUI())}
            className="p-[10px]"
          >
            Deny
          </button>
          <button
            onClick={() => dispatch(showPermissionModal())}
            className="p-[10px]"
          >
            View Details
          </button>
        </div>
      </div>
      {/* {displayPermissionDenialUI === true ? (
        <DenyReequestUI
          permissionRequest={selectedPermissionRequest}
          response="Denied"
          adminBioObject={adminBioObject}
        />
      ) : null} */}
    </div>
  );
}

export default NotificationBar;
