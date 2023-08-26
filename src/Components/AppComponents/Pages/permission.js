import React from "react";

//// Third Party imports ////
import NavBar from "./navBar";
import { BsCalendar4 } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

/// Local directory imports ///
import {
  ButtonFull,
  ButtonLight,
  // ButtonSmall,
  // ButtonSmallLight,
} from "../../LandingPageComponents/Buttons/buttons";
import Menu from "./menu";

function Permission() {
  const dispatch = useDispatch();

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const { firstName, lastName, userName, profilePictureURL } = userProfileData;

  return (
    <div className="w-full   py-6 h-auto  mx-auto">
      <div className="mx-auto max-w-[650px] w-[90%] md:w-full relative">
        <div className=" flex items-center bg-mywhite sticky top-0 z-[999]">
          <span className=" w-10 ">
            <NavBar />
          </span>
          <h3 className=" mx-auto font-semibold text-xl ">Permission</h3>
          {displayMenu === true ? <Menu /> : null}
        </div>

        <div className="w-full mt-10 border border-white shadow-md rounded-xl mx-auto flex justify-center flex-col items-center h-64 bg-profile-white">
          <figure className="w-32 h-32 border border-blue-500 rounded-full overflow-hidden ">
            <img
              src={profilePictureURL}
              alt="profile_pic"
              className="w-full h-full"
            />
          </figure>
          <div className="flex justify-center items-center flex-col mt-5 font-semibold">
            <div>
              {firstName} {lastName}
            </div>
            <div>{userName}</div>
            <div>Email</div>
          </div>
        </div>

        <p className=" mt-6">I'm seeking permission to be</p>
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
        <div className="flex justify-between  gap-3 items-center w-full">
          <ButtonFull>Send request</ButtonFull>
          <ButtonLight>Cancel</ButtonLight>
        </div>
      </div>
    </div>

    // {PATRICKS VERSION}
    // <div className="w-full h-screen bg-user-profile p-2">
    //   <NavBar>Permission</NavBar>
    //   <div className="w-full border border-white shadow-md rounded-xl mx-auto flex justify-center flex-col items-center  h-64 bg-profile-white">
    //     <figure className="w-32 h-32 border border-blue-500 rounded-full bg-gray-500"></figure>
    //     <div className="flex justify-center items-center flex-col mt-5">
    //       <div>Full name here</div>
    //       <div>User name</div>
    //       <div>Email</div>
    //     </div>
    //   </div>
    //   <div>
    //     <p>I'm seeking permission to be</p>
    //     <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
    //       <legend>Type</legend>
    //       <select
    //         name="permission-type"
    //         className="w-full outline-none bg-transparent"
    //       >
    //         <option>Late</option>
    //         <option>Absent</option>
    //       </select>
    //     </fieldset>
    //     <p>When do you need this permission?</p>
    //     <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
    //       <legend>From</legend>
    //       <div className="w-full flex justify-between items-center">
    //         <div>May 23, 2023</div>
    //         <div>
    //           <BsCalendar4 />
    //         </div>
    //       </div>
    //     </fieldset>
    //     <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
    //       <legend>To</legend>
    //       <div className="w-full flex justify-between items-center">
    //         <div>May 25, 2023</div>
    //         <div>
    //           <BsCalendar4 />
    //         </div>
    //       </div>
    //     </fieldset>
    //     <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
    //       <legend>Reason</legend>
    //       <textarea
    //         className="outline-none w-full "
    //         placeholder="Tell us why you're asking for permission"
    //       ></textarea>
    //     </fieldset>
    //     <div className="flex justify-between items-center w-full">
    //       <ButtonSmall>Send request</ButtonSmall>
    //       <ButtonSmallLight>Cancel</ButtonSmallLight>
    //     </div>
    //   </div>
    //   {displayMenu === true ? <Menu /> : null}
    // </div>
  );
}

export default Permission;
