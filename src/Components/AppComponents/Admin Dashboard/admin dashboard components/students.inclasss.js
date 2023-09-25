import React from "react";

function StudentsInclass() {
  return (
    <div className="w-[300px] p-[10px] h-[300px] border rounded-md bg-[#FBFCFE]">
      <h3 className="w-full flex justify-between font-bold ">
        <span>Students in class</span>
        <span className="text-[#4A4A4A] font-md">30/150</span>
      </h3>
      <div>
        <div className="flex items-center mt-[20px]">
          <figure className="w-[20px] h-[20px] border rounded-full bg-green-400"></figure>
          <div className="w-full ml-[10px]">
            <div>Okafor Patrick</div>
            <div className="text-lp-primary font-bold text-[13px] flex justify-between">
              <div>Present</div>
              <div className="text-black ">8:00am</div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[20px]">
          <figure className="w-[20px] h-[20px] border rounded-full bg-green-400"></figure>
          <div className="w-full ml-[10px]">
            <div>Uju Agbo</div>
            <div className="text-lp-primary font-bold text-[13px] flex justify-between">
              <div>Present</div>
              <div className="text-black ">12:00am</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsInclass;
