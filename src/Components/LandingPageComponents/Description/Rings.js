import React from "react";

const Rings = () => {
  return (
    <div className=" w-[120px] h-[120px] md:w-[200px] md:h-[200px] lg:w-[350px] lg:h-[350px] absolute -right-12 -top-8 md:-right-20 md:-top-24">
      <span className=" w-[120px] h-[120px] md:w-[200px] md:h-[200px] lg:w-[350px] lg:h-[350px] border-[0.5px] border-[#FFF] border-solid rounded-full  flex justify-center items-center">
        <span className=" w-[100px] h-[100px] md:w-[180px] md:h-[180px] lg:w-[320px] lg:h-[320px] border-[0.5px] border-[#FFF] border-solid rounded-full  flex justify-center items-center">
          <span className=" w-[80px] h-[80px] md:w-[160px] md:h-[160px] lg:w-[290px] lg:h-[290px] border-[0.5px] border-[#FFF] border-solid rounded-full  flex justify-center items-center"></span>
        </span>
      </span>
    </div>
  );
};

export default Rings;
