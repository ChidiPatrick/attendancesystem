import React from "react";

//Third-party imports
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";

// Local directory imports
import NavBar from "./navBar";
import { setPassedAndFutureBreakDays } from "../Admin Dashboard/admin dashboard handlers/admin.session.setting";

function BreakDaysUI() {
  //Redux states
  const breakDaysArray = useSelector(
    (state) => state.attendanceRecord.breakDaysArray
  );

  const holidayObject = setPassedAndFutureBreakDays(breakDaysArray);

  const { futureHolidaysArray, passedHolidaysArray } = holidayObject;

  console.log(futureHolidaysArray);

  return (
    <div className="w-full h-screen flex bg-user-profile">
      <div className="min-w-[400px] max-w-[640px] bg-white h-[100%] mx-auto px-[10px] sm:w-[70%]  border  relative">
        <div className="w-[90%]">
          <NavBar>Holidays / Breaks</NavBar>
        </div>
        <h2 className="text-center font-bold  text-[20px] mb-[20px]">
          Passed and Future Break days
        </h2>
        <div className="w-[100%] border border-transparent border-b-gray-300 h-[40%] overflow-y-scroll">
          <h3 className="text-[20px] text-lp-primary px-[10px] font-semibold">
            Future Holidays
          </h3>
          <div>
            {futureHolidaysArray.map((holidayObject, index) => (
              <div className="p-[10px] odd:bg-gray-100 mb-[10px] even:bg-white">
                <div>
                  <span className="font-semibold">Break title</span>:{" "}
                  {holidayObject.breakTitle}
                </div>
                <div className="flex">
                  <span className="font-semibold">Duration</span>:{" "}
                  <div className="flex ml-[10px] justify-between w-[50%] items-center">
                    <span>
                      {new Date(
                        holidayObject.breakStartingDate
                      ).toLocaleDateString()}
                    </span>{" "}
                    <HiArrowNarrowRight />{" "}
                    <span>
                      {new Date(
                        holidayObject.breakEndingDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[100%] min-h-[120px] max-h-[40%] overflow-y-scroll">
          <h3 className="text-[20px] text-lp-primary px-[10px] font-semibold">
            Passed Holidays
          </h3>
          <div>
            {passedHolidaysArray.map((holidayObject, index) => (
              <div className="p-[10px] odd:bg-gray-100 mb-[10px] even:bg-white">
                <div>
                  <span className="font-semibold">Break title</span>:{" "}
                  {holidayObject.breakTitle}
                </div>
                <div className="flex">
                  <span className="font-semibold">Duration</span>:{" "}
                  <div className="flex ml-[10px] justify-between w-[50%] items-center">
                    <span>
                      {new Date(
                        holidayObject.breakStartingDate
                      ).toLocaleDateString()}
                    </span>{" "}
                    <HiArrowNarrowRight />{" "}
                    <span>
                      {new Date(
                        holidayObject.breakEndingDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakDaysUI;
