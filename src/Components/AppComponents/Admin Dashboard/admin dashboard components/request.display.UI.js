import React from "react";

//// Third-party Imports //////////////
import { useDispatch, useSelector } from "react-redux";
import { HiArrowNarrowRight } from "react-icons/hi";

function RequestDisplayUI() {
  const dispatch = useDispatch();

  const selectedPermissionRequest = useSelector(
    (state) => state.permissionSlice.selectPermissionRequest
  );

  console.log(selectedPermissionRequest);

  return (
    <div className="w-[100%] p-[10px] overflow-auto h-[250px] border mb-[20px] rounded-xl bg-[#FBFCFE] shadow-md">
      <h4 className="flex justify-between items-center">
        <span className="font-bold text-[18px]">
          Permission to be {selectedPermissionRequest.permissionType}
        </span>
        <span className="text-gray-500 font-bold">
          {new Date().toDateString()}
        </span>
      </h4>
      <p className="mt-[20px] ">{selectedPermissionRequest.permissionBody}</p>
      <div className="mt-[20px] flex justify-between items-center">
        <span className="text-black font-semibold">Duration</span>
        <div className="text-[18px] font-semibold w-[47%] flex justify-between items-center text-gray-800">
          {selectedPermissionRequest.startingDate} <HiArrowNarrowRight />
          {selectedPermissionRequest.endingDate}
        </div>
      </div>
      <div className="mt-[20px] flex justify-between items-center">
        <span className="text-black font-semibold">Status</span>
        <span className="text-[18px] font-semibold text-lp-secondary w-[47%] flex justify-end items-center">
          {selectedPermissionRequest.status}
        </span>
      </div>
    </div>
  );
}

export default RequestDisplayUI;
