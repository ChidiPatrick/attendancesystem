// import React, { useEffect, useState, useSyncExternalStore } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // Third-party imports ///
// import Webcam from "react-webcam";

// // Local directory imports ///
// import {
//   showWebCam,
//   hideWebCam,
//   setUserImage,
//   setLinkToClockIn,
// } from "../../Redux Slices/attendanceSlice";
// import { useNavigate } from "react-router";
// import { hideFeedback, showFeedback } from "../../Redux Slices/signupSlice";
// import FeedbackModal from "../Modal/feedbackModal";
// import { HiX, HiOutlineCheck } from "react-icons/hi";

// function WebCam() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   /// Redux states ///
//   const displayWebCam = useSelector(
//     (state) => state.attendanceRecord.displayWebCam
//   );
//   const displayFeedback = useSelector(
//     (state) => state.signupSlice.displayFeedback
//   );
//   const linkToClockIn = useSelector(
//     (state) => state.attendanceRecord.linkToClockIn
//   );
//   const linkToClockOut = useSelector(
//     (state) => state.attendanceRecord.linkToClockOut
//   );

//   console.log(linkToClockIn);

//   const [image, setImage] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showDoneBtn, setShowDoneBtn] = useState(false);

//   // Web camera configuration ////
//   const videoConstraints = {
//     width: 300,
//     height: 300,
//     facingMode: "user",
//   };

//   ///Capture user ///
//   const captureUser = (getScreenshot, setImage) => {
//     const image = getScreenshot();
//     // setImage(image);
//     // setShowPreview(true);
//     // setShowDoneBtn(true);
//     dispatch(setUserImage(image));
//     navigate("/previewImage");
//   };

//   /// Save image ///
//   const saveImage = () => {
//     dispatch(setUserImage(image));
//     navigate("/previewImage");
//   };

//   return (
//     <div className={"top-0 left-0 absolute p-2 w-full "}>
//       <div className="flex justify-between items-center text-4xl">
//         <div onClick={() => navigate("/clockin")}>
//           <HiX className="w-5 text-2xl h-5 hover:bg-gray-200 hover:text-black text-red-600 border border-white hover:rounded-full cursor-pointer" />
//         </div>
//         <button
//           className={
//             showDoneBtn === true
//               ? "w-5 h-5 text-2xl  hover:bg-gray-200 hover:text-black text-red-300 border border-white hover:rounded-full cursor-pointer"
//               : "hidden"
//           }
//           onClick={saveImage}
//         >
//           <HiOutlineCheck />
//         </button>
//       </div>
//       <div className={showPreview === false ? "hidden" : "visible"}>
//         <h3>Preview</h3>
//         <img
//           className="h-[100%] w-[100%] mt-10 border rounded-xl"
//           src={image}
//         />
//       </div>
//       <div className="w-full  ">
//         <Webcam
//           className="mt-10 border w-full rounded-xl border-lp-secondary "
//           audio={false}
//           height={300}
//           screenshotFormat="image/*"
//           width={300}
//           videoConstraints={videoConstraints}
//         >
//           {({ getScreenshot }) => (
//             <div className="w-[80%] my-10 mx-auto flex  justify-center items-center">
//               <button
//                 className="bg-gradient-to-b from-[#F78F1E] to-[#F7BA1E] via-[#F7C71E00] p-2 bg-lp-secondary w-[50px] flex justify-center items-center h-[50px] text-black border rounded-full cursor-pointer hover:bg-[#cb8400]"
//                 onClick={() => captureUser(getScreenshot, setImage)}
//               >
//                 <HiOutlineCheck size={30} />
//               </button>
//               {/* <button
//                 onClick={retakePicture}
//                 className="p-2 bg-white w-[100px] text-lp-secondary border rounded-xl border-lp-secondary cursor-pointer hover:bg-[#cb8400]"
//               >
//                 Retake
//               </button> */}
//             </div>
//           )}
//         </Webcam>
//       </div>
//       {displayFeedback === true ? (
//         <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
//           Please take a picture before saving
//         </FeedbackModal>
//       ) : null}
//     </div>
//   );
// }

// export default WebCam;
