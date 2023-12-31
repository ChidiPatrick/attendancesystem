import React from "react";

//Third-party imports
import { useDispatch, useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import { updatePermissionNotification } from "../Handlers/permission.handler";

function StudentNotificationBar({ permissionObject, index }) {
  const dispatch = useDispatch();

  // Redux states
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );
  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  // View permission reponse
  return (
    <div
      key={index}
      onClick={() =>
        updatePermissionNotification(
          permissionsArray,
          index,
          dispatch,
          studentsBioArray
        )
      }
      className="w-[100%] mb-[10px] p-[10px] bg-[#F6F9FE]"
    >
      <h3 className="p-[4px] text-lp-primary font-semibold">
        Permission Request
      </h3>

      <div className="flex justify-between items-center">
        {permissionObject.isNotified === false &&
        permissionObject.status !== "Pending" ? (
          <div className="w-[20px] h-[20px] p-[2px]  animate-pulse bg-lp-secondary border border-transparent rounded-full flex justify-center items-center">
            <IoNotificationsOutline
              className={`text-[20px] text-white `}
              size={20}
            />
          </div>
        ) : null}

        <div className="p-[10px] w-[90%] flex justify-between items-center">
          <p>
            {permissionObject.status === "Pending"
              ? "Pending"
              : "View response"}
          </p>
          <div className="font-semibold">
            {new Date(permissionObject.dateSent).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentNotificationBar;
