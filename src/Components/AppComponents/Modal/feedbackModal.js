import React from "react";

//// Local directory imports ////
import { ButtonSmall } from "../../LandingPageComponents/Buttons/buttons";

function FeedbackModal({ children, handleClick }) {
  return (
    <div className="w-full p-4 h-full absolute left-0 top-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
      <div className="w-3/4 h-80 p-2 flex  flex-col justify-between bg-white">
        <h4 className="text-red-600 text-xl  font-bold">Attention!</h4>
        <p>{children}</p>
        <div className="w-full flex justify-end">
          <ButtonSmall handleClick={handleClick}>Cancel</ButtonSmall>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
