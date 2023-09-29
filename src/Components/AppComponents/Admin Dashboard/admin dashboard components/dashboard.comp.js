import React from "react";

//Third-party imports
import { HiOutlineAcademicCap, HiOutlineCircleStack } from "react-icons/hi2";

//Local Imports
import SideNavigation from "./sidenav.comp";
import DashboardNavigationComponent from "./dashboard.navcomp";
import SummaryBox from "./summary.box";
import StudentsInclass from "./students.inclasss";
import Session from "./Session";
import ClassSetup from "./class.setup";
import AdminStudentProfile from "./admin.student.profile";

function DashboardComponent() {
  return (
    <div className="w-full p-[10px] flex h-screen  bg-[#F7F7F773]">
      <div>
        <SideNavigation />
      </div>
      <div className="w-full h-screen bg-user-profile">
        <DashboardNavigationComponent title="Dashboard" />
        <div className="w-full flex justify-between p-[10px] mt-[20px]">
          <div className="w-full flex justify-between items-center mr-[20px]">
            <SummaryBox
              bgValue="bg-[#2926B8]"
              title="Total Students"
              IconName={HiOutlineAcademicCap}
              number={100}
              valueIdentifier=""
            />
            <SummaryBox
              bgValue="bg-[#326EB5]"
              title="Time Used"
              IconName={HiOutlineAcademicCap}
              number={100}
              valueIdentifier="days"
            />
            <SummaryBox
              bgValue="bg-[#21938C]"
              title="Session Duration"
              IconName={HiOutlineAcademicCap}
              number={72}
              valueIdentifier="days"
            />
          </div>
          <div className="w-[20%] h-[200px] bg-[#FBFCFE] shadow-md border border-tranparent rounded-md">
            <h3 className="text-center text-black p-[10px]">Daily six</h3>
            <div className="grid grid-cols-2 w-[80%] mx-auto justify-items-center">
              <figure className="w-[40px] h-[40px] border rounded-full">
                <img
                  src="/images/skalo.jpg"
                  className="w-[100%] h-[100%] border rounded-full"
                />
              </figure>
              <figure className="w-[40px] h-[40px] border rounded-full">
                <img
                  src="/images/skalo.jpg"
                  className="w-[100%] h-[100%] border rounded-full"
                />
              </figure>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-[10px]">
          <div className="bg-blue-200 w-[400px] h-[300px] border rounded-md flex items-center justify-center">
            Graph here
          </div>
          <div className="bg-blue-200 w-[400px] h-[300px] border rounded-md flex items-center justify-center">
            Graph here
          </div>
          <StudentsInclass />
        </div>
        <AdminStudentProfile />
      </div>
    </div>
  );
}

export default DashboardComponent;
