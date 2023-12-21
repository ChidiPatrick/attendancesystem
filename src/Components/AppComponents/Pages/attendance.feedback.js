import React, { useState, useRef, useEffect } from "react";
import NavBar from "./navBar";
import { Link, useNavigate } from "react-router-dom";

// Local directory imports ///
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-web";
import animationData from "../../../Assets/AnimationData.json";

/// Attendance feedback component ///
function AttendanceFeedback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const animationContainerRef = useRef();

  //////// Redux state //////
  const userImage = useSelector((state) => state.attendanceRecord.image);
  const isOnTime = useSelector((state) => state.attendanceRecord.isOnTime);
  const currTime = useSelector((state) => state.attendanceRecord.currTime);
  const date = useSelector((state) => state.attendanceRecord.date);
  const attendanceData = useSelector(
    (state) => state.attendanceRecord.weeklyAttendance
  );
  const displayClockInDetails = useSelector(
    (state) => state.attendanceRecord.displayClockInDetails
  );

  const currAttendanceData = attendanceData[attendanceData.length - 1];

  //////  Local states  ////
  const [image, setImage] = useState(userImage);
  const [time, setCurrTime] = useState(currTime);
  const [currDate, setCurrDate] = useState(date);

  const dateNow = new Date();

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainerRef.current,
      loop: true,
      autoplay: true,
      animationData,
      renderer: "svg",
      rendererSettings: {
        preserveAspectRation: "xMidYMid meet",
      },
    });

    return () => animation.destroy();
  }, []);

  // dispatch(setOnTime(!isOnTime));
  console.log(isOnTime);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-2 bg-user-profile h-screen sm:h-[80%] sm:my-auto shadow-lg w-full sm:w-[80%] max-w-[640px]">
        <NavBar>Welcome</NavBar>
        <figure className="w-full flex justify-center items-center ">
          <div
            ref={animationContainerRef}
            className="sm:w-[200px] sm:[200px] w-[100px] h-[100px]"
          ></div>
        </figure>
        <div className="mt-5 flex justify-center items-center flex-col">
          <div className="text-lp-primary font-bold text-xl">
            Attendance Recorded
          </div>
          {/* <div className="font-md">You look good today</div> */}
          <div className="text-xs">Happy learning</div>
        </div>
        <div className="w-[100%] sm:w-[80%] sm:mx-auto">
          {displayClockInDetails === true ? (
            <div className="w-full p-2 border  border-gray-300 my-10 flex bg-gray-100  justify-between items-center">
              <div
                className={
                  isOnTime === true
                    ? "w-[20px] h-[20px] border rounded-full bg-green-600"
                    : "w-[20px] h-[20px] border rounded-full bg-red-500"
                }
              ></div>

              <div className=" ml-5 text-lp-primary font-bold text-l">
                {isOnTime === true ? "Early" : "Late"}
              </div>

              <div className="w-[250px] text-lp-primary font-bold text-l flex flex-col items-end mr-2">
                <div> {currAttendanceData.time}</div>
                <div> {currAttendanceData.currDate}</div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <Link
            className="text-lp-primary border-b border-lp-primary p-1 w-24"
            to={"/userprofile"}
          >
            View profile
          </Link>
          <Link
            className="text-lp-primary border-b border-lp-primary p-1 w-24"
            to={"/history"}
          >
            View history
          </Link>
        </div>
        {/* {displayMenu === true ? <Menu /> : null} */}
      </div>
    </div>
  );
}

export default AttendanceFeedback;
