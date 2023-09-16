import React from "react";

/// Third Party Input /////
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

/// Local Directory imports ///////////
import NavBar from "./navBar";
import Menu from "./menu";

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);
  const clockIns = useSelector((state) => state.attendanceRecord.dailyClockIns);
  const dailyClockOuts = useSelector(
    (state) => state.attendanceRecord.dailyClockOuts
  );

  console.log(clockIns);

  /* 
  TODOs: 
  1. style the table to make the date and the rest of the UI more refined
  
  */
  return (
    <div className="w-full relative p-2  h-auto  mx-auto ">
      <div className="w-full h-screen bg-user-profile  bg-white">
        <NavBar>Attendance History</NavBar>
        <div className="flex justify-center items-center w-full ">
          <table className=" mt-10 w-[90%] mx-auto">
            <thead>
              <tr className="text-lp-primary">
                <th className="w-24">Date</th>
                <th className="w-24">Clock in</th>
                <th className="w-24">Remark</th>
                <th className="w-24">Clock out</th>

                {/* <th className="w-24">Grade</th> */}
              </tr>
            </thead>
            {clockIns?.map((clockInObj, index) => {
              return (
                <tr className="odd:bg-white mb-2 even:bg-gray-100 p-[10px] h-[50px] border-b border-border-signup-gray p-2 my-2 ">
                  <td className="text-center">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(clockInObj.date)
                    )}
                  </td>
                  <td className="text-center">{clockInObj.time}</td>
                  <td className="text-center">
                    {clockInObj.isOnTime === true ? "Early" : "Late"}
                  </td>
                  <td className="text-center">{dailyClockOuts[index].time}</td>
                </tr>
              );
            })}
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Ken's version
{
  /* <div className="mx-auto max-w-[650px] w-[90%] md:w-full relative"> */
}
{
  /* <div className=" flex items-center bg-mywhite sticky top-0 z-[999] mb-6">
          <span className=" w-10 ">
            <NavBar />
          </span>
          <h3 className=" mx-auto font-semibold text-xl ">History</h3>
          {displayMenu === true ? <Menu /> : null}
        </div>
        <form>
          <div className=" flex justify-between rounded-3xl py-3 px-8 shad2 bg-white items-center mx-auto ">
            <input
              type="text"
              placeholder="Try search date"
              className=" border-none outline-none"
            />
            <button>
              <BsSearch size={15} />
            </button>
          </div>
        </form>

        {clockIns?.map((data, index) => {
          return (
            <div className=" mt-5">
              <p className=" font-semibold mb-2">{data.date}</p>
              <table class="table-fixed w-full">
                <thead className=" py-3 border-spacing-4 border-b-[0.5px] border-[#222]">
                  <tr className=" text-left text-[#333] text-[14px] md:text-base py-3">
                    <th className=" pb-2">Clock In</th>
                    <th className=" pb-2">Clock out</th>
                    <th className=" pb-2">Remark</th>
                    <th className=" pb-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-left text-[#333] text-[14px] md:text-base ">
                    <td className=" pt-2">{data.time}</td>
                    <td className=" pt-2">{dailyClockOuts[index].time}</td>
                    <td className=" pt-2">
                      {data.isOnTime === true ? "Early" : "Late"}
                    </td>
                    <td className=" pt-2">2/2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })} */
}

{
  /* <div className=" mt-5">
          <p className=" font-semibold mb-2">May 06</p>
          <table class="table-fixed w-full">
            <thead className=" py-3 border-spacing-4 border-b-[0.5px] border-[#222]">
              <tr className=" text-left text-[#333] text-[14px] md:text-base py-3">
                <th className=" pb-2">Clock In</th>
                <th className=" pb-2">Clock out</th>
                <th className=" pb-2">Remark</th>
                <th className=" pb-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" text-left text-[#333] text-[14px] md:text-base ">
                <td className=" pt-2">09:55am</td>
                <td className=" pt-2">09:55am</td>
                <td className=" pt-2">On time</td>
                <td className=" pt-2">2/2</td>
              </tr>
            </tbody>
          </table>
        </div> */
}

{
  /* <div className=" mt-5">
          <p className=" font-semibold mb-2">May 06</p>
          <table class="table-fixed w-full">
            <thead className=" py-3 border-spacing-4 border-b-[0.5px] border-[#222]">
              <tr className=" text-left text-[#333] text-[14px] md:text-base py-3">
                <th className=" pb-2">Clock In</th>
                <th className=" pb-2">Clock out</th>
                <th className=" pb-2">Remark</th>
                <th className=" pb-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" text-left text-[#333] text-[14px] md:text-base ">
                <td className=" pt-2">09:55am</td>
                <td className=" pt-2">09:55am</td>
                <td className=" pt-2">On time</td>
                <td className=" pt-2">2/2</td>
              </tr>
            </tbody>
          </table>
        </div> */
}
// </div>;

export default History;
