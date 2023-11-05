import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAdminEditUi } from "../../../Redux Slices/adminSlice";
import { updateAdminProfile } from "../admin dashboard handlers/admin.edit.handler";
import { ToastContainer } from "react-toastify";

function AdminEditProfile() {
  const dispatch = useDispatch();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();

  //Local state
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUserName] = useState();

  // Redux states
  const adminData = useSelector((state) => state.adminSlice.adminData);
  console.log(adminData);

  const newBioDataObject = {
    ...adminData,
    firstName,
    lastName,
    username,
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-user-profile flex justify-center  items-center">
      <div className="bg-[#f5f6fa] w-[300px] shadow-md  border-[#dcdde1] border-[3px]  rounded-lg min-h-[400px] p-[10px]">
        <div className="w-[100%] mb-[20px]">
          <div className="mb-[10px]">First Name</div>
          <input
            className="w-[100%] p-[10px]"
            type="text"
            ref={firstNameRef}
            placeholder="first name"
            onChange={() => setFirstName(firstNameRef.current.value)}
          />
        </div>
        <ToastContainer style={{ width: "100%", textAlign: "center" }} />
        <div className="w-[100%] mb-[20px]">
          <div className="mb-[10px]">Last Name</div>
          <input
            className="w-[100%] p-[10px]"
            type="text"
            ref={lastNameRef}
            placeholder="last name"
            onChange={() => setLastName(lastNameRef.current.value)}
          />
        </div>
        <div className="w-[100%] mb-[20px]">
          <div className="mb-[5px]"> username</div>
          <input
            className="w-[100%] p-[10px]"
            type="text"
            ref={usernameRef}
            placeholder="username"
            onChange={() => setUserName(usernameRef.current.value)}
          />
        </div>
        <div className="w-[100%] flex justify-center flex-col items-center mt-[50px] font-bold">
          <button
            onClick={() => updateAdminProfile(newBioDataObject, dispatch)}
            className="bg-lp-secondary mb-[10px] border border-transparent rounded-lg p-[10px] text-white w-[80%] "
          >
            Save
          </button>
          <button
            onClick={() => dispatch(hideAdminEditUi())}
            className="bg-white  border border-lp-secondary rounded-lg p-[10px] text-lp-secondary w-[80%] "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProfile;
