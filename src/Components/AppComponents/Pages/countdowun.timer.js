import React from "react";
import { useTimer } from "react-timer-hook";

function CountDownTimer({ expiryTimestamp }) {
  //Handle Expiry

  const { totalSeconds, seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div>
      <div className="w-[200px] h-[200px] border border-black rounded-full flex justify-center items-center">
        <div className="flex justify-between items-center w-[50px]">
          <div>{minutes}</div>
          <div>{seconds}</div>
        </div>
      </div>
    </div>
  );
}

export default CountDownTimer;
