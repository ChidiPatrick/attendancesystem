import React from "react";

// Third party imports ///
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

//Local directory imports ///
import { handleNavigation } from "../Handlers/menu.handlers";
import { useNavigate } from "react-router";
import { hideMenu } from "../../Redux Slices/menu.slice";
import { toggleMenu } from "../Handlers/menu.handlers";
import { logout } from "../../General app handlers/general.handlers";
import { auth } from "../../Firebase/firebase";

function Menu() {
  /// Initial invocations ///
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Menu slice state access ///
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  console.log(displayMenu);
  return (
    <div
      onClick={() => toggleMenu(dispatch, hideMenu)}
      className="w-full z-1200 absolute top-0 left-0 h-full bg-blue-300 bg-opacity-20"
    >
      <ul className="w-full bg-gray-100 cursor-pointer flex flex-col ">
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
          onClick={() =>
            handleNavigation(navigate, "userprofile", dispatch, hideMenu)
          }
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
        {/* <li
          className="p-2 font-bold"
          onClick={() => handleNavigation(navigate, "", dispatch, hideMenu)}
        >
          Home
        </li> */}
        {/* <li
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "announcement", dispatch, hideMenu)
          }
        >
          Announcement
        </li> */}
        <li
          onClick={() => logout(auth, navigate, dispatch, hideMenu)}
          className="p-2 font-bold"
        >
          Log out
        </li>
      </ul>
    </div>
  );
}

export default Menu;
