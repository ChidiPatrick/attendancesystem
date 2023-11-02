//// React Imports /////////////////////
import React, { useState } from "react";

///Third Party Imports //////////////////
import * as Yup from "yup";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router";

////// Local directory Imports ///////////////
import { auth } from "../../Firebase/firebase";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import { showSpinner, hideSpinner } from "../../Redux Slices/signupSlice";
import NetworkFeedback from "../Modal/networkFeedback";
import FeedbackModal from "../Modal/feedbackModal";
import {
  showNetworkFeedback,
  showFeedback,
  hideFeedback,
} from "../../Redux Slices/signupSlice";
import { verifyAdminEmail } from "../../General app handlers/general.handlers";
import {
  setWrongAdminLoginMessage,
  showWrongAdminLoginMessage,
} from "../../Redux Slices/login.slice";
import { setUserId } from "../../Redux Slices/attendanceSlice";
import { Link } from "react-router-dom";
import {
  setAdminData,
  setStudentsBioArray,
} from "../../Redux Slices/adminSlice";
import {
  getStudentsArray,
  getStudentsBioArray,
} from "../Admin Dashboard/admin dashboard handlers/admin.handlers";
import { getClassSetupData } from "../Admin Dashboard/admin dashboard handlers/admin.class.setup";
import {
  getClockinsArray,
  getNumbStudentsPresentDaily,
} from "../Admin Dashboard/admin dashboard handlers/graph.handlers";
import { setClockinList } from "../../Redux Slices/attendanceReportSlice";

//Signin TODOs:
/**
 * Add a logic to check each user's signin credentials in order to determine the route to navigate them to
 *
 *
 */

// Signin as Admin component
const SigninAsAdmin = () => {
  ///// Initialisations////////
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showWrongMessage, setShowWrongMessage] = useState(false);

  const date = new Date();
  console.log(date.getDay());

  ///// Store state retreivals /////////////
  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );

  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );

  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );

  const adminsEmail = useSelector((state) => state.loginSlice.adminsEmail);

  const clockinList = useSelector(
    (state) => state.attendanceReportSlice.clockinList
  );

  const wrongAdminLoginMessage = useSelector(
    (state) => state.loginSlice.wrongAdminLoginMessage
  );

  const studentsBioArray = useSelector(
    (state) => state.adminSlice.studentsBioArray
  );

  ///////// HANDLER FUNCTIONS ////////////////////
  const cancleBtnHandler = () => {
    console.log("BTN HANDLER CALLED");
    navigate(0);
    dispatch(hideFeedback());
  };

  ////////////////// SIGNIN COMPONENT /////////////
  const signinHandler = async (values) => {
    try {
      // let userId;
      console.log("Verifying admin email...");
      dispatch(showWrongAdminLoginMessage());

      if (navigator.onLine) {
        dispatch(showSpinner());
        await signInWithEmailAndPassword(auth, values.email, values.password)
          .then((user) => verifyAdminEmail(dispatch, values))
          .then((adminsBioArray) => {
            const adminBioObject = adminsBioArray.find(
              (item) => item.email === values.email
            );

            console.log(adminBioObject);

            if (adminBioObject === undefined) {
              console.log("Email not found!!");
              dispatch(
                setWrongAdminLoginMessage(
                  "Please check your login details and try again. If you're not a registered admin, please go through the required process to get your admin account setup"
                )
              );

              throw new Error(
                "Please check your login details and try again. If you're not a registered admin, please go through the required process to get your admin account setup"
              );
            } else {
              dispatch(setAdminData(adminBioObject));
            }
          })
          .then(() => getClassSetupData(dispatch))

          .then(() => {
            getStudentsArray(dispatch);
          })

          .then(() => getClockinsArray(dispatch))

          .then((clockinList) =>
            getNumbStudentsPresentDaily(clockinList, dispatch)
          )

          .then(() => {
            getStudentsBioArray(dispatch);
          })
          .then((userId) => {
            dispatch(setUserId(userId));
            dispatch(setStudentsBioArray(studentsBioArray));
            dispatch(hideSpinner());
            navigate("/adminDashboard");
          });
      } else if (!navigator.onLine) {
        dispatch(hideSpinner());
        dispatch(showNetworkFeedback());
      }
    } catch (err) {
      if (displayFeedback) {
        dispatch(hideSpinner());
        dispatch(showFeedback());
        console.log(err);
      } else {
        console.log(err);

        dispatch(hideSpinner());
        // dispatch(showWrongAdminLoginMessage());
        setShowWrongMessage(true);
      }
    }
  };

  /// Formik Logic ////
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 alpha-numeric characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Submit called");
      signinHandler(values);
    },
  });

  const componentBody = (
    <div className="relative h-screen bg-[#F6F9FE] max-w-[450px] mx-auto p-2">
      <HiChevronLeft
        className="text-3xl text-start"
        onClick={() => navigate("/")}
      />
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hello Admin!</span>
        <span className="text-lg mt-2">Welcome Back</span>
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Email</legend>
          <input
            className="w-full h-full focus:outline-none"
            type="text"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="text-red-800">{formik.errors.email}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Password</legend>
          <input
            className="w-full h-full focus:outline-none"
            type="password"
            id="password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="text-red-800">{formik.errors.password}</div>
          ) : null}
        </fieldset>
        <div className="w-3/2 mt-4 flex place-content-center">
          <button
            type="submit"
            className="text-white mt-8 font-bold p-4 w-3/4 border rounded-2xl bg-lp-secondary"
          >
            Login
          </button>
        </div>
        <ul className="mt-7">
          <li className="py-2">
            <button
              onClick={() => navigate("/signupAsAdmin")}
              className="text-lp-primary border-b border-lp-primary"
            >
              Create account
            </button>
          </li>
          <li className="py-2">
            <Link
              to={"/resetpassword"}
              className="text-lp-primary border-b border-lp-primary"
            >
              Reset Password
            </Link>
          </li>
        </ul>
      </form>
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displayFeedback === true ? (
        <FeedbackModal handleClick={cancleBtnHandler}>
          Please enter correct email and password. If you're not registered
          user, you can easily setup your account in few minutes
        </FeedbackModal>
      ) : null}

      {showWrongMessage === true ? (
        <FeedbackModal handleClick={() => setShowWrongMessage(false)}>
          {wrongAdminLoginMessage}
        </FeedbackModal>
      ) : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );

  return componentBody;
};

export default SigninAsAdmin;
