import React from "react";

/// Local directory imports /////
import NavBar from "./navBar";
function UserProfile() {
  return (
    <div className="bg-user-profile p-4 w-full h-screen">
      <NavBar>Profile</NavBar>
      <figure className="h-80 w-full bg-signup-gray border rounded-3xl"></figure>
      <div className="grid grid-cols-8 w-full h-40 text-sm  mt-10 grid-rows-2">
        <div className="col-start-1 p-1 flex flex-col justify-between items-center col-end-3 row-start-1 row-end-3 shadow-xl bg-profile-white border border-white rounded-xl">
          <div className="w-full   flex justify-center items-center">
            <div className="text-user-pc">Total</div>
            <div className="w-3 h-3 ml-2 border border-blue-100 bg-gradient-to-br from-profile-design-primary1 from-10% from-20% to-profile-design-primary2    via-profile-design-middle via-50% border rounded"></div>
          </div>
          <div className="p-4 font-bold">40/40</div>
        </div>
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
    </div>
  );
}

export default UserProfile;
