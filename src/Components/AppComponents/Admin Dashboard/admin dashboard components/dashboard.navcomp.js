import React, { useEffect } from "react";

// Third-party imports
import { HiOutlineAcademicCap, HiOutlineCircleStack } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { newAnnouncementAddedEventHandler } from "../admin dashboard handlers/admin.announcement.handler";
import { useDispatch, useSelector } from "react-redux";

function DashboardNavigationComponent({ title }) {
  const dispatch = useDispatch();
  const notificationCounter = useSelector(
    (state) => state.announcementSlice.notificationCounter
  );

  console.log(notificationCounter);
  useEffect(() => {
    newAnnouncementAddedEventHandler(dispatch);
  }, []);

  return (
    <div className="w-full bg-[#F6F9FE] grid grid-cols-12 items-center p-[10px] h-[100px]">
      <div className="font-bold text-xl col-start-1 col-end-3">{title}</div>
      <div className="flex justify-between  items-center w-[300px] border border-[#4A4A4A] rounded-full col-start-5 col-end-8 bg-white h-[40px] p-[5px]">
        <input
          type="text"
          placeholder="search student's name"
          className="w-[80%] focus:outline-none"
        />
        <AiOutlineSearch size={25} className="text-[#4A4A4A]" />
      </div>
      <div className="col-start-9 col-end-13  w-[400px] h-[100%]">
        <div className="w-[100%] h-[100%] flex justify-between p-[10px] items-center">
          <div
            className={
              notificationCounter === 0
                ? "flex justify-center relative items-center text-[#4A4A4A] w-[50px] h-[50px] border border-tranparent rounded-full bg-[#FF52521A]"
                : `w-[50px] flex relative animate-pulse text-[#CC0000] justify-center items-center h-[50px] border border-tranparent rounded-full bg-[#FF52521A]`
            }
          >
            {notificationCounter === 0 ? null : (
              <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-[#CC0000] text-[12px] absolute top-[-10%] right-[-5%] text-[#fff]">
                {notificationCounter}
              </div>
            )}
            <IoNotificationsOutline size={30} />
          </div>
          <div className="text-[#4A4A4A] bg-[#ecf0f1] flex items-center justify-center border rounded-full w-[50px] h-[50px]">
            <HiOutlineAcademicCap size={30} />
          </div>
          <div className="bg-[#ecf0f1] flex items-center justify-center border rounded-full w-[50px] h-[50px]">
            <HiOutlineCircleStack size={30} />
          </div>
          <figure className="w-[50px] h-[50px] border rounded-full bg-gray-50">
            <img
              src="images/skalo.jpg"
              className="w-[100%] h-[100%] border rounded-full"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavigationComponent;
