import React, { useState, useEffect, useRef } from "react";

//Third-party imports
import { AiOutlineUserAdd } from "react-icons/ai";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { ref as rdbRef, onValue } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Local imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import { Link } from "react-router-dom";
import { ButtonFullLong } from "../../../LandingPageComponents/Buttons/buttons";
import {
  updateProgramEndingDate,
  updateProgramStartingDate,
} from "../admin dashboard handlers/admin.class.setup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProgramEndingDateState,
  updateProgramStartingDateState,
} from "../../../Redux Slices/adminSlice";
import Session from "./Session";
import {
  setEarlinessEndingTimeState,
  setEarlinessStartingTimeState,
  setLatenessStartingTimeState,
  setProgramEndingDateState,
  setProgramStartingDateState,
} from "../../../Redux Slices/classSetupSlice";
import { rdb } from "../../../Firebase/firebase";
import {
  emmitToast,
  setBreakDays,
} from "../admin dashboard handlers/admin.session.setting";

//CLASS SET UP COMPONENT
function ClassSetup() {
  const dispatch = useDispatch();

  const breakTitleRef = useRef();
  console.log(breakTitleRef);

  // Local states
  const [date, setDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());

  //Redux states
  const programStartingDate = useSelector(
    (state) => state.classSetupSlice.programDurationStartDate
  );

  const programEndingDate = useSelector(
    (state) => state.classSetupSlice.programDurationEndDate
  );

  const lectureDays = useSelector((state) => state.classSetupSlice.lectureDays);
  console.log(lectureDays);

  const earlinessStartingTime = useSelector(
    (state) => state.classSetupSlice.earlinessStartingTime
  );

  const earlinessEndingTime = useSelector(
    (state) => state.classSetupSlice.earlinessEndingTime
  );

  const latenessStartingTime = useSelector(
    (state) => state.classSetupSlice.latenessStartTime
  );

  const month1 = new Date(programStartingDate).getMonth();
  const month2 = new Date(programEndingDate).getMonth();
  const programMonths = month2 - month1;

  ////////// FETCH DATA AFTER MOUNTING //////////////////////////////
  useEffect(() => {
    const classSetupSettingsRef = rdbRef(
      rdb,
      "admindashboard/classSetupDatabase"
    );

    onValue(classSetupSettingsRef, (snapshot) => {
      if (snapshot.val() === null) {
        return () => {};
      } else {
        const setupSettings = Object.values(snapshot.val());

        console.log(snapshot.val().programEndingDate.endDate);

        dispatch(
          setProgramStartingDateState(snapshot.val().programStartingDate.date)
        );
        dispatch(
          setProgramEndingDateState(snapshot.val().programEndingDate.endDate)
        );
        dispatch(
          setEarlinessStartingTimeState(
            snapshot.val().earlinessStartingTime.startTime
          )
        );
        dispatch(
          setEarlinessEndingTimeState(
            snapshot.val().earlinessEndingTime.endTime
          )
        );
        dispatch(
          setLatenessStartingTimeState(
            snapshot.val().latenessStartingTime.startTime
          )
        );
      }
    });
  }, []);

  // Get programe starting date from calendar
  const getProgramStartingDate = (newDate) => {
    console.log(newDate);

    setDate(new Date(newDate).toDateString());
    dispatch(updateProgramStartingDateState(new Date(newDate).toDateString()));
  };

  const getProgramEndingDate = (newDate) => {
    console.log(newDate);
    setEndingDate(new Date(newDate).toDateString());
    dispatch(updateProgramEndingDateState(new Date(newDate).toDateString()));
  };

  // Update program duration in database
  const updateProgramDurationSettings = (startingDate, endingDate) => {
    // Update program starting date
    updateProgramStartingDate(startingDate).then(() => {
      const programStartingRef = rdbRef(
        rdb,
        "admindashboard/classSetupDatabase/programStartingDate"
      );

      onValue(programStartingRef, (snapshot) => {
        dispatch(updateProgramStartingDateState(snapshot.val()));
      });
    });

    //Update program ending date
    updateProgramEndingDate(endingDate).then(() => {
      const programEndingRef = rdbRef(
        rdb,
        "admindashboard/classSetupDatabase/programEndingDate"
      );

      onValue(programEndingRef, (snapshot) => {
        dispatch(updateProgramEndingDateState(snapshot.val()));
      });
    });
  };

  return (
    <div className="bg-user-profile min-h-screen w-full p-[10px]">
      <DashboardNavigationComponent title="Class Setup" />
      <div className="w-[100%] h-[100%] mt-[20px]">
        <div className="px-[20px]">
          <h2 className="py-[10px] font-bold text-[18px]">Session</h2>
          <div className=" flex justify-between items-center">
            <div className="w-[30%] flex justify-between items-center font-bold text-[18px]">
              <span>
                {programStartingDate === ""
                  ? new Date().toDateString()
                  : programStartingDate}
              </span>
              <HiArrowNarrowRight />
              <span>
                {programEndingDate === ""
                  ? new Date().toDateString()
                  : programEndingDate}
              </span>
            </div>
            <button className="w-[200px] hover:bg-[#163a87] flex justify-center items-center  p-[10px] bg-lp-primary border rounded-2xl text-white font-bold">
              <AiOutlineUserAdd className="mr-[10px]" size={20} /> New session
            </button>
          </div>
        </div>
        <div className="w-[100%] flex">
          <div className="w-[50%] min-h-screen p-[20px] border mt-[30px] border-transparent border-r-gray-300">
            <div className="px-[20px] border border-transparent border-b-gray-300 pb-[40px]">
              <h4 className="text-[20px] font-bold">
                This session runs through
              </h4>
              <div className="w-[100%] py-[10px] flex justify-between items-center">
                <span className="text-[18px] py-[10px]">Start date</span>
                <span className="text-[18px] font-bold">
                  {programStartingDate === ""
                    ? new Date().toDateString()
                    : programStartingDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[18px] py-[10px]">End date:</span>
                <span className="text-[18px] font-bold">
                  {programEndingDate === ""
                    ? new Date().toDateString()
                    : programEndingDate}
                </span>
              </div>
            </div>
            <div className="w-[100%]">
              <div>Checking toastify</div>
              <ToastContainer style={{ width: "100%", textAlign: "center" }} />
            </div>
            <div>
              <div className="px-[20px] py-[10px] border border-transparent border-b-gray-300 pb-[40px]">
                <h4 className="text-[20px] font-bold">Lecture days and time</h4>
                <div className="w-[100%] py-[10px] flex justify-between">
                  <span className="text-[18px] py-[10px]">Class days:</span>
                  <span className="text-[18px] font-bold flex items-center justify-between">
                    {lectureDays.length !== 0 ? (
                      lectureDays.map((item) => (
                        <span className="p-[5px]">{item}</span>
                      ))
                    ) : (
                      <span> Mon, Tue, Wed,Thur,Fri</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">Early:</span>
                  <div className="text-[18px] font-bold w-[40%] flex justify-between items-center">
                    <span className="">
                      {earlinessStartingTime !== ""
                        ? `${earlinessStartingTime}am`
                        : "9:00am"}
                    </span>
                    <HiArrowNarrowRight />
                    <span>
                      {earlinessEndingTime !== ""
                        ? `${earlinessEndingTime}m`
                        : "10:00am"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">Late:</span>
                  <span className="text-[18px] font-bold">
                    {latenessStartingTime !== ""
                      ? `${latenessStartingTime}am`
                      : `10am`}{" "}
                    : upwards
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="px-[20px] py-[10px]  pb-[40px]">
                <h4 className="text-[20px] font-bold">Session Summary</h4>
                <div className="w-[100%] py-[10px] flex justify-between">
                  <span className="text-[18px] py-[10px]">
                    Session Duration:
                  </span>
                  <span className="text-[18px] font-bold">
                    {programMonths !== undefined
                      ? `${programMonths}month(s)`
                      : null}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  {/* <span className="text-[18px] py-[10px]">Lecture days:</span> */}
                  {/* <span className="text-[18px] font-bold">120days</span> */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[18px] py-[10px]">
                    Holidays/Breaks:
                  </span>
                  <span className="text-[18px] font-bold">{`0day(s)`}</span>
                </div>
              </div>
            </div>
            <div className="w-[100%] p-[10px] flex justify-end items-center text-lp-primary">
              <Link
                to="#"
                className="p-[5px] font-bold border border-transparent border-b-lp-primary"
              >
                Edit session
              </Link>
            </div>
          </div>
          <div className="w-[50%] h-screen p-[20px] mt-[30px]">
            <div className="border border-transparent border-b-gray-300 pb-[50px]">
              <h4 className="font-bold text-[20px]">Set Absent days</h4>
              <p className="py-[10px]">
                Customize attendance for breaks and days
              </p>
              <fieldset className=" p-[20px] mb-4 w-[100%] border-2 border-solid border-lp-primary rounded py-2">
                <legend>Break Title</legend>
                <input
                  type="text"
                  ref={breakTitleRef}
                  placeholder="Break title"
                  className="w-[100%]  p-[5px] bg-transparent  outline-none"
                />
              </fieldset>
              <div className="w-[80%]  flex justify-between items-center hover:text-black">
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary ">From</legend>
                  <div className="flex justify-between items-center">
                    <DatePicker
                      value={date}
                      onChange={getProgramStartingDate}
                      className=""
                    />
                  </div>
                </fieldset>
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary ">To</legend>
                  <div className="flex justify-between items-center">
                    <DatePicker
                      value={endingDate}
                      onChange={getProgramEndingDate}
                      className=""
                    />
                  </div>
                </fieldset>
              </div>
              <div className="w-[100%] flex mt-[30px] p-[10px] items-center">
                <ButtonFullLong
                  handleClick={() =>
                    // updateProgramDurationSettings(date, endingDate)
                    emmitToast()
                  }
                >
                  Update
                </ButtonFullLong>
              </div>
            </div>
            <div className="border mt-[30px] border-transparent border-b-gray-300 pb-[50px]">
              <h4 className="font-bold text-[20px]">Update Class time</h4>
              <p className="py-[10px]">
                Set attendance marker schedule for classes
              </p>
              <div className="w-[80%]  flex justify-between items-center">
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary hover:text-black">
                    From
                  </legend>
                  <div className="flex justify-between items-center">
                    {/* <span>{new Date().toDateString()}</span> */}
                    <DatePicker
                      value={date}
                      onChange={getProgramStartingDate}
                      // calendarClassName="border border-red text-green-300"
                      className=""
                    />
                    {/* <BsCalendar4 /> */}
                  </div>
                </fieldset>
                <fieldset className=" p-[20px] mb-4 w-[200px] border-2 border-solid border-lp-primary rounded py-2">
                  <legend className="text-lp-primary hover:text-black">
                    To
                  </legend>
                  <div className="flex justify-between items-center">
                    <DatePicker
                      value={date}
                      onChange={getProgramEndingDate}
                      className=""
                    />
                  </div>
                </fieldset>
              </div>
              <div className="w-[100%] flex mt-[30px] p-[10px] items-center">
                <ButtonFullLong>Update</ButtonFullLong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Session />
    </div>
  );
}

export default ClassSetup;
