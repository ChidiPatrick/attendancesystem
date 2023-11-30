import React, { useState } from "react";

/// Third-party imports ///
import { useDispatch, useSelector } from "react-redux";
import { FcCompactCamera } from "react-icons/fc";
import {
  ref as rRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router";
import { updateDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/// Local directory imports ///
import Menu from "./menu";
import { storage } from "../../Firebase/firebase";
import { firestoreRefCreator } from "../../General app handlers/general.handlers";
import { setProfilePictureUrl } from "../../Redux Slices/profileSlice";
import { db } from "../../Firebase/firebase";
import { getUserProfileData } from "../../Redux Slices/profileSlice";
import {
  hideSpinner,
  showNetworkFeedback,
  showSpinner,
} from "../../Redux Slices/signupSlice";
import NetworkFeedback from "../Modal/networkFeedback";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import {
  changeProfilePictureHandler,
  getStudentBioObject,
} from "../Handlers/profile.picture.upload.handler";

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

  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const studentBioObject = getStudentBioObject(studentsBioArray, userId);

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

    await updateDoc(userProfileRef, data)
      .then(() => {
        getUserProfileData(userId);
        // invokeAllThunks(userId, dispatch);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        // dispatch(showNetworkFeedback());
      });
  };

  /// File upload handlers /////
  const handleUpload = () => {
    dispatch(showSpinner());

    if (!navigator.onLine) {
      dispatch(hideSpinner());
      dispatch(showNetworkFeedback());
      return;
    }

    const storageRef = rRef(storage, `files/${file.name}`);
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
        getDownloadURL(uploadObject.snapshot.ref)
          .then((url) => {
            // Update database redux store //
            updateProfilePictureURL(url, userId);
            return url;
          })
          .then((url) => {
            dispatch(setProfilePictureUrl(url));
            setVisible(false);
            dispatch(hideSpinner());
          })
          .catch((err) => console.log(err));
      }
    );
  };

  return (
    <div className="w-full relative h-screen flex justify-center items-center bg-white ">
      <div className="my-[100px] w-[100%] h-[100%]  p-[10px] sm:h-[400px] sm:shadow-lg max-w-[620px] flex flex-col bg-user-profile justify-between items-center">
        <Link to={-1} className="w-[100%]">
          <FaArrowLeft />
        </Link>
        <h3 className="font-bold text-xl my-5">Set Profile Picture</h3>
        <div className="">
          <FcCompactCamera size={100} />
        </div>
        <p className="text-center text-lp-primary font-semibold">
          Please upload a clear picture of yourself
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
        <div className="w-[100%] ">
          <div className="w-full flex justify-between items-center mb-[20px]">
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
          <div className="flex justify-center items-center">
            {isVisible === true ? (
              <button
                onClick={() =>
                  changeProfilePictureHandler(
                    file,
                    userId,
                    dispatch,
                    studentBioObject
                  )
                }
                className="w-[80%] mx-auto border rounded-md border-lp-secondary p-1 text-lp-secondary"
              >
                Upload
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer style={{ width: "100%", textAlign: "center" }} />
      {displayMenu === true ? <Menu /> : null}
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );
}

export default UploadProfilePicture;
