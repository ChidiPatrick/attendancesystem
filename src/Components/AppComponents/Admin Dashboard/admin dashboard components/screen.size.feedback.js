import React, { useRef, useEffect } from "react";

// Third-party imports
import Lottie from "lottie-web";
import { HiChevronLeft } from "react-icons/hi";

//Local directory imports
import animationData from "../../../../Assets/Screen size animation.json";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function ScreenSizeFeedback() {
  const navigate = useNavigate();

  const animationContainerRef = useRef();

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

  return (
    <div className="w-[100%] p-[10px] bg-user-profile h-screen">
      <div className="w-full flex ">
        <Link to={-1}>
          <HiChevronLeft size={30} />
        </Link>
      </div>
      <figure className="w-[100%]  h-[300px] flex justify-center items-center ">
        <div
          ref={animationContainerRef}
          className="sm:w-[200px] sm:[200px] w-[300px] h-[300px]"
        ></div>
      </figure>

      <h2 className="text-center text-[20px] font-bold text-lp-primary">
        Screen Size Alert
      </h2>
      <p className="p-[10px] text-center ">
        Sorry this page can not open on a small screen device. Check it out with
        tablet or other bigger screen devices
      </p>
    </div>
  );
}

export default ScreenSizeFeedback;
