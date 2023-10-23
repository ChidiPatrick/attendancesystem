import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Local imports
import { getStudentsNumber } from "../admin dashboard handlers/admin.handlers";
import { fetchCurrClockinArray } from "../admin dashboard handlers/admin.attendance.report.handlers";
import { getNumberOfStudentsInClass } from "../admin dashboard handlers/dashboard.summary.comp";

/////// STUDENTS IN CLASS COMPONENT
function StudentsInclass() {
  const dispatch = useDispatch();

  // Redux states
  const clockInList = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );

  const currDayClockinSummaryArray = getNumberOfStudentsInClass();
  console.log(currDayClockinSummaryArray);

  ///////////////////////////////////////////////////
  useEffect(() => {
    fetchCurrClockinArray(dispatch);
  }, []);
  return (
    <div className="w-[300px] p-[10px] h-[300px] overflow-y-scroll border rounded-md bg-[#FBFCFE]">
      <h3 className="w-full flex justify-between font-bold ">
        <span>Students in class</span>
        <span className="text-[#4A4A4A] font-md">
          {currDayClockinSummaryArray[0]} /
          {getStudentsNumber() === "" ? 0 : getStudentsNumber()}
        </span>
      </h3>
      <div>
        {currDayClockinSummaryArray[1].length === 0 ? (
          <div className="w-[100%] font-bold h-[200px]  flex justify-center items-center flex-col ">
            <div>No clock in for today yet</div>
          </div>
        ) : (
          currDayClockinSummaryArray[1].map((clockinObject, index) => {
            return (
              <div className="flex items-center mt-[20px] font-bold">
                {/* <figure className="w-[20px] h-[20px] border rounded-full bg-green-400"></figure> */}
                <div className="w-full ml-[10px] flex justify-between items-center">
                  <div>{clockinObject.name}</div>
                  <div className="text-lp-primary font-bold text-[13px] flex justify-between">
                    {clockinObject.time}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default StudentsInclass;
