import React from "react";
import { ButtonFull } from "../Buttons/buttons";
import { FaBars } from "react-icons/fa";

const LandingPageNavbar = () => {
  const constants = [
    { name: "Home", link: "home", id: "001" },
    { name: "How it works", link: "works", id: "002" },
    { name: "Features", link: "features", id: "003" },
  ];
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <nav className=" w-full py-6 ">
      <div className="w-[90%] md:w-[80%] mx-auto flex justify-between items-center">
        <div className=" flex gap-3 items-center">
          <span className="md:hidden">
            <FaBars size={20} />
          </span>
          <span className=" md:w-[70px] md:h-[70px]">
            <img
              src="./images/logo.svg"
              alt="logo"
              className=" w-full h-full"
            />
          </span>
        </div>
        <div className="hidden md:block">
          <ul className="flex lg:pl-[140px] gap-12 font-semibold text-md">
            {constants.map(({ name, link, id }) => (
              <li key={id} onClick={() => scrollToSection(link)}>
                <span className=" cursor-pointer hover:text-[orange] myblack">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <ButtonFull>Get Started</ButtonFull>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
