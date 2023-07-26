import React from "react";

// Third party imports ///
import { HiX } from "react-icons/hi";

function Menu() {
  return (
    <div className="w-full h-screen bg-black bg-opacity-10 absolute top-0 left-0">
      {/* <div>close</div> */}
      <ul className="w-1/2 bg-white">
        <li className="p-2 font-bold">
          <HiX className="text-2xl" />
        </li>
        <li className="p-2 font-bold">Home</li>
        <li className="p-2 font-bold">My Profile</li>
        <li className="p-2 font-bold">Seek Permission</li>
        <li className="p-2 font-bold">History</li>
        <li className="p-2 font-bold">Announcement</li>
        <li className="p-2 font-bold">Log out</li>
      </ul>
    </div>
  );
}

export default Menu;
