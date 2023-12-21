import React from "react";

/// Third Party imports //////////
import { FcHighPriority } from "react-icons/fc";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router";
import { hideNetworkFeedback } from "../../Redux Slices/signupSlice";
import { useDispatch } from "react-redux";

function NetworkFeedback({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  ///Close modal /////
  const closeModel = () => {
    dispatch(hideNetworkFeedback());
  };

  return (
    <div className="flex w-full absolute left-0 top-0 justify-center items-center h-screen bg-black bg-opacity-30 ">
      <div className="bg-white h-80 w-3/4 border rounded-xl">
        <p className="p-2 mt-20">
          Oops! No internet connection. Please check your internet connectivity
          and try again
        </p>
        <div className="flex justify-end p-2 mt-4">
          <button
            onClick={closeModel}
            className="w-36 text-white bg-lp-secondary p-2 border rounded-xl "
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export default NetworkFeedback;
