import React, { useRef, useState } from "react";

// Third-pary imports
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setSelectedPermissionRequest,
  showPermissionModal,
} from "../../../Redux Slices/permission.slice";
import { updatePermissionStatus } from "../admin dashboard handlers/admin.announcement.handler";
import { setSelectedStudent } from "../../../Redux Slices/adminStudentsSlice";

/**
 * Write a function to dispatch selected student's requests array
 * Implement routing to student's profile to complete and populate the students profile UI with the students data
 *
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
  const studentsBioArray = useSelector(
    (state) => state.adminSlice.studentsBioArray
  );

  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const selectedPermissionRequest = useSelector(
    (state) => state.permissionSlice.selectedPermissionRequest
  );

  const notificationCounter = useSelector(
    (state) => state.announcementSlice.notificationCounter
  );

  const adminBioObject = useSelector((state) => state.adminSlice.adminData);

  const studentsArray = useSelector(
    (state) => state.adminStudentsSlice.studentsBioArray
  );

  //Get student's all time permission requests
  const getCurrStudentPermissions = (permissionsArray, dispatch, studentId) => {
    const studentPermissionsArray = permissionsArray.filter(
      (permissionObject) => permissionObject.userId === studentId
    );
  };

  //View student's profile handler
  const setStudentProfile = (studentsArray, studentId) => {
    const studentProfileObject = studentsArray.find(
      (studentBioObject) => studentBioObject.userId === studentId
    );

    dispatch(setSelectedStudent(studentProfileObject));

    setShowShortcut(!showShortcut);

    navigate("/adminStudentProfile");
  };

  // Handle Toggling
  const toggleUI = (e) => {
    if (e.target.id === "popUpWrapper" || e.target.id === "icon") {
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

  const getStudentsBio = (permissionObject, studentsBioArray) => {
    const studentBio = studentsBioArray.find(
      (studentBioObject) => studentBioObject.userId === permissionObject.userId
    );
  };

  return (
    // <div className="z-1000 relative">
    <div
      key={keyIndex}
      className={`w-[${width}]  z-1000 relative my-[10px] text-[${fontSize}] flex items-center bg-[${backgroundColor}] p-[${padding}] border border-transparent rounded-md`}
    >
      <div className="w-[100%]">
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
              setStudentProfile(studentsArray, permissionObject.userId);
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
          <button className="p-[10px]">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationBar;
