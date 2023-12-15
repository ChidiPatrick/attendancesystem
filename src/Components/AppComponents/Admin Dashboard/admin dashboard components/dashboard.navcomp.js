import React, { useEffect, useState } from "react";

// Third-party imports
import { HiOutlineAcademicCap, HiOutlineCircleStack } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import ReactSearchBox from "react-search-box";

// Local directory imports
import { newAnnouncementAddedEventHandler } from "../admin dashboard handlers/admin.announcement.handler";
import {
  getSelectedStudentID,
  setStudentProfile,
} from "../admin dashboard handlers/navigation.comp.handlers";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createSearchBoxArray } from "../admin dashboard handlers/admin.handlers";

function DashboardNavigationComponent({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const notificationCounter = useSelector(
    (state) => state.announcementSlice.notificationCounter
  );

  const adminProfilePictureURL = useSelector(
    (state) => state.adminSlice.adminProfilePictureURL
  );

  const searchBoxDataArray = useSelector(
    (state) => state.adminSlice.searchBoxDataArray
  );

  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const attendanceArray = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );

  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const userId = useSelector((state) => state.loginSlice.userId);

  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

  // console.log();
  const studentsQickSearchArray = createSearchBoxArray(studentsBioArray);

  useEffect(() => {
    newAnnouncementAddedEventHandler(dispatch);
  }, []);

  return (
    <div className="w-full border border-transparent  border-b-gray-300 grid grid-cols-12 items-center p-[10px] h-[100px]">
      <div className="font-bold text-xl col-start-1 col-end-3">{title}</div>
      <div className="flex justify-center items-center w-[300px]  col-start-5 col-end-8  h-[40px] p-[5px]">
        <ReactSearchBox
          placeholder="Search student"
          value=""
          data={studentsQickSearchArray}
          inputBorderColor="#bbbbbb"
          onChange={(object) => console.log(object)}
          onSelect={(valueObject) =>
            setStudentProfile(
              studentsBioArray,
              permissionsArray,
              attendanceArray,
              valueObject.item.userId,
              dispatch,
              navigate
            )
          }
        />
      </div>
      <div className="col-start-9 col-end-13  w-[400px] h-[100%]">
        <div className="w-[100%] h-[100%] flex justify-between p-[10px] items-center">
          <div
            className={
              notificationCounter === 0
                ? "flex justify-center relative items-center text-[#4A4A4A] w-[50px] h-[50px] border border-tranparent rounded-full bg-[#FF52521A]"
                : `w-[50px] flex relative animate-pulse text-[#CC0000] justify-center items-center h-[50px] border border-tranparent rounded-full bg-[#FF52521A]`
            }
          >
            {notificationCounter === 0 ? null : (
              <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-[#CC0000] text-[12px] absolute top-[-10%] right-[-5%] text-[#fff]">
                {notificationCounter}
              </div>
            )}
            <IoNotificationsOutline size={30} />
          </div>
          <Link
            to="/adminDashboard/StudentsBio"
            className="text-[#4A4A4A] bg-[#ecf0f1] flex items-center justify-center border rounded-full w-[50px] h-[50px]"
          >
            <HiOutlineAcademicCap size={30} />
          </Link>
          <Link
            to="/adminDashboard/classSetup"
            className="bg-[#ecf0f1] flex items-center justify-center border rounded-full w-[50px] h-[50px]"
          >
            <HiOutlineCircleStack size={30} />
          </Link>
          <Link
            to="/adminDashboard/adminProfile"
            className="w-[50px] h-[50px] border flex justify-center items-center rounded-full bg-gray-50"
          >
            {adminProfilePictureURL === "" || navigator.onLine === false ? (
              <BsFillPersonFill size={30} />
            ) : (
              <img
                src={adminProfilePictureURL}
                className="w-[100%] h-[100%] border rounded-full"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavigationComponent;
