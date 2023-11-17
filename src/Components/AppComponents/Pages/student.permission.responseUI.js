import React from "react";
import { useDispatch } from "react-redux";
import { hideRequestResponseUI } from "../../Redux Slices/permission.slice";

function StudentPermissionResponseUI() {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(hideRequestResponseUI())}
      className="w-screen h-full absolute top-0 left-0 backdrop-blur-sm bg-white flex justify-center items-center"
    >
      <div className=" w-[80%] md:w-[60%] mx-auto border border-transparent rounded-md h-[300px] bg-green-400 overflow-y-scroll"></div>
    </div>
  );
}

export default StudentPermissionResponseUI;
