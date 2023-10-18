import { onValue, ref } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";
import { setClockinList } from "../../../Redux Slices/attendanceReportSlice";

/// Fetch current clockin array
const fetchCurrClockinArray = (dispatch) => {
  console.log("fetching clockin array");
  const clockinRef = ref(rdb, "admindashboard/clockInList");

  onValue(clockinRef, (snapshot) => {
    const clockinList = Object.values(snapshot.val());
    console.log(clockinList);
    dispatch(setClockinList(clockinList));
  });
};

export { fetchCurrClockinArray };
