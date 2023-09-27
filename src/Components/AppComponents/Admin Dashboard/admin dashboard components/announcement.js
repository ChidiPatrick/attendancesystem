import React, { useState } from "react";
// Third-party imports
import { Link } from "react-router-dom";
// Local Directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import { HiDotsVertical } from "react-icons/hi";
import NotificationBar from "./notification.bar";

function Announcement() {
  // Local states
  const [showShortcut, setShowShortcut] = useState(false);

  return (
    <div className="w-full bg-[#FFFDFA] min-h-screen p-[10px]">
      <div className="border border-transparent border-b-gray-600">
        <DashboardNavigationComponent title="Announcement" />
      </div>
      <div className="flex justify-between  mt-[10px] ">
        <div className="w-[48%] min-h-[500px] bg-[#FFFDFA] p-[10px]">
          <div className="w-[100%] h-[500px] bg-[#f1f1f1] border border-transparent rounded-xl p-[10px]">
            <h2 className="font-bold text-[19px]">Type Announcement</h2>
            <div className="w-full mt-[20px]">
              <h4 className="text-[20px] pb-[10px]">Title</h4>
              <input
                className="p-[10px] w-[100%] bg-transparent border border-gray-700 rounded-md "
                placeholder="Enter holiday title"
              />
            </div>
            <div className="w-[100%] mt-[20px]">
              <h4 className="text-[20px] pb-[10px]">Content</h4>
              <textarea
                className="w-[100%] bg-transparent border border-gray-700 px-[10px] min-h-[200px] rounded-md"
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
          <div className="w-[100%] my-[20px]">
            <h3 className="font-bold text-[18px]">History</h3>
            <div>
              <div>
                <h4 className="font-bold py-[10px]">Public Holiday</h4>
                <p>
                  Tomorrow is holiday with no title, please just stay at home.
                  I'm just trying to write something for this paragraph. So just
                  know that you have holiday for the day in the day that we
                  having coming for the holiday!
                </p>
                <div className="text-lp-primary font-bold flex justify-between items-center mt-[20px]">
                  <div className="w-[20%] flex justify-between">
                    <span>06/19</span>
                    <span>7:31am</span>
                  </div>
                  <span className="text-lp-secondary">Sent</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold py-[10px]">Public Holiday</h4>
                <p>
                  Tomorrow is holiday with no title, please just stay at home.
                  I'm just trying to write something for this paragraph. So just
                  know that you have holiday for the day in the day that we
                  having coming for the holiday!
                </p>
                <div className="text-lp-primary font-bold flex justify-between items-center mt-[20px]">
                  <div className="w-[20%] flex justify-between">
                    <span>06/19</span>
                    <span>7:31am</span>
                  </div>
                  <span className="text-lp-secondary">Sent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[48%] min-h-screen bg-[#FFFDFA] p-[10px]">
          <h3 className="font-bold text-[20px]">Notifications</h3>
          <div>
            <h4 className="font-bold py-[10px] mt-[10px]">Today</h4>
            <div></div>
          </div>
          <NotificationBar />
          <NotificationBar />
        </div>
      </div>
    </div>
  );
}

export default Announcement;
