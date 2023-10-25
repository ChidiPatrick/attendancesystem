import React from "react";

//// Third-party Imports //////////////
import { useDispatch, useSelector } from "react-redux";
import { HiArrowNarrowRight } from "react-icons/hi";
import { updatePermissionStatus } from "../admin dashboard handlers/admin.announcement.handler";

//////////////// Permission Request UI //////////////////
function RequestDisplayUI() {
  const dispatch = useDispatch();

  const selectedPermissionRequest = useSelector(
    (state) => state.permissionSlice.selectedPermissionRequest
  );

  console.log(selectedPermissionRequest);

  return (
    <div className="w-[70%] mx-auto p-[10px] overflow-auto min-h-[250px] border mb-[20px] rounded-xl bg-[#FBFCFE] shadow-md">
      <h4 className="flex justify-between items-center">
        <span className="font-bold text-[18px]">
          Permission to be {selectedPermissionRequest?.permissionType}
        </span>
        <span className="text-gray-500 font-bold">
          {selectedPermissionRequest?.dateSent}
        </span>
      </h4>
      <p className="mt-[20px] ">{selectedPermissionRequest?.permissionBody}</p>
      <div className="mt-[20px] flex justify-between items-center">
        <span className="text-black font-semibold">Duration</span>
        <div className="text-[14px]  w-[40%] flex justify-between items-center text-gray-800">
          {selectedPermissionRequest?.startingDate} <HiArrowNarrowRight />
          {selectedPermissionRequest?.endingDate}
        </div>
      </div>
      <div className="mt-[20px] flex justify-between items-center">
        <span className="text-black font-semibold">Status</span>
        <span className="text-[18px] font-semibold text-lp-secondary w-[47%] flex justify-end items-center">
          {selectedPermissionRequest?.status}
        </span>
      </div>
      <div className="text-white font-semibold flex justify-center items-center">
        <button
          onClick={() =>
            updatePermissionStatus(selectedPermissionRequest, "Approved")
          }
          className="w-[150px] hover:bg-[#113480] p-[10px] mr-[20px] border border-transparent bg-lp-primary rounded-md my-[20px]"
        >
          Accept
        </button>
        <button
          onClick={() =>
            updatePermissionStatus(selectedPermissionRequest, "Denied")
          }
          className="w-[150px] hover:bg-[#cc7212] p-[10px] border border-transparent bg-lp-secondary rounded-md my-[20px]"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

export default RequestDisplayUI;
