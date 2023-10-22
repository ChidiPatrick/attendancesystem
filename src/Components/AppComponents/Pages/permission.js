import React, { useRef, useState } from "react";

//// Third Party imports ////
import { BsCalendar4 } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import DatePicker from "react-date-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";

//Third-party imports

/// Local directory imports ///
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import Menu from "./menu";

function Permission() {
  const dispatch = useDispatch();

  const permissionBodyRef = useRef();

  //////// Local states /////////////////////
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [permissionReason, setPermissionReason] = useState("");

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const [value, setValue] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false);

  console.log(permissionReason);

  const { firstName, lastName, userName, profilePictureURL } = userProfileData;

  const permissionObject = {
    permissionBody: permissionReason,
    startingDate: new Date(startingDate).toDateString(),
    endingDate: new Date(endingDate).toDateString(),
    time: new Date().toLocaleTimeString(),
    status: "Pending",
    name: `${firstName} ${lastName}`,
  };

  console.log(permissionObject);

  /// Get permission type value //////
  const getPermissionType = (eventObj) => {
    console.log(eventObj.target.value);
  };

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
            onChange={getPermissionType}
          >
            <option value={"Late"}>Late</option>
            <option value={"Absent"}>Absent</option>
          </select>
        </fieldset>
        <p>When do you need this permission?</p>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>From</legend>

          <DatePicker
            className="w-[100%]"
            onChange={setStartingDate}
            value={startingDate}
          />
        </fieldset>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>To</legend>
          <DatePicker
            className="w-[100%]"
            onChange={setEndingDate}
            value={endingDate}
          />
        </fieldset>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend>Reason</legend>
          <textarea
            className="outline-none w-full "
            placeholder="Explain why you are seeking for permission here"
            ref={permissionBodyRef}
            onChange={() => {
              setPermissionReason(permissionBodyRef.current.value);
            }}
          ></textarea>
        </fieldset>
        <div className="flex justify-between  gap-3 items-center w-full">
          <ButtonFull>Send request</ButtonFull>
          <ButtonLight>Cancel</ButtonLight>
        </div>
        {showCalender === true ? (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center item-center flex-col  bg-black bg-opacity-20">
            <div className="w-full flex justify-center "></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Permission;
