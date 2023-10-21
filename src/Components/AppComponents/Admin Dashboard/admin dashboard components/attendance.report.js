import React, { useEffect, useState } from "react";

//Third-party imports
import { BiDownload } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";
import DatePicker from "react-date-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { ToastContainer } from "react-toastify";
import { Margin, usePDF, Resolution } from "react-to-pdf";
import { HiArrowNarrowRight } from "react-icons/hi";

// Local directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import AttendanceRecordSummary from "./attendance.record.summary";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsNumber } from "../admin dashboard handlers/admin.handlers";
import {
  fetchCurrClockinArray,
  generateAttendanceHistory,
} from "../admin dashboard handlers/admin.attendance.report.handlers";

//ATTENDANCE REPORT COMPONENT
function AttendanceReport({ marginTop }) {
  const dispatch = useDispatch();

  //Local states
  const [attendanceRangeStartingDate, setAttendanceRangeStartingDate] =
    useState(new Date());
  const [attendanceRangeEndingDate, setAttendanceRangeEndingDate] = useState(
    new Date()
  );
  const [attendanceArray, setAttendanceArray] = useState(null);

  console.log(attendanceRangeStartingDate < attendanceRangeEndingDate);

  // Redux states
  const clockinLList = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );

  const currDayClockinList = clockinLList.filter(
    (clockinObject) => clockinObject.date === new Date().toDateString()
  );

  // Set pdf converter
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "usepdf-example.pdf",
    page: { margin: Margin.MEDIUM },
    resolution: Resolution.HIGH,
  });

  // PDF converter function

  //////////////////////////////////////////////////////////
  useEffect(() => {
    fetchCurrClockinArray(dispatch);
  }, []);

  return (
    <div className="p-[10px] bg-[#F7F7F7] h-screen">
      <DashboardNavigationComponent title="Attendance Report" />
      <div className="w-[50%]">
        <h3 className="font-bold py-[10px]">Report generator</h3>
        <p>
          Get the attendance for a specific period by entering the dates and
          clicking the generate button
        </p>

        <div className="flex justify-between items-center mt-[10px]">
          <fieldset className="px-2 w-[200px] mb-4 border-2 border-solid border-signup-gray rounded py-2">
            <legend>From</legend>
            <DatePicker
              onChange={setAttendanceRangeStartingDate}
              value={attendanceRangeStartingDate}
              className="w-[100%]"
            />
          </fieldset>
          <fieldset className="px-2 w-[200px] mb-4 border-2 border-solid border-signup-gray rounded py-2">
            <legend>To</legend>
            <div className=" flex justify-between items-center">
              <DatePicker
                onChange={setAttendanceRangeEndingDate}
                value={attendanceRangeEndingDate}
                className="w-[100%]"
              />
            </div>
          </fieldset>
          <button
            onClick={() =>
              generateAttendanceHistory(
                attendanceRangeStartingDate,
                attendanceRangeEndingDate,

                setAttendanceArray
              )
            }
            className="hover:bg-[#d1720d] w-[150px] p-[10px] bg-lp-secondary border rounded-md text-white font-bold"
          >
            Generate
          </button>
        </div>
      </div>
      <ToastContainer style={{ width: "100%", textAlign: "center" }} />
      <div className="text-lg font-bold flex justify-between items-center border border-transparent border-t-gray-400 border-b-gray-400 py-[10px]">
        <div className="w-[30%] flex justify-between items-center">
          <div>
            {new Date(attendanceRangeStartingDate).toDateString() !==
            new Date().toDateString()
              ? new Date(attendanceRangeStartingDate).toDateString()
              : new Date().toDateString()}
          </div>
          <HiArrowNarrowRight />
          <div>{new Date(attendanceRangeEndingDate).toDateString()}</div>
        </div>
        <button
          onClick={toPDF}
          className="hover:bg-[#123684] flex justify-center items-center hover:text-white p-[10px] border border-[2px] border-lp-primary rounded-md w-[200px] font-bold text-white bg-lp-primary"
        >
          <BiDownload className="mr-[10px]" size={20} /> Download
        </button>
      </div>
      <div className="text-gray-500 text-xl ">
        <div className="flex items-center p-[10px]">
          <HiOutlineUser size={20} className="text-gray-500 mr-[10px]" />
          {currDayClockinList.length} /{" "}
          {getStudentsNumber() === "" ? 0 : getStudentsNumber()}
        </div>
      </div>
      <div
        className="w-full flex justify-between relative  items-start"
        ref={targetRef}
      >
        <table className={`${marginTop} w-[78%] bg-white shadow-md `}>
          <thead>
            <tr className="text-lp-primary">
              <th className="w-[50px]">S/N</th>
              <th className="w-[250px]">Full name</th>
              <th className="w-[100px]">Clock in</th>
              <th className="w-[100px]">Remark</th>
              <th className="w-[100px]">Clock out</th>
              <th className="w-[100px]">Total</th>
            </tr>
          </thead>
          {attendanceArray === null ? (
            currDayClockinList.length !== 0 ? (
              currDayClockinList.map((clockinObject, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white  mb-2 even:bg-gray-100 p-[10px]  border-b border-border-signup-gray my-2 "
                  >
                    <td className="text-center p-[10px]">
                      {index < 10 ? `0${index}` : index}
                    </td>
                    <td className="text-center p-[10px]">
                      {clockinObject.name}
                    </td>
                    <td className="text-center p-[10px]">
                      {clockinObject.time}
                    </td>
                    <td className="text-center p-[10px] text-green-300">
                      {clockinObject.isOntime === true ? `Early` : "Late"}
                    </td>
                    <td className="text-center p-[10px]">
                      {clockinObject.clockoutObject.time}
                    </td>
                    <td className="text-center p-[10px]">20/20</td>
                  </tr>
                );
              })
            ) : (
              <div className="w-[100%] h-[200px] absolute top-[0] right-[10%] flex justify-center font-bold items-center ">
                <div> No current day clockin yet</div>
              </div>
            )
          ) : (
            attendanceArray.map((attendanceObject, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white  mb-2 even:bg-gray-100 p-[10px]  border-b border-border-signup-gray my-2 "
                >
                  <td className="text-center p-[10px]">
                    {index < 10 ? `0${index}` : index}
                  </td>
                  <td className="text-center p-[10px]">
                    {attendanceObject.name}
                  </td>
                  <td className="text-center p-[10px]">
                    {attendanceObject.time}
                  </td>
                  <td className="text-center p-[10px] text-green-300">
                    {attendanceObject.isOntime === true ? `Early` : "Late"}
                  </td>
                  <td className="text-center p-[10px]">
                    {attendanceObject.clockoutObject.time}
                  </td>
                  <td className="text-center p-[10px]">20/20</td>
                </tr>
              );
            })
          )}
        </table>
        <AttendanceRecordSummary
          attendanceArray={
            attendanceArray !== null ? attendanceArray : currDayClockinList
          }
          totalOnBoardedStudents={getStudentsNumber()}
          attendanceHistoryStartDate={attendanceRangeStartingDate}
        />
      </div>
    </div>
  );
}

export default AttendanceReport;
