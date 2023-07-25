import React from "react";

//// Third Party imports ////
import NavBar from "./navBar";
import { BsCalendar4 } from "react-icons/bs";

/// Local directory imports ///
import {
  ButtonFull,
  ButtonLight,
  ButtonSmall,
  ButtonSmallLight,
} from "../../LandingPageComponents/Buttons/buttons";

function Permission() {
  return (
    <div className="w-full h-screen bg-user-profile p-2">
      <NavBar>Permission</NavBar>
      <div className="w-full border border-white shadow-md rounded-xl mx-auto flex justify-center flex-col items-center  h-64 bg-profile-white">
        <figure className="w-32 h-32 border border-blue-500 rounded-full bg-gray-500"></figure>
        <div className="flex justify-center items-center flex-col mt-5">
          <div>Full name here</div>
          <div>User name</div>
          <div>Email</div>
        </div>
      </div>
      <div>
        <p>I'm seeking permission to be</p>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>Type</legend>
          <select
            name="permission-type"
            className="w-full outline-none bg-transparent"
          >
            <option>Late</option>
            <option>Absent</option>
          </select>
        </fieldset>
        <p>When do you need this permission?</p>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>From</legend>
          <div className="w-full flex justify-between items-center">
            <div>May 23, 2023</div>
            <div>
              <BsCalendar4 />
            </div>
          </div>
        </fieldset>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>To</legend>
          <div className="w-full flex justify-between items-center">
            <div>May 25, 2023</div>
            <div>
              <BsCalendar4 />
            </div>
          </div>
        </fieldset>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>Reason</legend>
          <textarea
            className="outline-none w-full "
            placeholder="Tell us why you're asking for permission"
          ></textarea>
        </fieldset>
        <div className="flex justify-between items-center w-full">
          <ButtonSmall>Send request</ButtonSmall>
          <ButtonSmallLight>Cancel</ButtonSmallLight>
        </div>
      </div>
    </div>
  );
}

export default Permission;
