import { onValue, ref, set, push } from "firebase/database";
import { rdb } from "../../Firebase/firebase";
import { toast } from "react-toastify";

const sendPermissionRequestHandler = (permissionObject, permissionBodyRef) => {
  if (!navigator.onLine) {
    toast(
      "No internet connection😕. Please check your internet connection and try again",
      {
        type: "error",
        autoClose: 3000,
      }
    );
    return;
  }

  if (
    permissionObject.permissionBody === "" ||
    permissionObject.permissionType === ""
  ) {
    toast("You can not send an empty permission request or type🙄", {
      type: "warning",
      autoClose: 3000,
    });
    return;
  }

  const permissionsRef = ref(rdb, "admindashboard/permissions");
  const permissionReference = push(permissionsRef);
  set(permissionReference, {
    ...permissionObject,
    time: new Date().toLocaleTimeString(),
    dateSent: new Date().toDateString(),
    rdbKey: permissionReference.key,
  })
    .then(() => {
      toast("Permission request successfully sent 🎊🎊🎉", {
        type: "success",
        autoClose: 3000,
      });
    })
    .then(() => {
      permissionBodyRef.current.value = "";
    });
};

export { sendPermissionRequestHandler };
