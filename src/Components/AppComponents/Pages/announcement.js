import React from "react";

/// Third party imports ////
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Local directory Imports ////
import NavBar from "./navBar";
import Menu from "./menu";
function Announcement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  return (
    <div className="w-full   py-6 h-auto  mx-auto">
      <div className="mx-auto max-w-[650px] w-[90%] md:w-full relative">
        <div className=" flex items-center bg-mywhite sticky top-0 z-[999] mb-6">
          <span className=" w-10 ">
            <NavBar />
          </span>
          <h3 className=" mx-auto font-semibold text-xl ">Announcement</h3>
          {displayMenu === true ? <Menu /> : null}
        </div>
        <div>
          <div className=" flex justify-between items-center py-3 text-[#222] font-semibold text-[15px] md:text-base">
            <p>May 23, 2023</p>
            <p>09:24am</p>
          </div>
          <p className=" pb-5 border-b-[#444] border-b-[0.2px] text-[14px] md:text-base">
            Time for classes have changed from 10:00am to 11:00am, Kindly take
            note as changes will be effected on the attendance system on May 12,
            2023
          </p>
        </div>

        <div>
          <div className=" flex justify-between items-center py-3 text-[#222] font-semibold text-[15px] md:text-base">
            <p>May 05, 2023</p>
            <p>09:44am</p>
          </div>
          <p className=" pb-5 border-b-[#444] border-b-[0.2px] text-[14px] md:text-base">
            Your request for permission was declined.
          </p>
        </div>

        <div>
          <div className=" flex justify-between items-center py-3 text-[#222] font-semibold text-[15px] md:text-base">
            <p>May 05, 2023</p>
            <p>09:44am</p>
          </div>
          <p className=" pb-5 border-b-[#444] border-b-[0.2px] text-[14px] md:text-base">
            Classes will be closed for public holidays
          </p>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
