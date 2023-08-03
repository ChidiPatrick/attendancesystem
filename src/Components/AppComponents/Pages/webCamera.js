import React, { useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";

// Third-party imports ///
import Webcam from "react-webcam";

// Local directory imports ///
import {
  showWebCam,
  hideWebCam,
  setUserImage,
} from "../../Redux Slices/attendanceSlice";
import { useNavigate } from "react-router";
import { showFeedback } from "../../Redux Slices/signupSlice";
import FeedbackModal from "../Modal/feedbackModal";

function WebCam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states ///
  const displayWebCam = useSelector(
    (state) => state.attendanceRecord.displayWebCam
  );
  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );

  const [image, setImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Web camera configuration ////
  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  ///Capture user ///
  const captureUser = (getScreenshot, setImage) => {
    const image = getScreenshot();
    dispatch(setUserImage(image));
    setImage(image);
    setShowPreview(true);
  };

  const retakePicture = () => {
    setImage(null);
    setShowPreview(false);
  };

  /// Save image ///
  const saveImage = () => {
    if (!image) {
      dispatch(showFeedback());
    }
    dispatch(setUserImage(image));
  };

  return (
    <div className={"top-0 left-0 absolute"}>
      <div className="flex justify-between items-center">
        <div onClick={() => navigate("/clockIn")}>X</div>
        <div>Ok</div>
      </div>
      <div className={showPreview === false ? "hidden" : "visible"}>
        <h3>Preview</h3>
        <img
          className="h-[100%] w-[100%] mt-10 border rounded-xl"
          src={image}
        />
      </div>
      <div>
        <Webcam
          className="mt-10 border rounded-xl border-lp-secondary "
          audio={false}
          height={300}
          screenshotFormat="image/*"
          width={300}
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <div className="w-[80] my-10 mx-auto flex  justify-between items-center">
              <button
                className="p-2 bg-lp-secondary w-[100px] text-white border rounded-xl cursor-pointer hover:bg-[#cb8400]"
                onClick={() => captureUser(getScreenshot, setImage)}
              >
                Capture
              </button>
              <button
                onClick={retakePicture}
                className="p-2 bg-white w-[100px] text-lp-secondary border rounded-xl border-lp-secondary cursor-pointer hover:bg-[#cb8400]"
              >
                Retake
              </button>
            </div>
          )}
        </Webcam>
      </div>
      {displayFeedback === true ? (
        <FeedbackModal>Please take a picture before saving</FeedbackModal>
      ) : null}
    </div>
  );
}

export default WebCam;
