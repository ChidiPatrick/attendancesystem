import React from "react";
import { ButtonSmall } from "../../LandingPageComponents/Buttons/buttons";
import { GoUpload } from "react-icons/go";
import { FaBars } from "react-icons/fa";

/// Local directory imports /////
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { calcNumWorkingDaysOfTheMonth } from "../../General app handlers/general.handlers";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux states //////////////
  //
  const userProfileData = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const { firstName, lastName, userName, profilePictureURL, currMonthRecord } =
    userProfileData;

  const { totalDaysPresent } = currMonthRecord;

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
    <div className="w-full   py-6 h-auto  mx-auto bg-[#FFFDFA]">
      <div className=" mx-auto max-w-[650px] md:pb-32 lg:pb-20 pb-12  relative">
        <div className="  mx-auto fixed top-0 w-full md:w-[650px] ">
          <div className="h-[270px] md:h-[350px] w-[100%]   rounded-br-3xl rounded-bl-3xl overflow-hidden ">
            <figure className="h-[100%] w-[100%]">
              <img
                src={profilePictureURL}
                alt="pics_profile"
                className=" object-center object-fill h-[100%] w-[100%] relative"
              />
            </figure>

            <div className="absolute bottom-0  top-0 flex flex-col justify-between text-white w-full ">
              <div className=" flex items-center text-black bg-mywhite py-2 px-2  ">
                <span>
                  <FaBars size={20} onClick={navigateBack} />
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
                <div className=" flex px-6 md:px-8 pt-3 pb-2 justify-between  bg-myshade  rounded-br-3xl rounded-bl-3xl ">
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

        <div className=" w-[90%] mx-auto md:w-full  mt-[270px]  md:mt-[360px]">
          <div className=" flex gap-4">
            <div className=" w-[70%] md:w-[60%] p-3 bg-white shadow-md rounded-md">
              <div className=" flex justify-between items-center">
                <div className=" text-my-grey font-semibold text-[15px] md:text-base">
                  Total class days
                </div>
                <div className="w-3 h-3 ml-1 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% border rounded"></div>
              </div>
              <div className=" h-full flex items-center font-bold text-[18px] md:text-[20px]">
                {totalDaysPresent} / {numberOfBusinessDays}
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
              <div className=" text-my-grey font-semibold">Requests</div>
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
            </div>
            <div className=" text-[14px]">sent</div>
            <div className=" font-bold text-[18px] md:text-[20px]">20</div>
            <div className=" text-[14px]">Approved</div>
            <div className=" font-bold text-[18px] md:text-[20px]">5</div>
          </div>
        </div>
        <div className=" h-[200px] md:hidden"></div>
        {/* Patricks Version  */}

        {/* <div className="grid grid-cols-8 w-full h-40 text-sm mt-[270px]  md:mt-[360px] ">
          <div className="flex col-start-4 col-end-6 row-start-1 row-end-3 flex-col text-user-pc justify-between">
            <div className="bg-profile-white shadow-xl h-16 p-2 flex flex-col items-center ">
              <div className="w-full flex justify-center items-center">
                <div className="text-user-pc">Late</div>
                <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded bg-gradient-to-br from-late-color-start from-65% to-late-color-end  via-late-color-middle"></div>
              </div>
              <div className="font-bold text-black">40/40</div>
            </div>
            <div className="bg-profile-white shadow-xl h-16 p-2 flex flex-col items-center">
              <div className="w-full flex justify-center items-center">
                <div className="text-user-pc">Score</div>
                <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded bg-gradient-to-br from-score-pc-start  to-score-pc-end "></div>
              </div>
              <div className="font-bold text-black">80%</div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col col-start-7 p-1 col-end-9 row-start-1 row-end-3 shadow-xl bg-profile-white border border-white rounded-xl">
            <div className="w-full flex justify-center items-center border-b border-user-pc">
              <div className="text-user-pc ">Absent</div>
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
            </div>
            <div className="p-2 flex justify-between items-center flex-col">
              <div className="text-xs mb-10">
                <p>
                  With <br /> permission
                </p>
                <div className="font-bold">0</div>
              </div>
              <div className="text-xs">
                <p>
                  Without <br /> permission
                </p>
                <div className="font-bold">0</div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 shadow-2xl bg-profile-white w-full border rounded border-white h-24 mt-5 ">
          <div className="w-24 flex justify-center items-center">
            <div>Rating</div>
            <div className=" w-3 h-3 ml-2 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2 via-profile-design-middle via-50% border rounded"></div>
          </div>
          <div className="w-full p-4 font-bold ">Top 10 students</div>
        </div>
        <div className="grid grid-cols-8 w-full h-24 text-xs  mt-10 ">
          <div className="col-start-1 p-1 flex flex-col justify-between items-center col-end-3 row-start-1 row-end-2 shadow-xl bg-profile-white border border-white rounded-xl">
            <div className="w-full   flex justify-center items-center">
              <div className="text-user-pc text-xs">
                Requests <bt /> sent
              </div>
              <div className="w-3 h-3 ml-1 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% border rounded"></div>
            </div>
            <div className="p-4 font-bold">0</div>
          </div>
          <div className="flex col-start-4 col-end-6 row-start-1 row-end-2 flex-col text-user-pc justify-between">
            <div className="bg-profile-white shadow-xl h-full border rounded-xl border-white p-2 flex flex-col justify-between items-center ">
              <div className="w-full flex justify-center items-center">
                <div className="text-user-pc ">
                  Request <br /> denied
                </div>
                <div className="h-3 text-user-pc w-3 ml-1 border font-bold rounded bg-gradient-to-br from-late-color-start from-65% to-late-color-end  via-late-color-middle"></div>
              </div>
              <div className="font-bold text-black">0</div>
            </div>
          </div>
          <div className="flex justify-between  items-center flex-col col-start-7 py-2 px-1 col-end-9 row-start-1 row-end-2 shadow-xl bg-profile-white border border-white rounded-xl">
            <div className="w-full flex justify-between items-center  border-user-pc">
              <div className="text-user-pc ">
                Requests <br /> Approved
              </div>
              <div className="h-3 text-user-pc w-3 ml-1 border font-bold rounded bg-gradient-to-br from-late-color-start from-65% to-late-color-end  via-late-color-middle"></div>
            </div>
            <div className="p-2 flex justify-between items-center font-bold flex-col">
              0
            </div>
          </div>
        </div> */}
        {/* {displayMenu === true ? <Menu /> : null} */}
      </div>
    </div>
  );
}

export default UserProfile;
