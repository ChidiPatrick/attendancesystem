import React, { useRef, useState } from "react";

// Third-pary imports
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedPermissionRequest } from "../../../Redux Slices/permission.slice";

function NotificationBar({
  width,
  backgroundColor,
  padding,
  fontSize,
  keyIndex,
  permissionObject,
}) {
  const dispatch = useDispatch();

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
    (state) => state.permissionSlice.selectPermissionRequest
  );

  console.log(studentsBioArray);
  console.log(selectedPermissionRequest);

  // Handle Toggling
  const toggleUI = (e) => {
    if (e.target.id === "popUpWrapper" || e.target.id === "icon") {
      const selectedPermissionRequestObject =
        permissionsArray[parseFloat(e.target.parentElement.id)];

      dispatch(setSelectedPermissionRequest(selectedPermissionRequestObject));

      setShowShortcut(!showShortcut);
    }
  };

  const openPermissionRequest = (e) => {
    // const selectedPermissionRequestObject =
    //   permissionsArray[parseFloat(e.target.parentElement.id)];

    // dispatch(setSelectedPermissionRequest(selectedPermissionRequestObject));
    console.log("Clicked");
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
      id="parent"
      onClick={openPermissionRequest}
      className={`w-[${width}]  z-1000 relative my-[10px] text-[${fontSize}] flex items-center bg-[${backgroundColor}] p-[${padding}] border border-transparent rounded-md`}
    >
      <div className="w-[100%]">
        <div className="font-bold flex justify-between items-center mb-[10px]">
          <figure className="w-[20px] h-[20px] mr-[4px] border border-transparent rounded-full bg-gray-600"></figure>
          <div
            id={`${keyIndex}`}
            className="flex justify-between items-center  w-[94%]"
          >
            <span>{permissionObject.name}</span>
            <HiDotsVertical onClick={(e) => toggleUI(e)} id="icon" />
          </div>
        </div>
        <div
          ref={permissionRef}
          className="flex justify-between items-center w-[100%]"
        >
          <div id={`${keyIndex}`} className="font-semibold">
            Permission Request
          </div>
          <span className="text-lp-primary font-semibold">
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
          <Link to="#" className="p-[10px]">
            View profile
          </Link>
          <button onClick={() => getStudentsBio()} className="p-[10px]">
            Approve
          </button>
          <button className="p-[10px]">Deny</button>
          <button className="p-[10px]">View Details</button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default NotificationBar;
