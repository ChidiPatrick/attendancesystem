import React, { useState } from "react";
import RequestDisplayUI from "./request.display.UI";
import { useDispatch, useSelector } from "react-redux";
import { hidePermissionModal } from "../../../Redux Slices/permission.slice";

function PermissionModal() {
  const dispatch = useDispatch();

  ///////////// Redux states //////////////////////
  const showPermissionModal = useSelector(
    (state) => state.permissionSlice.showPermissionModal
  );

  return showPermissionModal === true ? (
    <div
      onClick={() => dispatch(hidePermissionModal())}
      className="w-full absolute min-h-screen top-[0] left-[0] flex backdrop-blur-sm  justify-center items-center "
    >
      <div className="w-[80%] mx-auto">
        <RequestDisplayUI />
      </div>
    </div>
  ) : null;
}

export default PermissionModal;
