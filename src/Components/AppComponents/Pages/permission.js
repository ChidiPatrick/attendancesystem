import React, { useRef, useState } from "react";

//// Third Party imports ////
import { BsFillPersonFill } from "react-icons/bs";
import DatePicker from "react-date-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";

/// Local directory imports ///
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import Menu from "./menu";
import { sendPermissionRequestHandler } from "../Handlers/permission.handler";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import { getStudentBioObject } from "../Handlers/profile.picture.upload.handler";

/////////////// PERMISSION COMPONENT/////////////
function Permission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const permissionBodyRef = useRef();

  //////// Local states /////////////////////
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [permissionReason, setPermissionReason] = useState("");
  const [permissionType, setPermissionType] = useState("");

  //////////////// Redux states //////////////////////////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  const userId = useSelector((state) => state.loginSlice.userId);

  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );

  const studentBioObject = getStudentBioObject(studentsBioArray, userId);

  /////////////// User credentials //////////////
  const { firstName, lastName, userName, profilePictureURL, email } =
    userProfileData;

  const permissionObject = {
    permissionBody: permissionReason,
    permissionType,
    startingDate: new Date(startingDate).toDateString(),
    endingDate: new Date(endingDate).toDateString(),
    status: "Pending",
    name: `${firstName} ${lastName}`,
    userId,
    responseBody: "",
  };

  /// Get permission type value //////
  const getPermissionType = (eventObj) => {
    setPermissionType(eventObj.target.value);
  };

  return (
    <div className="relative py-6 h-auto  mx-auto">
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
                src={studentBioObject.profilePictureURL}
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
            <div className="text-lp-primary font-semibold">{email}</div>
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
            <option selected value={"Late"}>
              Late
            </option>
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
          <ButtonFull
            handleClick={() =>
              sendPermissionRequestHandler(
                permissionObject,
                permissionBodyRef,
                studentsBioArray,
                dispatch,
                userId
              )
            }
          >
            Send request
          </ButtonFull>
          <ButtonLight handleClick={() => navigate("/home")}>
            Cancel
          </ButtonLight>
        </div>
        <ToastContainer style={{ width: "100%", textAlign: "center" }} />
      </div>
      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );
}

export default Permission;
