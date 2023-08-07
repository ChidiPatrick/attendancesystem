import React from "react";

/// Third-party imports ///
import { useSelector } from "react-redux";

/// Local directory imports ///
import NavBar from "./navBar";
import Menu from "./menu";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";

function UploadProfilePicture() {
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  return (
    <div className="w-full h-screen bg-user-profile p-4">
      <NavBar>profile picture</NavBar>
      <div className="my-[100px] flex flex-col justify-center items-center">
        <h3 className="font-bold text-xl my-5">Set Profile Picture</h3>
        <p className="text-center">
          Please upload a clear picture of you for your profile
        </p>
        <div className="w-full flex justify-center items-center my-20">
          <ButtonFull>Upload picture</ButtonFull>
        </div>
      </div>
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default UploadProfilePicture;
