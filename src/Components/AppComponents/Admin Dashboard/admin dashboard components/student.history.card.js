import React from "react";

function StudentHistoryCard({ title, grFrom, grTo, children }) {
  return (
    <div className="w-[150px] shadow-md border rounded-xl h-[150px] bg-[#FBFCFE] p-[10px]">
      <h6 className="text-gray-700 flex justify-between items-center w-[90%]">
        <div>{title}</div>
        <div
          className={`w-[10px] h-[10px] bg-purple-800  border border-transparent rounded-sm`}
        ></div>
      </h6>
      <div>{children}</div>
    </div>
  );
}

export default StudentHistoryCard;
