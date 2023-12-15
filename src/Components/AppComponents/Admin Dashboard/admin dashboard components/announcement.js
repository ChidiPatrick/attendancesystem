import React, { useEffect, useRef, useState } from "react";

// Third-party imports
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Local Directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import {
  publishAnnouncement,
  fetchAnnouncements,
} from "../admin dashboard handlers/admin.announcement.handler";
import { hidePermissionModal } from "../../../Redux Slices/permission.slice";

import RequestDisplayUI from "./request.display.UI";
import AdminNotification from "./admin.notification";

/// Admin announcement component
function AdminAnnouncement() {
  const dispatch = useDispatch();

  // References
  const announcementTitleRef = useRef();
  const announcementBodyRef = useRef();

  // Local states
  const [announcementCurrTitle, setAnnouncementCurrTitle] = useState("");
  const [announcementCurrBody, setAnnouncementCurrBody] = useState("");

  /// Redux states
  const permissionsArray = useSelector(
    (state) => state.permissionSlice.permissionsArray
  );

  const announcementArray = useSelector(
    (state) => state.announcementSlice.announcementArray
  );

  const displayPermissionModal = useSelector(
    (state) => state.permissionSlice.displayPermissionModal
  );

  console.log(displayPermissionModal);

  /// Announcement object
  const announcementObject = {
    announcementBody: announcementCurrBody,
    announcementTitle: announcementCurrTitle,
  };

  ///Side effect implementation
  useEffect(() => {
    fetchAnnouncements(dispatch);
  }, []);

  ///// Clean fields
  const cleanFileds = () => {
    announcementTitleRef.current.value = "";
    announcementBodyRef.current.value = "";
  };

  /// Send annnouncement
  const sendAnnouncement = (announcementObject) => {
    publishAnnouncement(
      {
        ...announcementObject,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
      },
      dispatch
    ).then(() => {
      cleanFileds();
    });
  };

  return (
    <div className="w-full relative bg-[#F7F7F7] min-h-screen p-[10px]">
      <div className="border border-transparent border-b-gray-300">
        <DashboardNavigationComponent title="Announcement" />
      </div>
      <div className=" flex justify-between  mt-[10px] ">
        <div className="w-[48%] min-h-[500px]  p-[10px]">
          <div className="w-[100%] h-[500px] shadow-lg bg-[#FBFCFE] border border-transparent rounded-xl p-[10px]">
            <h2 className="font-bold text-[19px]">Type Announcement</h2>
            <div className="w-full mt-[20px]">
              <h4 className="text-[20px] pb-[10px]">Title</h4>
              <input
                className="p-[10px] w-[100%] bg-transparent border border-gray-700 rounded-md "
                placeholder="Enter title"
                ref={announcementTitleRef}
                onChange={() => {
                  setAnnouncementCurrTitle(announcementTitleRef.current.value);
                }}
              />
            </div>
            <div className="w-[100%] mt-[20px]">
              <h4 className="text-[20px] pb-[10px]">Content</h4>
              <textarea
                className="w-[100%] bg-transparent border border-gray-700 px-[10px] min-h-[200px] rounded-md"
                placeholder="Type announcement here"
                ref={announcementBodyRef}
                onChange={() => {
                  setAnnouncementCurrBody(announcementBodyRef.current.value);
                }}
              ></textarea>
            </div>
            <div className="w-[50%] mx-auto flex justify-center items-center mt-[20px]">
              <button
                onClick={() => sendAnnouncement(announcementObject)}
                className="w-[250px] mr-[10px] bg-lp-secondary text-white font-bold p-[10px] border rounded-2xl"
              >
                Post
              </button>
            </div>
          </div>
          <ToastContainer
            style={{ width: "100%", textAlign: "center", color: "green" }}
          />
          <div className="w-[100%] my-[30px] bg-gray-50 shadow-lg h-[320px] overflow-y-visible">
            <h3 className="font-bold text-[18px] p-[10px]">
              Announcements History
            </h3>
            <div className="p-[10px] ">
              {announcementArray.length !== 0 ? (
                announcementArray.map((announcement) => {
                  return (
                    <div className="odd:bg-white even:bg-gray-100 px-[10px] my-[10px]">
                      <h4 className="font-bold py-[10px]">
                        {announcement.announcementTitle}
                      </h4>
                      <p>{announcement.announcementBody}</p>
                      <div className="text-lp-primary font-bold flex justify-between items-center mt-[20px]">
                        <div className="w-[40%] ">
                          <span className="mr-[10px]">
                            {new Date(announcement.date).toLocaleDateString()}
                          </span>
                          <span>{announcement.time}</span>
                        </div>
                        <span className="text-lp-secondary">Sent</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-[100%] h-[200px] bg-gray-50 flex justify-center items-center text-lp-primary font-bold">
                  <div>No announcement published yet</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[48%] min-h-screen  p-[10px]">
          <h3 className="font-bold text-[20px]">Notifications</h3>
          {/* <div>
            <h4 className="font-bold py-[10px] mt-[10px]">Today</h4>
            <div></div>
          </div> */}
          {permissionsArray.map((permissionObject, index) => (
            <AdminNotification
              permissionObject={permissionObject}
              keyIndex={index}
            />
          ))}
        </div>
      </div>
      {displayPermissionModal === true ? (
        <div
          onClick={() => dispatch(hidePermissionModal())}
          className="w-[100%] backdrop-blur-sm h-screen flex justify-center items-center  absolute top-[0] left-[0]"
        >
          <RequestDisplayUI />
        </div>
      ) : null}
    </div>
  );
}

export default AdminAnnouncement;
