import React from "react";

import { HiCheck } from "react-icons/hi";

const Description = () => {
  return (
    <section className=" w-full mt-6 py-6 bg-gradient-to-br from-lp-gradient-start to-lp-gradient-end h-auto">
      <div className=" w-[90%] md:w-[80%} mx-auto">
        <h2 className="text-center font-bold text-xl md:text-2xl text-white mb-6">
          How It Works
        </h2>
        {/* <figure className="w-screen flex justify-center item-center">
          <img className="" src="/images/howItWorks.svg" />
        </figure> */}

        <div className="w-full md:w-[800px] md:h-[600px] mx-auto ">
          <img className="w-full object-fill " src="/images/howItWorks.svg" />
        </div>
        <ul className="w-full md:ml-12">
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
        </ul>
      </div>
    </section>
  );
};

export default Description;
