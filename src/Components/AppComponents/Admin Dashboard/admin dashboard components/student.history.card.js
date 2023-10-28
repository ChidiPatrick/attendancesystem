import React from "react";

function StudentHistoryCard({ title, iconName, children }) {
  return (
    <div className="w-[150px] shadow-md border rounded-xl h-[150px] bg-[#FBFCFE] p-[10px]">
      <h6 className="text-gray-700 flex justify-between items-center w-[90%]">
        <div>{title}</div>
        <div
          className={`w-[10px] h-[10px]  border border-transparent rounded-sm`}
        >
          <img src={`images/${iconName}`} />
        </div>
      </h6>
      <div>{children}</div>
    </div>
  );
}

export default StudentHistoryCard;
