import React from "react";

// Third-party imports

function SummaryBox({ bgValue, title, IconName, number, valueIdentifier }) {
  const color = "#2926B8";
  return (
    <div
      className={`w-[320px]  text-white border rounded-xl ${bgValue} h-[200px] p-[10px]`}
    >
      <div className="flex justify-between items-center ">
        <p className="text-[#D5D5F6]">{title}</p>
        <figure className="w-[30px] h-[30px] flex justify-center items-center border rounded-full bg-[#D5D5F6] bg-gray-50">
          <IconName size={15} className="text-[#2926B8]" />
        </figure>
      </div>
      <div
        className={`w-full flex justify-center my-[50px] items-center font-bold text-3xl`}
      >
        <div>{number}</div>
        <span className="font-sm text-sm ml-[5px]">{valueIdentifier}</span>
      </div>
    </div>
  );
}

export default SummaryBox;
