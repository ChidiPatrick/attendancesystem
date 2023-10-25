//// THIRD-PARTY IMPORTS
import { toast } from "react-toastify";
import { onValue, update } from "firebase/database";

///// LOCAL IMPORTS
import { push, ref, set } from "firebase/database";
import { addAnnouncement } from "../../../Redux Slices/announcementSlice";
import { rdb } from "../../../Firebase/firebase";
import { setAnnouncementArray } from "../../../Redux Slices/announcementSlice";

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
        autoClose: 3000,
      });
    });
};

/// Announcement Fetching Handler
const fetchAnnouncements = async (dispatch) => {
  const announcementsRef = ref(rdb, "admindashboard/announcementsArray");

  onValue(announcementsRef, (snapshot) => {
    if (snapshot.val() === null) {
      return;
    }

    const announcementArray = Object.values(snapshot.val());
    dispatch(setAnnouncementArray(announcementArray));
  });
};

//////// Approve Permission ///////
const updatePermissionStatus = (permissionObject, response) => {
  const currPermissionRef = ref(
    rdb,
    `admindashboard/permissions/${permissionObject.rdbKey}`
  );

  const newPermissionObject = { ...permissionObject, status: response };

  update(currPermissionRef, newPermissionObject).then(() => {
    toast("Response sent successfully", {
      type: "success",
      autoClose: 3000,
    });
  });
};

export { publishAnnouncement, fetchAnnouncements, updatePermissionStatus };
