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
      className={"w-full h-full bg-opacity-1 absolute"}
    >
      {/* <div>close</div> */}
      <ul className="w-1/2 bg-white cursor-pointer">
        <div className="p-2 font-bold">
          <HiX
            className="text-2xl"
            onClick={() => toggleMenu(dispatch, hideMenu)}
          />
        </div>
        <div
          className="p-2 font-bold"
          onClick={() => handleNavigation(navigate, "home", dispatch, hideMenu)}
        >
          Home
        </div>
        <div
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "userprofile", dispatch, hideMenu)
          }
        >
          My Profile
        </div>
        <div
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "permission", dispatch, hideMenu)
          }
        >
          Seek Permission
        </div>
        <div
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "history", dispatch, hideMenu)
          }
        >
          History
        </div>
        <div
          className="p-2 font-bold"
          onClick={() => handleNavigation(navigate, "", dispatch, hideMenu)}
        >
          Home
        </div>
        <div
          className="p-2 font-bold"
          onClick={() =>
            handleNavigation(navigate, "announcement", dispatch, hideMenu)
          }
        >
          Announcement
        </div>
        <div
          onClick={() => logout(auth, navigate, dispatch, hideMenu)}
          className="p-2 font-bold"
        >
          Log out
        </div>
      </ul>
    </div>
  );
}

export default Menu;
