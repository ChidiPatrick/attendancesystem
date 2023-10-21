import React, { useEffect, useRef, useState } from "react";

// Third-party imports
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { onValue, ref } from "firebase/database";

// Local Directory imports
import DashboardNavigationComponent from "./dashboard.navcomp";
import NotificationBar from "./notification.bar";
import {
  publishAnnouncement,
  fetchAnnouncements,
} from "../admin dashboard handlers/admin.announcement.handler";
import { rdb } from "../../../Firebase/firebase";
import { setAnnouncementArray } from "../../../Redux Slices/announcementSlice";

function AdminAnnouncement() {
  const dispatch = useDispatch();

  // Local states
  const [announcementCurrTitle, setAnnouncementCurrTitle] = useState("");
  const [announcementCurrBody, setAnnouncementCurrBody] = useState("");

  /// Redux states
  const announcementArray = useSelector(
    (state) => state.announcementSlice.announcementArray
  );

  /// Announcement object
  const announcementObject = {
    announcementBody: announcementCurrBody,
    announcementTitle: announcementCurrTitle,
  };

  // References
  const announcementTitleRef = useRef();
  const announcementBodyRef = useRef();

  /////////////////////////////////////////////////////////////
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
    <div className="w-full bg-[#FFFDFA] min-h-screen p-[10px]">
      <div className="border border-transparent border-b-gray-600">
        <DashboardNavigationComponent title="Announcement" />
      </div>
      <div className="flex justify-between  mt-[10px] ">
        <div className="w-[48%] min-h-[500px] bg-[#FFFDFA] p-[10px]">
          <div className="w-[100%] h-[500px] bg-[#f1f1f1] border border-transparent rounded-xl p-[10px]">
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
              {/* <button className="w-[150px] bg-[#FFFDFA] text-lp-secondary p-[10px] border rounded-2xl">
                Save draft
              </button> */}
            </div>
          </div>
          <ToastContainer
            style={{ width: "100%", textAlign: "center", color: "green" }}
          />
          <div className="w-[100%] my-[20px]">
            <h3 className="font-bold text-[18px]">History</h3>
            <div>
              {announcementArray.length !== 0 ? (
                announcementArray.map((announcement) => {
                  return (
                    <div>
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
        <div className="w-[48%] min-h-screen bg-[#FFFDFA] p-[10px]">
          <h3 className="font-bold text-[20px]">Notifications</h3>
          <div>
            <h4 className="font-bold py-[10px] mt-[10px]">Today</h4>
            <div></div>
          </div>
          <NotificationBar />
          <NotificationBar />
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncement;
