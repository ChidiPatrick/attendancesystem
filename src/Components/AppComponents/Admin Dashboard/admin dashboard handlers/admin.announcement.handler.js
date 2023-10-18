//// THIRD-PARTY IMPORTS
import { toast } from "react-toastify";
///// LOCAL IMPORTS
import { push, ref, set } from "firebase/database";
import { addAnnouncement } from "../../../Redux Slices/announcementSlice";
import { rdb } from "../../../Firebase/firebase";

const publishAnnouncement = async (announcementObject, dispatch) => {
  if (!navigator.onLine) {
    console.log("Not published");
    toast("No internet connection! 😩", {
      type: "error",
      theme: "dark",
      autoClose: 3000,
    });

    return;
  }

  if (
    announcementObject.announcementBody === "" ||
    announcementObject.announcementTitle === ""
  ) {
    toast("You can't publish an empty field 🙁❌", {
      type: "error",
      theme: "dark",
      autoClose: 3000,
    });

    return;
  }

  const announcementArrayRef = ref(rdb, "admindashboard/announcementsArray");

  const announcementListRef = push(announcementArrayRef);

  set(announcementListRef, { ...announcementObject })
    .then(() => {
      dispatch(addAnnouncement(announcementObject));
    })
    .then(() => {
      toast("Announcement published successfull 🎉🎉🎉🎊✨", {
        type: "success",
        theme: "dark",
        autoClose: 3000,
      });
    });
};

export { publishAnnouncement };
