import { update, ref, onValue } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";

// Local directory imports

const updateProgramStartingDate = (date) => {
  const programStartingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programStartingDate"
  );

  return update(programStartingRef, { date });
};

const updateProgramEndingDate = (date) => {
  const programEndingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  return update(programEndingRef, { date });
};

export { updateProgramStartingDate, updateProgramEndingDate };
