import React from "react";

// Third-party imports //
import { HiOutlineCheck } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Local directory imports //
import { resetClockInImage } from "../../Redux Slices/attendanceSlice";

function ImagePreview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clockInImage = useSelector((state) => state.attendanceRecord.image);

  const retakePicture = () => {
    dispatch(resetClockInImage());
    navigate(-1);
  };

  return (
    <div>
      <figure className="h-screen w-full relative ">
        <img src={clockInImage} className=" w-[100%] h-[100%] " />
        <div className="w-full h-[50px] absolute top-[85%]  flex  justify-center item-center">
          <div className="w-[80%]  h-[50px] flex justify-between items-center">
            <div>flash</div>
            <div
              className="w-[50px] h-[50px] border rounded-full bg-lp-secondary flex justify-center items-center"
              onClick={() => navigate("/markAttendance")}
            >
              <HiOutlineCheck size={20} className="text-black" />
            </div>
            <div
              onClick={retakePicture}
              className="p-2 min-w-[50px] bg-lp-secondary"
            >
              Retake
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default ImagePreview;
