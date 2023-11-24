import React, { useRef, useState } from "react";
import { hidePermissionDenialUI } from "../../../Redux Slices/permission.slice";
import { useDispatch } from "react-redux";
import { updatePermissionStatus } from "../admin dashboard handlers/admin.announcement.handler";
import customCss from "../../../Custom CSS/admin.profile.css";

function DenyReequestUI({ permissionRequest, response, adminBioObject }) {
  const dispatch = useDispatch();

  const textRef = useRef();

  //Local states
  const [permissionDenialResponseBody, setPermissionDenialResponseBody] =
    useState("");

  const closeUI = (e) => {
    console.log(e);
    if (e.target.id === "denialUI") {
      dispatch(hidePermissionDenialUI());
    }
  };

  return (
    <div
      onClick={closeUI}
      id="denialUI"
      className="requestDenialUI w-full absolute top-[50%] left-0 min-h-screen flex justify-center items-center"
    >
      <div className="w-[400px]  h-[350px]  border-[1px] border-gray-200 rounded-md bg-white p-[10px]">
        <h2 className="text-center font-bold text-[20px]">Deny request</h2>
        <p className="mt-[20px]">
          By proceeding, you will be denying {permissionRequest?.name}{" "}
          permission request
        </p>
        <fieldset className="px-4 my-[20px] border-2 border-solid border-lp-primary rounded py-2">
          <legend className="text-lp-primary">Remark</legend>
          <textarea
            id="lastName"
            className="w-full h-full focus:outline-none"
            type="text"
            placeholder="Leave a message telling the student why his/her request was denied"
            name="lastName"
            ref={textRef}
            onChange={() =>
              setPermissionDenialResponseBody(textRef.current.value)
            }
          />
        </fieldset>
        <div className="w-full mt-[50px] flex justify-between items-center">
          <button
            onClick={() =>
              updatePermissionStatus(
                permissionRequest,
                response,
                adminBioObject,
                dispatch,
                permissionDenialResponseBody
              )
            }
            className="p-[10px] font-bold w-[120px] bg-lp-primary text-white border border-transparent rounded-md"
          >
            Deny
          </button>
          <button
            onClick={() => dispatch(hidePermissionDenialUI())}
            className="p-[10px] font-bold w-[120px] bg-user-profile text-lp-secondary border  border-lp-secondary rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DenyReequestUI;
