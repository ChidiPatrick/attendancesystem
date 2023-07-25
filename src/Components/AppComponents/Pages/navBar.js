import React from "react";

/// Third party Imports
import { HiMenu } from "react-icons/hi";

function NavBar({ children }) {
  return (
    <div>
      <div className="grid grid-cols-8 mt-5">
        <div className="flex justify-center items-centers flex-col">
          <div>
            <HiMenu className="font-bold text-xl" />
          </div>
        </div>
        <h3 className="text-xl col-start-2 col-end-9 font-bold p-2 text-center ">
          {children}
        </h3>
      </div>
    </div>
  );
}

export default NavBar;
