import React from "react";

function UserProfile() {
  return (
    <div className="bg-user-profile p-4 w-full h-screen">
      <figure className="h-80 w-full bg-green-500 border rounded-3xl"></figure>
      <div className="grid grid-cols-8 w-full h-40   mt-10 grid-rows-2">
        <div className="col-start-1 flex flex-col justify-between items-center col-end-3 row-start-1 row-end-3 shadow-xl bg-profile-white border border-white rounded-xl">
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
              <div className="h-3 text-user-pc w-3 ml-2 border font-bold rounded bg-gradient-to-br from-score-pc-start from-40% to-blue-400 via-green-400 to-"></div>
            </div>
            <div className="font-bold text-black">80%</div>
          </div>
        </div>
        <div className="col-start-7 col-end-9 row-start-1 row-end-3 shadow-xl bg-profile-white border border-white rounded-xl"></div>
      </div>
    </div>
  );
}

export default UserProfile;
