import React from "react";

// Third-party imports
import { HiArrowLongRight } from "react-icons/hi2";
import { BiDownload } from "react-icons/bi";

// Local directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import { useSelector } from "react-redux";

function StudentsBio() {
  // Redux states
  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  return (
    <div className=" px-[10px]">
      <div className="w-full border border-b-black p">
        <DashboardNavigationComponent title="Students bio" />
      </div>
      <div className="">
        <h3 className="font-bold p-[10px] text-[20px]">Session</h3>
        <div className="flex justify-between p-[10px] items-center w-full  font-bold">
          <div className="flex justify-between p-[10px] items-center w-[400px]">
            <div>May 05,2023</div>
            <HiArrowLongRight size={20} />
            <div>August 05,2023</div>
          </div>
          <button className="text-white w-[200px] flex justify-between items-center  p-[10px] border-[2px] rounded-md font-bold bg-lp-secondary ">
            <div className="flex justify-center items-center w-[80%] mx-auto">
              <BiDownload className="mr-[10px]" size={20} /> Download
            </div>
          </button>
        </div>
      </div>
      <table className=" mt-10 w-full mx-auto ">
        <thead>
          <tr className="text-lp-primary">
            <th className="w-[50px]">s/n</th>
            <th className="w-24">First name</th>
            <th className="w-24">Last name</th>
            <th className="w-24">Middle name</th>
            <th className="w-24">Phone number</th>
            <th className="w-24">Email</th>
          </tr>
        </thead>
        {studentsBioArray.map((studentBioObject, index) => {
          return (
            <tr className="odd:bg-white p-[10px] mb-2 even:bg-gray-100  border-b border-border-signup-gray my-2 ">
              <td className="text-center p-[10px]">
                {index <= 9 ? `00${index}` : `0${index}`}
              </td>
              <td className="text-center p-[10px]">
                {studentBioObject.firstName}
              </td>
              <td className="text-center p-[10px]">
                {studentBioObject.lastName}
              </td>
              <td className="text-center p-[10px]">
                {studentBioObject.userName}
              </td>
              <td className="text-center p-[10px]">{studentBioObject.tel}</td>
              <td className="text-center p-[10px]">{studentBioObject.email}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default StudentsBio;
