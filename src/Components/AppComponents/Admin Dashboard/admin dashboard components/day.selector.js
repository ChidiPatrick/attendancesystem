import { click } from "@testing-library/user-event/dist/click";
import React, { useState } from "react";

function DaySelector({ children }) {
  const [clicked, setClicked] = useState(true);

  return (
    <div
      onClick={() => setClicked(!clicked)}
      className={
        clicked !== true
          ? `w-[70px] flex justify-center border rounded-xl items-center text-white bg-lp-primary h-[40px] p-[10px]`
          : "w-[70px] flex justify-center  bg-gray-300 border border-solid border-gray-600 rounded-xl items-center h-[40px] p-[10px]"
      }
    >
      {children}
    </div>
  );
}

export default DaySelector;
