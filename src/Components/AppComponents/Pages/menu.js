import React from "react";

// Third party imports ///
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

//Local directory imports ///
import { handleNavigation } from "../Handlers/menu.handlers";
import { useNavigate } from "react-router";
import { hideMenu } from "../../Redux Slices/menu.slice";
import { toggleMenu } from "../Handlers/menu.handlers";

function Menu() {
  /// Initial invocations ///
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Menu slice state access ///
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  console.log(displayMenu);
  return (
    <div
      className={
        "w-full h-screen bg-black bg-opacity-10 absolute top-0 left-0 p-2"
      }
    >
      {/* <div>close</div> */}
      <ul className="w-1/2 bg-white">
        <li className="p-2 font-bold">
          <HiX
            className="text-2xl"
            onClick={() => toggleMenu(dispatch, hideMenu)}
          />
        </li>
        <li
          className="p-2 font-bold"
          onClick={() => handleNavigation(navigate, "home", dispatch, hideMenu)}
        >
          Home
        </li>
        <li
          className="p-2 font-bold"
          onClick={() => handleNavigation(navigate, "home", dispatch, hideMenu)}
        >
          My Profile
        </li>
        <li
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "permission", dispatch, hideMenu)
          }
        >
          Seek Permission
        </li>
        <li
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "history", dispatch, hideMenu)
          }
        >
          History
        </li>
        <li
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "markAttendance", dispatch, hideMenu)
          }
        >
          Mark attendance
        </li>
        <li
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "announcement", dispatch, hideMenu)
          }
        >
          Announcement
        </li>
        <li className="p-2 font-bold">Log out</li>
      </ul>
    </div>
  );
}

export default Menu;
