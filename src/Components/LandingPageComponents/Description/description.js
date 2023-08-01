import React from "react";

import { HiCheck } from "react-icons/hi";
import { BsArrowRight, BsArrowDown } from "react-icons/bs";
import Rings from "./Rings";

// bg-gradient-to-br from-lp-gradient-start to-lp-gradient-end

const Description = () => {
  return (
    <section
      id="works"
      className=" w-full mt-6 py-6 mygradient  h-auto relative "
    >
      <Rings />
      <div className=" w-[90%] md:w-[60%} mx-auto  md:py-4 py-6">
        <h2 className="text-center font-bold text-xl md:text-2xl text-white mb-6">
          How It Works
        </h2>
        {/* <figure className="w-screen flex justify-center item-center">
          <img className="" src="/images/howItWorks.svg" />
        </figure> */}

        <div className=" flex flex-col lg:flex-row">
          <div className="  w-full h-auto md:w-[700px] md:h-[500px] mx-auto flex flex-col items-center ">
            <img className="w-full object-fill " src="/images/howItWorks.svg" />
          </div>
          <div className=" w-full lg:w-[40%] lg:ml-2">
            {/* LARGE SCREEN ONLY DESIGN  */}
            <ul className=" flex-col gap-8 text-white hidden lg:flex">
              <li className="mt-2 flex gap-4 items-center">
                <span className=" bg-num p-4 rounded-full relative">
                  <span className=" number-center text-white">1</span>
                </span>
                <span>SIGN UP</span>
              </li>
              <li className=" px-12">
                <span className=" text-white">
                  <BsArrowDown size={40} className=" -rotate-45 " />
                </span>
              </li>
              <li className=" flex gap-4 items-center px-20">
                <span className=" bg-white p-4 rounded-full bg-num  relative">
                  <span className=" text-white number-center ">2</span>
                </span>
                <span>SETUP FACE ID</span>
              </li>
              <li className=" px-20">
                <span className=" text-white rotate-[45deg]">
                  <BsArrowDown size={40} />
                </span>
              </li>
              <li className=" flex gap-4 items-center px-20">
                <span className=" bg-white p-4 rounded-full bg-num relative">
                  <span className=" text-white number-center ">3</span>
                </span>
                <span>SCAN FACE AT SCHOOL</span>
              </li>
              <li className="px-12">
                <span className=" text-white rotate-[45deg]">
                  <BsArrowDown size={40} className=" rotate-45 " />
                </span>
              </li>
              <li className=" flex gap-4 items-center">
                <span className=" bg-white p-4 rounded-full bg-num  relative">
                  <span className=" text-white number-center ">4</span>
                </span>
                <span>RECORD ATTENDANCE</span>
              </li>
            </ul>

            {/* MEDIUM SCREENS AND BELOW */}
            <ul className="  lg:hidden text-[12px] md:text-base text-white flex flex-col gap-6 md:gap-10 md:w-[70%] w-full mx-auto font-semibold mt-4 ">
              <li className="">
                <div className="  flex justify-between items-center ">
                  <span className=" flex gap-2 md:gap-4 items-center ">
                    <span className=" bg-num p-3 md:p-4 rounded-full relative">
                      <span className=" text-white number-center ">1</span>
                    </span>
                    <span>SIGN UP</span>
                  </span>
                  <span>
                    <BsArrowRight size={40} />
                  </span>

                  <span className=" flex gap-2 md:gap-4  items-center ">
                    <span className=" bg-white p-3 md:p-4 rounded-full bg-num  relative">
                      <span className=" text-white number-center ">2</span>
                    </span>
                    <span>SETUP FACE ID</span>
                  </span>
                </div>
              </li>

              <li className=" ">
                <div className=" flex justify-between items-center">
                  <span className=" flex gap-2 md:gap-4  items-center ">
                    <span className=" bg-num p-3 md:p-4 rounded-full relative">
                      <span className=" text-white number-center ">3</span>
                    </span>
                    <span className=" flex flex-col">
                      <span>SCAN FACE</span>
                      <span> AT SCHOOL</span>
                    </span>
                  </span>
                  <span>
                    <BsArrowRight size={40} />
                  </span>

                  <span className=" flex gap-2 md:gap-4  items-center ">
                    <span className=" bg-white p-3 md:p-4 rounded-full bg-num  relative">
                      <span className=" text-white number-center ">4</span>
                    </span>
                    <span className="flex flex-col">
                      <span>RECORD </span>
                      <span>ATTENDANCE</span>
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* <ul className="w-full md:ml-12">
          <li>
            <div className="flex justify-start item-center">
              <div className="w-10 h-10  flex flex-col justify-center item-center">
                <div className="text-xl text-lp-secondary font-bold">
                  <img src="/images/add_task.svg" />
                </div>
              </div>
              <div className="w-full  ">
                <div className=" text-[14px] md:text-base flex h-full font-bold flex-col text-white place-content-center">
                  Create an account
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex justify-start item-center">
              <div className="w-10 h-10  flex flex-col justify-center item-center">
                <div className="text-xl text-lp-secondary font-bold">
                  <img src="/images/add_task.svg" />
                </div>
              </div>
              <div className="w-full  ">
                <div className=" text-[14px] md:text-base flex h-full flex-col font-bold text-white place-content-center">
                  Set up facial ID
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex justify-start item-center">
              <div className="w-10 h-10  flex flex-col justify-center item-center">
                <div className="text-xl text-lp-secondary font-bold">
                  <img src="/images/add_task.svg" />
                </div>
              </div>
              <div className="w-full  ">
                <div className=" text-[14px] md:text-base flex h-full flex-col font-bold text-white place-content-center">
                  Scan Face At School
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex justify-start item-center">
              <div className="w-10 h-10  flex flex-col justify-center item-center">
                <div className="text-xl text-lp-secondary font-bold">
                  <img src="/images/add_task.svg" />
                </div>
              </div>
              <div className="w-full  ">
                <div className="text-[14px] md:text-base flex h-full flex-col font-bold text-white place-content-center">
                  Your Attendance is recorded automactically
                </div>
              </div>
            </div>
          </li>
        </ul> */}
      </div>
    </section>
  );
};

export default Description;
