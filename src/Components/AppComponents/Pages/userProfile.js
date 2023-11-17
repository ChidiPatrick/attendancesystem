import React from "react";
import { ButtonSmall } from "../../LandingPageComponents/Buttons/buttons";
import { GoUpload } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";

/// Local directory imports /////
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { calcNumWorkingDaysOfTheMonth } from "../../General app handlers/general.handlers";
import { BsFillPersonFill } from "react-icons/bs";
import StudentNotificationBar from "./student.notification.bar";
import StudentPermissionResponseUI from "./student.permission.responseUI";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states //////////////
  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const displayPermissionResponseUI = useSelector(
    (state) => state.permissionSlice.displayPermissionResponseUI
  );

  const { firstName, lastName, userName, profilePictureURL, currMonthRecord } =
    userProfileData;
  console.log(permissionsArray);

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

  return (
    <div className="w-full   py-6 relative">
      <div className="min-w-[400px] sm:w-[60%] mx-auto  md:pb-32 lg:pb-20 pb-12 bg-[#FFFDFA] relative">
        <div className=" sm:w-[100%]">
          <div className="h-[170px] md:h-[350px]  ">
            <figure className="h-[100%] w-[100%] bg-[#FFFDFA]">
              {profilePictureURL === "" || !navigator.onLine ? (
                <BsFillPersonFill className=" text-gray-500 h-[100%] w-[100%]" />
              ) : (
                <img
                  src={profilePictureURL}
                  alt="pics_profile"
                  className="  h-[100%] w-[100%] relative"
                />
              )}
            </figure>

            <div className=" text-white w-full ">
              <div className=" flex items-center text-black bg-mywhite py-2 px-2  ">
                <span>
                  <FaArrowLeft size={20} onClick={navigateBack} />
                </span>
                <p className=" mx-auto font-semibold">Profile</p>
              </div>
              <div>
                <div className=" flex justify-center pb-8 md:pb-12">
                  <span className=" bg-myshade rounded-full p-2 md:p-4">
                    <GoUpload
                      size={22}
                      onClick={() => navigate("/uploadProfilePicture")}
                    />
                  </span>
                </div>
                <div className=" flex w-[100%] px-6 md:px-8 pt-3 pb-2 justify-between  bg-myshade  rounded-br-3xl rounded-bl-3xl ">
                  <div className=" tracking-wide text-[13px] md:text-base">
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

        <div className=" w-[90%] mx-auto md:w-full   mt-[270px]  md:mt-[360px]">
          <div className=" flex gap-4">
            <div className=" w-[70%] md:w-[60%] p-3 bg-white shadow-md rounded-md">
              <div className=" flex justify-between items-center">
                <div className=" text-my-grey font-semibold text-[15px] md:text-base">
                  Total days present for the month
                </div>
                <div className="w-3 h-3 ml-1 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% border rounded"></div>
              </div>
              <div className=" h-full flex items-center font-bold text-[18px] md:text-[20px]">
                {userProfileData !== undefined
                  ? currMonthRecord.totalDaysPresent
                  : 0}
                /{numberOfBusinessDays}
              </div>
            </div>
            <div className=" w-[30%] md:w-[40%] p-3 bg-white shadow-md rounded-md">
              <div className=" flex justify-between items-center  border-b-[0.5px] border-[#444]">
                <div className=" text-my-grey font-semibold text-[15px] md:text-base">
                  Absent
                </div>
                <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
              </div>
              <div className=" md:text-[14px] text-[12px]">
                with <br /> permission
              </div>
              <div className=" font-bold text-[18px] md:text-[20px]">0</div>
              <div className=" md:text-[14px] text-[12px]">
                without <br /> permission
              </div>
              <div className=" font-bold text-[18px] md:text-[20px]">0</div>
            </div>
          </div>
          <div className=" mt-4 w-full p-3 bg-white shadow-md rounded-md">
            <div className=" flex justify-between items-center  border-b-[0.5px] border-[#444]">
              <div className=" text-my-grey font-semibold">
                Permission Requests
              </div>
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
            </div>
            {permissionsArray.map((permissionObject) => (
              <StudentNotificationBar permissionObject={permissionObject} />
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
