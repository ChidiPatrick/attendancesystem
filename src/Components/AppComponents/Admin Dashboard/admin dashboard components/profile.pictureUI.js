import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  changeProfilePictureHandler,
  uploadProfilePicture,
} from "../admin dashboard handlers/admin.edit.handler";
import { ToastContainer } from "react-toastify";
import { Oval, ColorRing, RotatingLines } from "react-loader-spinner";
import { hideProfilePictureUI } from "../../../Redux Slices/profileSlice";
import { hideSmallSpinner } from "../../../Redux Slices/adminSlice";

function ProfilePictureUI() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local states
  const [file, setFile] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  // Redux states
  const userId = useSelector((state) => state.loginSlice.userId);

  const prevProfilePicturePath = useSelector(
    (state) => state.adminSlice.previousProfilePicturePath
  );

  const adminBioObject = useSelector((state) => state.adminSlice.adminData);

  const displaySmallSpinner = useSelector(
    (state) => state.adminSlice.displaySmallSpinner
  );

  console.log(prevProfilePicturePath);

  // File change handler
  const handleFileSelection = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div className="w-full absolute top-0 left-0 h-screen flex justify-center items-center bg-user-profile">
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

        <ToastContainer style={{ width: "100%", textAlign: "center" }} />

        <div className="w-[100%] absolute top-[80%] left-0 flex justify-between items-center p-[10px]">
          <button
            onClick={() =>
              changeProfilePictureHandler(
                file,
                userId,
                dispatch,
                adminBioObject
              )
            }
            className="p-[10px] w-[120px] flex justify-between items-center border border-transparent rounded-lg bg-lp-secondary text-white font-bold"
          >
            {displaySmallSpinner === true ? (
              <ColorRing
                visible={true}
                height="20"
                width="20"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["blue", "#3570ef", "#214fb1d2"]}
              />
            ) : null}{" "}
            <span className="w-[80%] text-center"> Upload</span>
          </button>
          <button
            onClick={() => {
              dispatch(hideSmallSpinner());
              dispatch(hideProfilePictureUI());
            }}
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
