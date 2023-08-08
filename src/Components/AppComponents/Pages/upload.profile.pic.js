import React, { useState } from "react";

/// Third-party imports ///
import { useDispatch, useSelector } from "react-redux";

/// Local directory imports ///
import NavBar from "./navBar";
import Menu from "./menu";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/firebase";
import { firestoreRefCreator } from "../../General app handlers/general.handlers";
import { setProfilePictureUrl } from "../../Redux Slices/profileSlice";
import { useNavigate } from "react-router";
import { updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { GetUserProfile } from "../../Redux Slices/profileSlice";
import {
  showSpinner,
  hideSpinner,
  showNetworkFeedback,
} from "../../Redux Slices/signupSlice";
import NetworkFeedback from "../Modal/networkFeedback";

/// Main component ////
function UploadProfilePicture() {
  const dispatch = useDispatch();
  const navigate = useNavigate;

  /// Redux states ///
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const userId = useSelector((state) => state.loginSlice.userId);
  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );
  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );

  console.log(displayNetWorkFeedback);
  /// Local states ////
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isVisible, setVisible] = useState(false);

  /// File change handler ////
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setVisible(true);
  };

  const updateProfilePictureURL = async (profilePictureURL, userId) => {
    const userProfileRef = firestoreRefCreator(
      db,
      userId,
      "userProfileCollection",
      "profileDocument"
    );

    const data = {
      profilePictureURL: profilePictureURL,
    };

    try {
      await updateDoc(userProfileRef, data)
        .then(() => {
          dispatch(GetUserProfile(userId));
        })
        .then(() => {
          navigate("/home");
        });
    } catch (err) {
      dispatch(showNetworkFeedback());
    }
  };

  /// File upload handlers /////
  const handleUpload = (e) => {
    if (!navigator.onLine) {
      dispatch(showNetworkFeedback());
      return;
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadObject = uploadBytesResumable(storageRef, file);

    uploadObject.on(
      "state_changed",
      (snapshot) => {
        const Percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress ///
        setUploadPercentage(Percentage);
      },

      // Handle error //
      (err) => console.log(err),

      // download url
      () => {
        getDownloadURL(uploadObject.snapshot.ref).then((url) => {
          // Update database redux store //
          updateProfilePictureURL(url, userId);
          dispatch(setProfilePictureUrl(url));
          setVisible(false);
        });
      }
    );
  };

  return (
    <div className="w-full relative h-screen bg-user-profile p-4">
      <div className="flex justify-end items-center">
        {isVisible === true ? (
          <button
            onClick={handleUpload}
            className="w-[100px] border rounded-md border-lp-secondary p-1 text-lp-secondary"
          >
            Upload
          </button>
        ) : null}
      </div>
      <div className="my-[100px] flex flex-col justify-center items-center">
        <h3 className="font-bold text-xl my-5">Set Profile Picture</h3>
        <p className="text-center">
          Please upload a clear picture of you for your profile
        </p>

        <div className={`my-10 flex items-center`}>
          <div
            className={`w-[${uploadPercentage}px] mr-2 bg-lp-secondary text-lp-primary h-[10px] border rounded-xl`}
          ></div>
          <div className="">
            {uploadPercentage > 0
              ? uploadPercentage < 100
                ? `${uploadPercentage}%...`
                : `${uploadPercentage}%`
              : null}
          </div>
        </div>
        <div className="w-full flex justify-between items-center my-20">
          <label
            className="w-[80%] my-0 mx-auto bg-lp-secondary border rounded-xl flex justify-center items-center text-white p-2"
            htmlFor="inputFile"
          >
            Select picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="inputFile"
          />
        </div>
      </div>
      {displayMenu === true ? <Menu /> : null}
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
    </div>
  );
}

export default UploadProfilePicture;
