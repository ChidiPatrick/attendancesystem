import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uploadProfilePicture } from "../admin dashboard handlers/admin.edit.handler";

function ProfilePictureUI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local states
  const [file, setFile] = useState(null);

  // File change handler
  const handleFileSelection = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-user-profile">
      <figure className="w-[300px] p-[10px] relative h-[400px] border-[3px] rounded-md border-gray-300  bg-gray-100">
        <div className="w-[100%] h-[300px] ">
          <label
            htmlFor="inputFile"
            className="w-[100%] relative  block h-[100%] border-[2px] border-dashed border-lp-secondary"
          >
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              Tap to select image
            </div>
          </label>
          <input
            id="inputFile"
            onChange={handleFileSelection}
            className="hidden"
            type="file"
          />
        </div>

        {/* <img className="w-[100%] h-[70%]" src="" /> */}
        <div className="w-[100%] absolute top-[80%] left-0 flex justify-between items-center p-[10px]">
          <button
            onClick={() => uploadProfilePicture(file)}
            className="p-[10px] w-[120px] border border-transparent rounded-lg bg-lp-secondary text-white font-bold"
          >
            Upload
          </button>
          <button
            // onClick={}
            className="p-[10px] border-[2px] rounded-lg w-[120px] border-lp-secondary text-lp-secondary"
          >
            Cancle
          </button>
        </div>
      </figure>
    </div>
  );
}

export default ProfilePictureUI;
