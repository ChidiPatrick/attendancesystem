import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Third-party imports
import {
  HiOutlineAcademicCap,
  HiOutlineCircleStack,
  HiListBullet,
  HiOutlineUser,
} from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
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
            <NavLink to="adminProfile" className="flex w-[200px] items-center">
              <HiOutlineUser className="mr-[10px]" />
              <span>Profile</span>
            </NavLink>
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
