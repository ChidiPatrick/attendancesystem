import React from "react";

/// Third party Imports
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

// Local directory imports ///
import { toggleMenu } from "../Handlers/menu.handlers";
import { showMenu, hideMenu } from "../../Redux Slices/menu.slice";
import Menu from "./menu";
import { getStudentsBioArray } from "../Admin Dashboard/admin dashboard handlers/admin.handlers";
import {
  getStudentPermissionRequests,
  getUnreadResponseNumber,
} from "../Handlers/permission.handler";
import { Link } from "react-router-dom";

function NavBar({ children }) {
  const dispatch = useDispatch();

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const userId = useSelector((state) => state.loginSlice.userId);

  const unreadResponses = useSelector(
    (state) => state.permissionSlice.unreadResponses
  );

  // Get number of unread notifications
  getUnreadResponseNumber(dispatch, userId);

  return (
    <nav className="z-[999] relative p-[10px]">
      <div className="grid grid-cols-12 justify-center items-center w-full">
        {displayMenu !== true ? (
          <div>
            <HiMenu
              className="font-bold text-xl"
              onClick={() => toggleMenu(dispatch, showMenu)}
            />
          </div>
        ) : (
          <Menu />
        )}
        <h3 className="text-xl col-start-3 col-end-12 font-bold  text-center flex justify-between items-center ">
          <div className="w-[75%]"> {children}</div>
          {unreadResponses === 0 ? null : (
            <Link
              to="/userprofile"
              className={
                unreadResponses === 0
                  ? "flex justify-center relative items-center text-[#4A4A4A] w-[50px] h-[50px] border border-tranparent rounded-full bg-[#FF52521A]"
                  : `w-[50px] flex relative animate-pulse text-[#CC0000] justify-center items-center h-[50px] border border-tranparent rounded-full bg-[#FF52521A]`
              }
            >
              {unreadResponses === 0 ? null : (
                <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-[#CC0000] text-[12px] absolute top-[-10%] right-[-5%] text-[#fff]">
                  {unreadResponses}
                </div>
              )}
              <IoNotificationsOutline size={30} />
            </Link>
          )}
        </h3>
      </div>
    </nav>
  );
}

export default NavBar;
