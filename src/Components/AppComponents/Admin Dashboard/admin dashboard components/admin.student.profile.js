import React from "react";
import DashboardNavigationComponent from "./dashboard.navcomp";
import StudentHistoryCard from "./student.history.card";

function AdminStudentProfile() {
  return (
    <div className="w-full min-h-screen bg-user-profile p-[10px]">
      <div className="border border-transparent border-b-gray-300">
        <DashboardNavigationComponent title="Student profile" />
      </div>
      <div className="w-full flex justify-center min-h-[100%]">
        <div className="w-[50%] h-[100%] border border-tansparent border-r-gray-300">
          <div className="w-[100%] mx-auto flex flex-col mt-[20px] p-[10px] justify-center items-center">
            <figure className="w-[200px] h-[200px] border border-transparent border-solid border-[5px] border-gray-200 rounded-full">
              <img
                src="images/skalo.jpg"
                alt="profile picture"
                className="w-[100%] h-[100%] border border-transparent rounded-full"
              />
            </figure>
            <div className="mb-[5px] mt-[20px] font-bold text-[20px]">
              Patrick Chidiebele Okafor
            </div>
            <div className="mb-[5px] font-bold text-[20px]">08133956203</div>
            <div className="mb-[5px] font-bold text-[20px] text-lp-primary border border-transparent border-b-lp-primary border-[2px]">
              nayouknowwetinudeyfind@gmail.com
            </div>
          </div>
          <div>
            <div className="w-[90%] mx-auto mt-[10px] p-[10px] flex justify-between items-center">
              <StudentHistoryCard title="Total">
                <div className="font-bold text-lp-primary mt-[20px] text-[20px]">
                  <spna>40 / 40</spna>
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard title="Absent">
                <div className="flex mt-[5px] justify-between items-center">
                  <div>
                    With <br /> permission
                  </div>
                  <div className="font-bold text-lp-primary text-[20px]">0</div>
                </div>
                <div className="flex mt-[10px] justify-between items-center">
                  <div>Without permission</div>
                  <div className="font-bold text-lp-primary text-[20px]">0</div>
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard title="Late">
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  40 / 40
                </div>
              </StudentHistoryCard>
            </div>
            <div className="w-[90%] mx-auto mt-[10px] p-[10px] flex justify-between items-center">
              <StudentHistoryCard title="Requests sent">
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  0
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard title="Request denied">
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  0
                </div>
              </StudentHistoryCard>
              <StudentHistoryCard title="Requests approved">
                <div className="mt-[20px] font-bold text-[20px] text-lp-primary">
                  0
                </div>
              </StudentHistoryCard>
            </div>
          </div>
          <div className="w-[90%] mx-auto p-[10px] mt-[20px] h-[400px] bg-[#FBFCFE] border border-transparent rounded-xl">
            <div className="w-[100%] border border-transparent border-b-gray-400 flex justify-between items-center">
              <div className="w-[50%] py-[10px] font-semibold">
                Attendance report
              </div>
              <div className="w-[40%] flex justify-between items-center">
                <button className="text-lp-secondary py-[5px] font-semibold ">
                  This week
                </button>
                <button>This Month</button>
              </div>
            </div>
            <div className="w-[80%] h-[80%] flex justify-center items-center mt-[30px] mx-auto bg-gray-300 font-bold text-[30] text-lp-primary">
              Graph Here
            </div>
          </div>
          <div className="p-[10px] mt-[20px]">
            <h3 className="text-[20px] font-bold mb-[20px]">Summary</h3>
            <div className="w-[100%]">
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Session</span>
                <span className="font-bold">87days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Holidays</span>
                <span className="font-bold">7days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Class days</span>
                <span className="font-bold">65days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Number of days present</span>
                <span className="font-bold">87days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Number of days early</span>
                <span className="font-bold">87days</span>
              </div>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="font-semibold">Number of days late</span>
                <span className="font-bold">87days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] min-h-screen bg-white">Side two</div>
      </div>
    </div>
  );
}

export default AdminStudentProfile;
