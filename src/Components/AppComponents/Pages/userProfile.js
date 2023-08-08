import React from "react";

/// Local directory imports /////
// import NavBar from "./navBar";
// import Menu from "./menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ///// Redux states //////////////
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const userProfilePictureUrl = useSelector(
    (state) => state.profileSlice.userProfilePictureUrl
  );
  const userProfileDocument = useSelector(
    (state) => state.loginSlice.userProfileDocument
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full py-6 h-auto max-w-5xl mx-auto">
      <div className="w-[90%] mx-auto md:pb-32 lg:pb-20 pb-12">
        <div className=" flex gap-3 items-center mb-10 md:mb-20">
          <span onClick={handleBack} className="hidden md:block">
            <BsArrowLeft size={40} />
          </span>
          <span onClick={handleBack} className="block md:hidden">
            <BsArrowLeft size={25} />
          </span>
          <span
            className=" font-bold text-[16px] md:text-[20px]"
            onClick={handleBack}
          >
            Student profile
          </span>
        </div>
        {/* <NavBar>Profile</NavBar> */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className=" h-auto w-full grid grid-cols-2 md:grid-cols-3 gap-1 ">
            <div className="hidden md:block"></div>
            <div className="h-[100px] md:h-[250px] w-full flex justify-center items-center ">
              <span className=" h-full w-[100px] md:w-[250px] rounded-full bg-signup-gray block"></span>
            </div>
            <div className="flex items-center underline text-blue-800">
              <a href="/" className=" font-semibold text-[14px] md:text-base">
                Download report
              </a>
            </div>
          </div>
          <div className=" text-center font-bold leading-6 md:leading-8 capitalize text-[14px] md:text-base mt-4">
            <p>
              {userProfileDocument.firstName} {userProfileDocument.lastName}
            </p>
            <p className=" underline text-blue-800">
              {userProfileDocument.email}
            </p>
            <p className=" ">{userProfileDocument.userName}</p>
          </div>
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className=" h-[200px md:h-[250px] bg-grey p-4 md:p-10 rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-4">
              <div>Total</div>
              <div className="w-3 h-3 ml-2 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% border rounded"></div>
            </div>
            <div className=" font-bold text-[14px] md:text-[18px] text-blue-800">
              40/40
            </div>
          </div>
          <div className=" h-[200px] md:h-[250px] bg-grey p-4 md:p-10  rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-1 md:mb-4">
              <span>Absent</span>
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded  bg-gradient-to-br from-absent-pc-start from-75% to-absent-pc-end via-absent-pc-middle via-40%"></div>
            </div>
            <div className=" flex flex-col ">
              <span className=" text-[12px] md:text-base">
                with <br /> permission
              </span>
              <span className=" font-bold text-[14px] md:text-[18px] text-blue-800">
                0
              </span>
            </div>
            <div className=" flex flex-col ">
              <span className=" text-[12px] md:text-base">
                without <br /> permission
              </span>
              <span className=" font-bold text-[14px] md:text-[18px] text-blue-800">
                0
              </span>
            </div>
          </div>
          <div className=" h-[200px] md:h-[250px] bg-grey p-4 md:p-10  rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-4">
              <span>Late</span>
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded bg-gradient-to-br from-late-color-start from-65% to-late-color-end  via-late-color-middle"></div>
            </div>
            <div className=" font-bold text-[14px] md:text-[18px]  text-blue-800">
              40/40
            </div>
          </div>
          <div className=" h-[200px] md:h-[250px] bg-grey p-4 md:p-10  rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-4">
              <span>
                Requests <br /> sent
              </span>
              <div className="w-3 h-3 ml-1 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% border rounded"></div>
            </div>
            <div className=" font-bold text-[14px] md:text-[18px] text-blue-800">
              0
            </div>
          </div>
          <div className=" h-[200px] md:h-[250px] bg-grey p-4 md:p-10  rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-4">
              <span>
                Request <br /> denied
              </span>
              <div className="h-3 text-user-pc w-3 ml-1 border font-bold rounded bg-gradient-to-br from-late-color-start from-65% to-late-color-end  via-late-color-middle"></div>
            </div>
            <div className=" font-bold  text-[14px] md:text-[18px]  text-blue-800">
              0
            </div>
          </div>
          <div className=" h-[200px] md:h-[250px] bg-grey p-4 md:p-10  rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-4">
              <span>
                Request <br /> approved
              </span>
              <div className="h-3 text-user-pc w-3 ml-1 border font-bold rounded bg-gradient-to-br from-late-color-start from-65% to-late-color-end  via-late-color-middle"></div>
            </div>
            <div className=" font-bold  text-[14px] md:text-[18px]  text-blue-800">
              0
            </div>
          </div>
          <div className=" h-[200px] md:h-[250px] bg-grey p-4 md:p-10  rounded-lg shadow-lg">
            <div className=" flex gap-2 items-center mb-4">
              <span>score</span>
              <div className="h-3 text-user-pc w-3 ml-1 border font-bold rounded bg-gradient-to-br from-score-pc-start  to-score-pc-end "></div>
            </div>
            <div className=" font-bold text-[14px] md:text-[18px]  text-blue-800">
              80%
            </div>
          </div>
        </div>

        {/* Patricks Version  */}

        {/* <div className="grid grid-cols-8 w-full h-40 text-sm  mt-10 ">
        
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
      </div>
      {displayMenu === true ? <Menu /> : null} */}
      </div>
    </div>
  );
}

export default UserProfile;
