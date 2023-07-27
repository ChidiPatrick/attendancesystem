import React from "react";

/// Third party Imports
import { HiMenu } from "react-icons/hi";

// Local directory imports ///
import { toggleMenu } from "../Handlers/menu.handlers";
import { showMenu, hideMenu } from "../../Redux Slices/menu.slice";
import { useDispatch } from "react-redux";

function NavBar({ children }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="grid grid-cols-12 mt-5">
        <div className="flex justify-center items-centers flex-col">
          <div>
            <HiMenu
              className="font-bold text-xl"
              onClick={() => toggleMenu(dispatch, showMenu)}
            />
          </div>
        </div>
        <h3 className="text-xl col-start-5 col-end-9 font-bold p-2 text-center ">
          {children}
        </h3>
      </div>
    </div>
  );
}

export default NavBar;
