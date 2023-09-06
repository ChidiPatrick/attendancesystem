import React from "react";

/// Third party Imports
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";

// Local directory imports ///
import { toggleMenu } from "../Handlers/menu.handlers";
import { showMenu, hideMenu } from "../../Redux Slices/menu.slice";
import { useDispatch } from "react-redux";
import Menu from "./menu";

function NavBar({ children }) {
  const dispatch = useDispatch();

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  return (
    <nav className="z-[999] ">
      <div className="grid grid-cols-12 justify-center">
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
        <h3 className="text-xl col-start-3 col-end-12 font-bold  text-center ">
          {children}
        </h3>
      </div>
    </nav>
  );
}

export default NavBar;
