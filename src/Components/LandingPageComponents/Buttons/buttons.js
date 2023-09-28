import { disableNetwork } from "firebase/firestore";
import React from "react";

export const ButtonFull = ({ children, handleClick, disble }) => {
  return (
    <button
      onClick={handleClick}
      className="px-1 py-2 hover:bg-[#c77217] md:px-[16] font-semibold md:py-2 w-40 bg-lp-secondary text-white text-lg border rounded-3xl"
    >
      {children}
    </button>
  );
};

export const ButtonLight = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="px-1 py-2 hover:bg-[#c77217] md:px-2 md:py-3 shad font-semibold w-40 bg-white text-lp-secondary text-lg border-[0.5] border-solid border-lp-secondary rounded-3xl"
    >
      {children}
    </button>
  );
};

export const ButtonSmall = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="px-4 hover:bg-[#c77217] bg-lp-secondary text-white text-[14px] md:text-base py-1 border-none outline-none rounded-xl"
    >
      {children}
    </button>
  );
};

export const ButtonSmallLight = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2 hover:bg-[#c77217]  w-28  border rounded-xl border-lp-secondary text-lp-secondary"
    >
      {children}
    </button>
  );
};

export const ButtonFullLong = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2 w-3/4 hover:bg-[#c77217]  bg-lp-secondary text-white text-lg border rounded-full"
    >
      {children}
    </button>
  );
};
