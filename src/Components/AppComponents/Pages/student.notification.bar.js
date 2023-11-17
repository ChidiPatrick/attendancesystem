import React from "react";

//Third-party imports
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IoNotificationsOutline } from "react-icons/io5";
import { showRequestResponseUI } from "../../Redux Slices/permission.slice";

function StudentNotificationBar({ permissionObject }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  return (
    <div
      onClick={() => dispatch(showRequestResponseUI())}
      className="w-[100%] mb-[10px] p-[10px] bg-[#F6F9FE]"
    >
      <h3 className="p-[4px] text-lp-primary font-semibold">
        Permission Request
      </h3>
      <div className="flex justify-between items-center">
        <div className="w-[20px] h-[20px] p-[2px]  animate-pulse bg-lp-secondary border border-transparent rounded-full flex justify-center items-center">
          <IoNotificationsOutline
            className={`text-[20px] text-white `}
            size={20}
          />
        </div>

        <p className="p-[10px] w-[90%]">
          {permissionObject.status === "Pending" ? "Pending" : "View response"}
        </p>
      </div>
    </div>
  );
}

export default StudentNotificationBar;
