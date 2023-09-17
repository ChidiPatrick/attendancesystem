import React, { useState } from "react";

//// Third Party imports ////
import NavBar from "./navBar";
import { BsCalendar4 } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

  const [value, setValue] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false);

  const { firstName, lastName, userName, profilePictureURL } = userProfileData;

  return (
    <div className="w- relative py-6 h-auto  mx-auto">
      <div className="mx-auto max-w-[650px] w-[90%] md:w-full relative">
        <div className=" flex items-center bg-mywhite sticky top-0 z-[999]">
          <span className=" w-10 "></span>
          <h3 className=" mx-auto font-semibold text-xl ">Permission</h3>
          {displayMenu === true ? <Menu /> : null}
        </div>

        <div className="w-full mt-10 border border-white shadow-md rounded-xl mx-auto flex justify-center flex-col items-center h-64 bg-profile-white">
          <figure className="w-32 h-32 border border-blue-500 rounded-full overflow-hidden ">
            {profilePictureURL === "" || !navigator.onLine ? (
              <BsFillPersonFill size={"100%"} />
            ) : (
              <img
                src={profilePictureURL}
                alt="pics_profile"
                className=" w-full h-full"
              />
            )}
          </figure>
          <div className="flex justify-center items-center flex-col mt-5 font-semibold text-[14px] md:text-base text-[#222]">
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
          <div
            onClick={() => setShowCalender(true)}
            className="w-full flex justify-between items-center"
          >
            <div>{new Date().toDateString()}</div>
            <div>
              <BsCalendar4 />
            </div>
          </div>
        </fieldset>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>To</legend>
          <div
            onClick={() => setShowCalender(true)}
            className="w-full flex justify-between items-center"
          >
            <div>{new Date().toDateString()}</div>
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
        {showCalender === true ? (
          <div
            // onClick={() => setShowCalender(false)}
            className="absolute top-0 left-0 w-full h-full flex justify-center item-center flex-col  bg-black bg-opacity-20"
          >
            <div className="w-full flex justify-center ">
              <Calendar
                onClickDay={(value, day) => {
                  console.log(value.getDate());
                }}
                value={value}
                onClickMonth={(value, month) => {
                  console.log(value);
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Permission;
