/// React in-built packages imports //////////
import React from "react";

///// Third party imports /////////////
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

// HiChevronLeft

/// Local directory imports ///////////////////

const Header = () => {
  //// Initializtions /////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupBtnClickHandler = () => {
    console.log("Clicked!");
    navigate("/signup");
  };

  const signinBtnClickHandler = () => {
    navigate("/signin");
  };
  return (
    <header className="p-2">
      <h1 className="flex flex-col">
        <span className="mt-3 text-md font-bold text-center text-lp-font-color-300">
          GPS ENABLED
        </span>
        <span className="text-2xl text-center text-lp-primary font-bold my-4">
          ATTENDANCE MANAGEMENT SYSTEM
        </span>
      </h1>
      <p className="text-center mt-4 text-lp-font-color">
        Attendance made easy, with a touch of technology! Let our GPS and facial
        recognition technology work their wonders, while you focus on being
        present in the moment.
      </p>
      <div className="w-full flex place-content-center mt-5">
        <img src="./images/herolIlustrator.svg" alt="illustrator image" />
      </div>
      <div className="mt-10 mx-auto flex justify-between w-full">
        <ButtonFull handleClick={signupBtnClickHandler}>Sign Up</ButtonFull>
        <ButtonLight handleSignin={signinBtnClickHandler}>Sign Up</ButtonLight>
      </div>
    </header>
  );
};

export default Header;

// colors: {
//   "lp-primary": "#1946A6",
//   "lp-secondary": "#F78F1E0D",
//   "lp-gradient-start": "#1946A6",
//   "lp-gradient-end": "#6B19A600",
//   "lp-font-color": "#333333",
// },
