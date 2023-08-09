import { disableNetwork } from "firebase/firestore";
import React from "react";

export const ButtonFull = ({ children, handleClick, disble }) => {
  return (
    <button
      onClick={handleClick}
      className="px-1 py-2 md:px-[16] font-semibold md:py-2 w-40 bg-lp-secondary text-white text-lg border rounded-3xl"
    >
      {children}
    </button>
  );
};

export const ButtonLight = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="px-1 py-2 md:px-2 md:py-3 shad font-semibold w-40 bg-white text-lp-secondary text-lg border-[0.5] border-solid border-lp-secondary rounded-3xl"
    >
      {children}
    </button>
  );
};

export const ButtonSmall = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2 bg-lp-secondary text-white w-28  border rounded-xl"
    >
      {children}
    </button>
  );
};

export const ButtonSmallLight = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2   w-28  border rounded-xl border-lp-secondary text-lp-secondary"
    >
      {children}
    </button>
  );
};

export const ButtonFullLong = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2 w-3/4  bg-lp-secondary text-white text-lg border rounded-full"
    >
      {children}
    </button>
  );
};
