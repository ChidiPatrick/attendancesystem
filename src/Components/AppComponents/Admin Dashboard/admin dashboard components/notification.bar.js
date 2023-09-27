import React, { useState } from "react";

// Third-pary imports
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

function NotificationBar() {
  // Local states
  const [showShortcut, setShowShortcut] = useState(false);

  // Handle Toggling
  const toggleUI = (e) => {
    if (e.target.id === "popUpWrapper" || e.target.id === "icon") {
      setShowShortcut(!showShortcut);
    }
    console.log(e.target);
  };

  return (
    // <div className="z-1000 relative">
    <div className="w-[100%] z-1000 relative my-[10px] flex items-center bg-[#d7d7d7] p-[10px] border border-transparent rounded-md">
      <figure className="w-[40px] h-[40px] mr-[10px] border border-transparent rounded-full bg-gray-600"></figure>
      <div className="w-[100%]">
        <div className="font-bold flex justify-between items-center mb-[10px]">
          <span>Charlse Soludo</span>

          <HiDotsVertical onClick={(e) => toggleUI(e)} id="icon" />
        </div>
        <div className="flex justify-between items-center w-[100%]">
          <div>Permission Request</div>
          <div className="">
            <span className="mr-[20px]">27/09/2023</span>
            <span>8:14am</span>
          </div>
        </div>
        <div
          id="popUpWrapper"
          onClick={(e) => toggleUI(e)}
          className={
            showShortcut === true
              ? `flex justify-between  flex-col items-start w-[200px] absolute top-[-180%] right-[0] p-[10px] bg-[#f4f4f4] min-h-[100px]`
              : "hidden"
          }
        >
          <Link to="#" className="p-[10px]">
            View profile
          </Link>
          <button className="p-[10px]">Approve</button>
          <button className="p-[10px]">Deny</button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default NotificationBar;
