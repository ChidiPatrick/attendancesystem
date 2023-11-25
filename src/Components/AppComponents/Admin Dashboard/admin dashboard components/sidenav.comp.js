import React from "react";

// Third-party imports
import {
  HiOutlineAcademicCap,
  HiOutlineCircleStack,
  HiListBullet,
  HiOutlineUser,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import { GrAnnounce } from "react-icons/gr";
import { BiLogIn } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

// Local directory imports
import { logout } from "../../../General app handlers/general.handlers";
import { auth } from "../../../Firebase/firebase";
import { hideMenu } from "../../../Redux Slices/menu.slice";

function SideNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const adminData = useSelector((state) => state.adminSlice.adminData);
  console.log(adminData);

  return (
    <div className="bg-[#F6F9FE] flex flex-col justify-between  items-center p-[20px] min-h-screen w-[260px]">
      <div className="min-h-screen">
        <figure className="w-full">
          <img src="images/logo.svg" />
        </figure>
        <ul>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <Link
              className="flex w-[200px] items-center"
              to="/adminDashboard/adminDashboard"
            >
              <MdDashboard className="mr-[10px]" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <Link
              className="flex w-[200px] items-center"
              to="/adminDashboard/adminAnnouncements"
            >
              <GrAnnounce className="mr-[10px]" />
              <span>Announcement</span>
            </Link>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <Link
              className="flex w-[200px] items-center"
              to="/adminDashboard/StudentsBio"
            >
              <HiOutlineAcademicCap className="mr-[10px]" />
              <span>Students</span>
            </Link>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <Link
              className="flex w-[200px] items-center"
              to="/adminDashboard/classSetup"
            >
              <HiOutlineCircleStack className="mr-[10px]" />
              <span>Class setup</span>
            </Link>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <Link
              className="flex w-[200px] items-center"
              to="/adminDashboard/attendanceDispalyUI"
            >
              <HiListBullet className="mr-[10px]" />
              <span>Attendance</span>
            </Link>
          </li>
          <li
            className="flex w-full my-[10px] p-[10px]"
            activeClassName="bg-[#E9EFFC]"
          >
            <Link to="adminProfile" className="flex w-[200px] items-center">
              <HiOutlineUser className="mr-[10px]" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        onClick={() => logout(auth, navigate, dispatch, hideMenu)}
        className="flex font-bold  w-[200px] items-center"
      >
        <BiLogIn
          onClick={() => logout(auth, navigate, dispatch, hideMenu)}
          className="mr-[10px]"
          size={20}
        />{" "}
        <span>Logout</span>
      </div>
    </div>
  );
}

export default SideNavigation;
