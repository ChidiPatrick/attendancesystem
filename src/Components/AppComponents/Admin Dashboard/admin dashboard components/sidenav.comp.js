import React from "react";
import { NavLink } from "react-router-dom";

// Third-party imports
import {
  HiOutlineAcademicCap,
  HiOutlineCircleStack,
  HiListBullet,
  HiOutlineUser,
} from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";
import { BiLogIn } from "react-icons/bi";
import { useSelector } from "react-redux";

function SideNavigation() {
  // Redux states
  const adminData = useSelector((state) => state.adminSlice.adminData);
  console.log(adminData);

  return (
    <div className="bg-[#F6F9FE] flex flex-col justify-between  items-center p-[20px] min-h-screen w-[260px]">
      <div>
        <figure className="w-full">
          <img src="images/logo.svg" />
        </figure>
        <ul>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <NavLink
              className="flex w-[200px] items-center"
              to="/adminDashboard/adminDashboard"
            >
              <HiOutlineAcademicCap className="mr-[10px]" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <NavLink
              className="flex w-[200px] items-center"
              to="/adminDashboard/adminAnnouncements"
            >
              <GrAnnounce className="mr-[10px]" />
              <span>Announcement</span>
            </NavLink>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <NavLink className="flex w-[200px] items-center" to="classSetup">
              <HiOutlineCircleStack className="mr-[10px]" />
              <span>Class setup</span>
            </NavLink>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <NavLink
              className="flex w-[200px] items-center"
              to="attendanceDispalyUI"
            >
              <HiListBullet className="mr-[10px]" />
              <span>Attendance</span>
            </NavLink>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <NavLink className="flex w-[200px] items-center">
              <HiOutlineUser className="mr-[10px]" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex font-bold  w-[200px] items-center">
        <BiLogIn className="mr-[10px]" size={20} /> <span>Logout</span>
      </div>
    </div>
  );
}

export default SideNavigation;
