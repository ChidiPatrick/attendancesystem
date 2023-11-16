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
import { getStudentPermissionRequests } from "../Handlers/permission.handler";

function NavBar({ children }) {
  const dispatch = useDispatch();

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  const studentBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const userId = useSelector((state) => state.loginSlice.userId);

  // const studentBioObject = getStudentPermissionRequests(
  //   studentBioArray,
  //   userId
  // );

  // // const {}
  // console.log(studentBioObject);

  return (
    <nav className="z-[999] relative">
      <div className="grid grid-cols-12 justify-center w-full">
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
          <div
            className={`flex justify-center relative items-center text-[#4A4A4A] w-[50px] h-[50px] border border-tranparent rounded-full bg-[#FF52521A]`}
          >
            <IoNotificationsOutline size={30} />
          </div>
        </h3>
      </div>
    </nav>
  );
}

export default NavBar;
