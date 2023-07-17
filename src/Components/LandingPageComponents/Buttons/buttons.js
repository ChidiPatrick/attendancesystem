import React from "react";

export const ButtonFull = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-2 w-40 bg-lp-secondary hover:bg-green-600 text-white text-lg border rounded-full"
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
