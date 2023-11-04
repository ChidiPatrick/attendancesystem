import React from "react";

// Third-party imports
import { BiUpload } from "react-icons/bi";
import NotificationBar from "./notification.bar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdminNotification from "./admin.notification";

function AdminProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux states
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  return (
    <div className="w-[100%] h-screen flex justify-between  ">
      <div className="w-[50%] h-[100%] overflow-y-scroll">
        <figure className="p-[10px] relative bg-custom-image flex-col   w-[100%] h-[300px]  flex justify-center items-center">
          <img
            src="images/skalo.jpg"
            className="w-[200px] h-[200px] border border-transparent rounded-full"
          />
          <div className="w-[100%] flex justify-between items-center">
            <span className="p-[10px] text-lp-primary bg-[#dff9fb] border border-transparent rounded-full">
              Chief Admin
            </span>
            <button className="bg-lp-secondary p-[10px] w-[150px] text-white border border-transparent rounded-full">
              Edit Profile
            </button>
          </div>
          <button className=" w-[40px] translate-y-[-40%] translate-x-[-50%] flex justify-center items-center  absolute top-[40%] left-[50%] bg-gray-600 h-[40px] border border-transparent rounded-full">
            <BiUpload className=" text-white" size={20} />
          </button>
        </figure>
        <div className="w-[100%]  px-[20px] mt-[20px]">
          <h3 className="font-bold text-[20px]">Personal data</h3>
          <div className="w-[100%]  p-[10px]">
            <div className="text-[18px] mb-[10px]">First Name</div>
            <div className="border p-[10px] text-[16px] font-semibold border-black rounded-lg">
              Patrick
            </div>
          </div>
          <div className="w-[100%]  p-[10px]">
            <div className="text-[18px] mb-[10px]">Last Name</div>
            <div className="border p-[10px] text-[16px] font-semibold border-black rounded-lg">
              Patrick
            </div>
          </div>
          <div className="w-[100%]  p-[10px]">
            <div className="text-[18px] mb-[10px]">Other Names</div>
            <div className="border p-[10px] text-[16px] font-semibold border-black rounded-lg">
              Patrick
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-[100%] overflow-y-scroll  p-[10px]">
        <h2 className="text-[20px] mt-[30px] font-bold">Notifications</h2>
        {permissionsArray.map((permissionObject, index) => {
          return (
            <div key={index}>
              {permissionsArray.map((permissionObject, index) => (
                <AdminNotification
                  permissionObject={permissionObject}
                  keyIndex={index}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminProfile;
