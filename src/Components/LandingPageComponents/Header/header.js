/// React in-built packages imports //////////
import React from "react";

///// Third party imports /////////////
import {
  ButtonFull,
  ButtonLight,
} from "../../LandingPageComponents/Buttons/buttons";
import { useNavigate } from "react-router";

// import { useDispatch } from "react-redux";

/// Local directory imports ///////////////////

const Header = () => {
  //// Initializtions /////////////
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const signupBtnClickHandler = () => {
    console.log("Clicked!");
    navigate("/signup");
  };

  const signinBtnClickHandler = () => {
    navigate("/signin");
  };
  return (
    <header id="home" className=" w-full py-6 h-auto">
      <div className=" w-[90%] md:w-[80%] mx-auto">
        <h1 className="flex flex-col">
          <span className="mt-3 text-sm md:text-lg font-semibold text-center text-[#333] tracking-4">
            GPS ENABLED
          </span>
          <span className=" text-xl md:text-2xl text-center text-lp-primary font-bold my-4">
            ATTENDANCE MANAGEMENT SYSTEM
          </span>
        </h1>
        <p className="text-[14px] md:text-base text-center mt-4 text-lp-font-color md:w-[60%] mx-auto">
          Attendance made easy, with a touch of technology! Let our GPS and
          facial recognition technology work their wonders, while you focus on
          being present in the moment.
        </p>
        <div className="w-full flex place-content-center mt-5">
          <img src="./images/herolIlustrator.svg" alt="illustrator image" />
        </div>
        <div className="mt-10 mx-auto flex justify-between md:justify-center w-full gap-3 md:gap-6">
          <ButtonFull handleClick={signupBtnClickHandler}>Sign Up</ButtonFull>
          <ButtonLight handleClick={signinBtnClickHandler}>Log In</ButtonLight>
        </div>
      </div>
    </header>
  );
};

export default Header;
