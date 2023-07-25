import React from "react";

export const ButtonFull = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2 w-40 bg-lp-secondary text-white text-lg border rounded-full"
    >
      {children}
    </button>
  );
};

export const ButtonLight = ({ children, handleSignin }) => {
  return (
    <button
      onClick={handleSignin}
      className="p-2 shadow-lg w-40 bg-white text-lp-secondary text-lg border border-solid border-lp-secondary rounded-full"
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
