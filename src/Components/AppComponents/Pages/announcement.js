import React from "react";

/// Third party imports ////
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Local directory Imports ////
import NavBar from "./navBar";
import Menu from "./menu";
function Announcement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  return (
    <div className="p-2">
      <NavBar>Announcement</NavBar>
      <div>
        <div className="mt-5 border-b border-signup-gray py-3">
          <div className="flex justify-between items-center mb-5">
            <div>May 23, 2023</div>
            <div>09:24am</div>
          </div>
          <p>
            Time for classes have changed from 10:00am to 11:00am, Kindly take
            note as changes will be effected on the attendance system on May 12,
            2023.
          </p>
        </div>
        <div className="mt-5 border-b border-signup-gray py-3">
          <div className="flex justify-between items-center mb-5">
            <div>May 23, 2023</div>
            <div>09:24am</div>
          </div>
          <p>Your request for permission was declined.</p>
        </div>
      </div>
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default Announcement;
