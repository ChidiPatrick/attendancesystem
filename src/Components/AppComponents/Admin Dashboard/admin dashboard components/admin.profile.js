import React from "react";

//Third-party imports
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import { BiUpload } from "react-icons/bi";

//Local imports
import { showProfilePictureUI } from "../../../Redux Slices/profileSlice";
import AdminNotification from "./admin.notification";
import AdminEditProfile from "./admin.edit.profile";
import ProfilePictureUI from "./profile.pictureUI";
import AdminSlice, { showAdminEditUI } from "../../../Redux Slices/adminSlice";
import customCss from "../../../Custom CSS/admin.profile.css";
import PermissionModal from "./permission.modal";
import RequestDisplayUI from "./request.display.UI";
import { hidePermissionModal } from "../../../Redux Slices/permission.slice";
import AdminStudentProfile from "./admin.student.profile";

//TODOs
/**
 * Implement profile picture logic
 *
 */
function AdminProfile() {
  const dispatch = useDispatch();

  //Redux states
  const displayAdminEditUI = useSelector(
    (state) => state.adminSlice.displayAdminEditUI
  );

  const adminData = useSelector((state) => state.adminSlice.adminData);

  const displayProfilePictureUI = useSelector(
    (state) => state.profileSlice.displayProfilePictureUI
  );

  const adminProfilePictureURL = useSelector(
    (state) => state.adminSlice.adminProfilePictureURL
  );

  const studentsBioArray = useSelector(
    (state) => state.adminSlice.studentsBioArray
  );

  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const displayPermissionModal = useSelector(
    (state) => state.permissionSlice.displayPermissionModal
  );
  console.log(displayPermissionModal);

  return (
    <div className="w-full flex justify-between  mt-[10px]">
      <div className="w-[48%] h-[100%] overflow-y-scroll">
        <figure className="p-[10px] relative bg-custom-image flex-col w-[100%] h-[300px]  flex justify-center items-center">
          <div className=" w-[100%] h-[100%] flex justify-center items-center">
            {adminProfilePictureURL === "" || navigator.onLine === false ? (
              <BsFillPersonFill
                size={150}
                className="border border-lp-primary rounded-full"
              />
            ) : (
              <img
                src={adminProfilePictureURL}
                alt="profile picture"
                className="w-[200px] h-[200px] border border-transparent rounded-full"
              />
            )}
          </div>
          <div className="w-[100%] bg-myshade flex justify-between items-center p-[10px] ">
            <span className="p-[10px] text-lp-primary bg-[#eaeaea] border border-transparent rounded-md">
              Admin
            </span>
            <button
              onClick={() => dispatch(showAdminEditUI())}
              className="bg-lp-secondary p-[10px] w-[150px] text-white border border-transparent rounded-full"
            >
              Edit Profile
            </button>
          </div>
          <div
            onClick={() => dispatch(showProfilePictureUI())}
            className="w-[40px] translate-y-[-40%] translate-x-[-50%] flex justify-center items-center  absolute top-[40%] left-[50%] bg-gray-600 h-[40px] border border-transparent rounded-full"
          >
            <BiUpload
              onClick={() => {
                console.log("cliked");
                dispatch(showProfilePictureUI());
              }}
              className=" text-white"
              size={20}
            />
          </div>
        </figure>
        <div className="w-[100%] px-[20px] mt-[20px]">
          <h3 className="font-bold text-[20px]">Personal data</h3>
          <div className="w-[100%]  p-[10px]">
            <div className="text-[18px] mb-[10px]">First Name</div>
            <div className="border p-[10px] text-[16px] font-semibold border-black rounded-lg">
              {adminData.firstName}
            </div>
          </div>
          <div className="w-[100%]  p-[10px]">
            <div className="text-[18px] mb-[10px]">Last Name</div>
            <div className="border p-[10px] text-[16px] font-semibold border-black rounded-lg">
              {adminData.lastName}
            </div>
          </div>
          <div className="w-[100%]  p-[10px]">
            <div className="text-[18px] mb-[10px]">Other Names</div>
            <div className="border p-[10px] text-[16px] font-semibold border-black rounded-lg">
              {adminData.userName}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[48%] col-start-6 col-end-9 h-[100%] overflow-y-scroll p-[10px]">
        <h2 className="text-[20px] mt-[30px] font-bold">Notifications</h2>
        {permissionsArray.map((permissionObject, index) => {
          return (
            <AdminNotification
              permissionObject={permissionObject}
              keyIndex={index}
            />
          );
        })}
      </div>
      {displayAdminEditUI === true ? <AdminEditProfile /> : null}
      {displayProfilePictureUI === true ? <ProfilePictureUI /> : null}
      {displayPermissionModal === true ? (
        <div
          onClick={() => dispatch(hidePermissionModal())}
          className="requestDenialUI absolute top-0 left-0 flex justify-center items-center w-[100%] h-[100%] "
        >
          <RequestDisplayUI />
        </div>
      ) : null}
    </div>

    // </div>
  );
}

export default AdminProfile;
