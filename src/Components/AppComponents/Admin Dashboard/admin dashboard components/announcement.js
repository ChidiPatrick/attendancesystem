import React from "react";
import DashboardNavigationComponent from "./dashboard.navcomp";

function Announcement() {
  return (
    <div className="w-full bg-[#F7F7F7] h-screen p-[10px]">
      <div className="border border-transparent border-b-gray-600">
        <DashboardNavigationComponent title="Announcement" />
      </div>
      <div className="flex justify-between  mt-[10px] ">
        <div className="w-[48%] min-h-[500px] ">
          <div className="w-[100%] h-[500px] bg-white border border-transparent rounded-xl p-[10px]">
            <h2 className="font-bold text-[19px]">Type Announcement</h2>
            <div className="w-full mt-[20px]">
              <h4 className="text-[20px] pb-[10px]">Title</h4>
              <input
                className="p-[10px] w-[100%] border border-gray-700 rounded-md "
                placeholder="Enter holiday title"
              />
            </div>
            <div className="w-[100%] mt-[20px]">
              <h4 className="text-[20px] pb-[10px]">Content</h4>
              <textarea
                className="w-[100%] border border-gray-700 px-[10px] min-h-[200px] rounded-md"
                placeholder="Type announcement here"
              ></textarea>
            </div>
            <div className="w-[50%] mx-auto flex justify-between items-center mt-[20px]">
              <button className="w-[150px] mr-[10px] bg-lp-secondary text-white font-bold p-[10px] border rounded-2xl">
                Post
              </button>
              <button className="w-[150px] bg-[#FFFDFA] text-lp-secondary p-[10px] border rounded-2xl">
                Save draft
              </button>
            </div>
          </div>
        </div>
        <div className="w-[48%] bg-blue-400"></div>
      </div>
    </div>
  );
}

export default Announcement;
