import { update } from "firebase/database";
import { rdb } from "../../../Firebase/firebase";
import { ref } from "firebase/database";

const updateProgramStartingDate = (date) => {
  const programStartingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programStartingDate"
  );

  update(programStartingRef, date);
};

const updateProgramEndingDate = (date) => {
  const programStartingRef = ref(
    rdb,
    "admindashboard/classSetupDatabase/programEndingDate"
  );

  update(programStartingRef, date);
};

export { updateProgramStartingDate, updateProgramEndingDate };
