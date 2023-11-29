import React from "react";
import { ButtonSmall } from "../../LandingPageComponents/Buttons/buttons";
import { GoUpload } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

/// Local directory imports /////
import { useNavigate } from "react-router";
import { calcNumWorkingDaysOfTheMonth } from "../../General app handlers/general.handlers";
import StudentNotificationBar from "./student.notification.bar";
import StudentPermissionResponseUI from "./student.permission.responseUI";
import { getLatenessHour } from "../Handlers/clockin.handler";
import { calcProgramDaysUsed } from "../Admin Dashboard/admin dashboard handlers/dashboard.summary.comp";
import {
  getProgramEndingDate,
  getProgramStartingDate,
  getTotalClockins,
} from "../Handlers/user.profile.handlers";

/// User profile
function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states //////////////
  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const displayPermissionResponseUI = useSelector(
    (state) => state.permissionSlice.displayPermissionResponseUI
  );

  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const programStaringtDate = useSelector(
    (state) => state.loginSlice.programStartingDate
  );
  const programEndingDate = useSelector(
    (state) => state.loginSlice.programEndingDate
  );

  const userId = useSelector((state) => state.loginSlice.userId);

  const totalDaysPresent = useSelector(
    (state) => state.attendanceRecord.studentNumClockins
  );

  const { firstName, lastName, userName, profilePictureURL, currMonthRecord } =
    userProfileData;

  // Navigation function
  const navigateBack = () => {
    navigate(-1);
  };

  const navigateToEditProfile = () => {
    navigate("/editProfile");
  };

  const date = new Date();

  const numberOfBusinessDays = calcNumWorkingDaysOfTheMonth(
    date.getFullYear(),
    date.getMonth()
  );

  console.log(getProgramStartingDate(dispatch));
  console.log(numberOfBusinessDays);

  getTotalClockins(userId, dispatch);

  // getUserPermissionsArray(studentsBioArray, userId, dispatch);

  return (
    <div className="w-full py-6 relative">
      <div className="min-w-[400px]  max-w-[620px] mx-auto  px-[10px] pb-[20px] bg-[#FFFDFA] relative">
        <div className="flex items-center text-black bg-mywhite py-2 px-2  ">
          <span>
            <FaArrowLeft size={20} onClick={navigateBack} />
          </span>
          <h2 className=" mx-auto font-semibold text-[25px]">Profile</h2>
        </div>
        <div className=" sm:w-[100%]">
          <div className="h-[170px] md:h-[350px]">
            <figure className="h-[100%] w-[100%] relative bg-[#FFFDFA]">
              {profilePictureURL === "" || !navigator.onLine ? (
                <BsFillPersonFill className=" text-gray-500 h-[100%] w-[100%]" />
              ) : (
                <img
                  src={profilePictureURL}
                  alt="pics_profile"
                  className="h-[100%] w-[100%] relative"
                />
              )}
              <div className=" flex absolute top-[50%] translate-x-[-50%]  left-[50%] justify-center pb-8 ">
                <span className=" bg-myshade rounded-full p-2 md:p-4">
                  <GoUpload
                    className="text-gray-50"
                    size={22}
                    onClick={() => navigate("/uploadProfilePicture")}
                  />
                </span>
              </div>
            </figure>

            <div className=" text-white w-full ">
              <div>
                <div className=" flex w-[100%] px-6 md:px-8 pt-3 pb-2 justify-between  bg-myshade  rounded-br-3xl rounded-bl-3xl ">
                  <div className=" tracking-wide text-lp-primary text-[13px] md:text-base">
                    <p>
                      {firstName} {lastName},{userName}
                    </p>
                  </div>
                  <div className=" flex flex-col self-end">
                    <ButtonSmall handleClick={navigateToEditProfile}>
                      Edit profile
                    </ButtonSmall>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[90%] mx-auto md:w-full mt-[100px] md:mt-[100px]">
          <div className=" flex gap-4 mb-[40px]">
            <div className=" w-[70%] md:w-[70%] p-3 h-[130px]  bg-white shadow-md rounded-md">
              <div className=" flex justify-between items-center">
                <div className=" text-my-grey font-semibold text-[15px] md:text-base">
                  Total days present since program started
                </div>
                <div className="w-3 h-3 ml-1 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% rounded"></div>
              </div>
              <div className=" h-full flex items-center font-bold text-[18px] md:text-[20px]">
                {totalDaysPresent} /{" "}
                {calcProgramDaysUsed(
                  new Date(programStaringtDate),
                  new Date(),
                  new Date(programEndingDate)
                )}
              </div>
            </div>
            <div className=" w-[30%] flex flex-col justify-between md:w-[40%] p-3 bg-white shadow-md rounded-md">
              <div className=" flex justify-between items-center  border-b-[0.5px] border-[#444]">
                <div className=" text-my-grey font-semibold text-[15px] md:text-base">
                  Days absent
                </div>
                <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
              </div>

              <div className="font-bold ">
                {calcProgramDaysUsed(
                  new Date(programStaringtDate),
                  new Date(),
                  new Date(programEndingDate)
                ) -
                  totalDaysPresent <
                10
                  ? `0${
                      calcProgramDaysUsed(
                        new Date(programStaringtDate),
                        new Date(),
                        new Date(programEndingDate)
                      ) - totalDaysPresent
                    }`
                  : calcProgramDaysUsed(
                      new Date(programStaringtDate),
                      new Date(),
                      new Date(programEndingDate)
                    ) - totalDaysPresent}
              </div>
            </div>
          </div>
          <div className=" mt-4 w-full p-3 bg-white shadow-md rounded-md">
            <div className=" flex justify-between items-center mb-[10px]  border-b-[0.5px] border-[#444]">
              <div className=" text-my-grey font-semibold">
                Permission Requests
              </div>
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
            </div>
            {permissionsArray?.map((permissionObject, index) => (
              <StudentNotificationBar
                permissionObject={permissionObject}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      {displayPermissionResponseUI === true ? (
        <StudentPermissionResponseUI />
      ) : null}
    </div>
  );
}

export default UserProfile;
