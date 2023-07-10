import React from "react";

import { HiCheck } from "react-icons/hi";

const Description = () => {
  return (
    <section className="mt-6 p-2 bg-gradient-to-br from-lp-gradient-start to-lp-gradient-end h-screen">
      <h2 className="text-center font-bold text-2xl text-white p-4">
        How It Works
      </h2>
      <figure className="w-screen flex justify-center item-center">
        <img className="" src="/images/teacherIllustration.png" />
      </figure>
      <ul className="w-full p-2">
        <li>
          <div className="flex justify-start item-center">
            <div className="w-10 h-10  flex flex-col justify-center item-center">
              <HiCheck className="text-xl text-lp-secondary font-bold" />
            </div>
            <div className="w-full  ">
              <div className="flex h-full font-bold flex-col text-white place-content-center">
                Create an account
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="flex justify-start item-center">
            <div className="w-10 h-10  flex flex-col justify-center item-center">
              <HiCheck className="text-xl text-lp-secondary font-bold" />
            </div>
            <div className="w-full  ">
              <div className="flex h-full flex-col font-bold text-white place-content-center">
                Set up facial ID
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="flex justify-start item-center">
            <div className="w-10 h-10  flex flex-col justify-center item-center">
              <HiCheck className="text-xl text-lp-secondary font-bold" />
            </div>
            <div className="w-full  ">
              <div className="flex h-full flex-col font-bold text-white place-content-center">
                Scan Face At School
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="flex justify-start item-center">
            <div className="w-10 h-10  flex flex-col justify-center item-center">
              <HiCheck className="text-xl text-lp-secondary font-bold" />
            </div>
            <div className="w-full  ">
              <div className="flex h-full flex-col font-bold text-white place-content-center">
                Your Attendance is recorded automactically
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Description;
