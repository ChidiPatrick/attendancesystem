import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideRequestResponseUI } from "../../Redux Slices/permission.slice";

function StudentPermissionResponseUI() {
  const dispatch = useDispatch();

  //Redux states
  const permissionsObject = useSelector(
    (state) => state.permissionSlice.studentUISelectedPermissionObject
  );

  return (
    <div
      // onClick={() => dispatch(hideRequestResponseUI())}
      className="w-screen h-full absolute top-0 left-0 backdrop-blur-sm  flex justify-center items-center"
    >
      <div className="p-[10px] flex flex-col justify-between w-[80%] md:w-[60%] mx-auto border border-transparent rounded-md h-[300px]  bg-gray-300 overflow-y-scroll">
        <div className="bg-[#F6F9FE]  px-[10px] h-[40%] overflow-y-scroll">
          <div className="font-bold text-lp-primary">Sent request</div>
          <p className="h-[50%] ">{permissionsObject.permissionBody}</p>
          <p
            className={
              permissionsObject.status === "Approved"
                ? `text-green-400 font-semibold`
                : `text-red-600 font-bold`
            }
          >
            <span className="text-black font-bold">Status:</span>{" "}
            {permissionsObject.status}
          </p>
        </div>
        {permissionsObject.status === "Approved" ? null : (
          <div className="bg-[#F6F9FE]  px-[10px] h-[40%] overflow-y-scroll">
            <div className="font-bold text-lp-primary">Admin's response</div>
            <p className="h-[50%] ">{permissionsObject.responseBody}</p>
          </div>
        )}
        <div className="">
          <button
            className="w-[100%] p-[10px] border border-transparent bg-lp-secondary rounded-md text-white font-bold"
            onClick={() => dispatch(hideRequestResponseUI())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentPermissionResponseUI;
