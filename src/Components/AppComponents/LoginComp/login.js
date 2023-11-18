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
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
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
import {
  invokeAllThunks,
  verifyStudentEmail,
} from "../../General app handlers/general.handlers";
import {
  hideWrongLoginCategory,
  setLoginUserId,
  setUser,
  setWrongLoginMessage,
  showWrongAdminLoginMessage,
  showWrongLoginCategory,
} from "../../Redux Slices/login.slice";
import { setUserId } from "../../Redux Slices/attendanceSlice";
import { Link } from "react-router-dom";
import { persistor } from "../../Store/store";
import { getStudentsBioArrayFromDatabase } from "./login.handlers";
import {
  getUnreadResponseNumber,
  getUserPermissionsArray,
} from "../Handlers/permission.handler";

/**
 * TODOs:
 * Display custome error message for admin trying to sign in as a student
 * Configure admin login logic to prevent students trying to log in as an admin
 *
 *
 */

const Signin = () => {
  ///// Initialisations////////
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const studentsEmail = useSelector((state) => state.loginSlice.studentsEmail);

  const displayWrongLoginCategoryMessage = useSelector(
    (state) => state.loginSlice.displayWrongLoginCategory
  );

  const wrongLoginMessage = useSelector(
    (state) => state.loginSlice.wrongLoginMessage
  );

  const studentsBioArray = useSelector(
    (state) => state.studentsSlice.studentsBioArray
  );

  const currUserId = useSelector((state) => state.loginSlice.userId);

  // console.log(verifyStudentEmail());

  ///////// HANDLER FUNCTIONS ////////////////////
  const cancleBtnHandler = () => {
    console.log("BTN HANDLER CALLED");
    // navigate(0);
    dispatch(hideFeedback());
  };

  ////////////////// SIGNIN COMPONENT /////////////
  const signinHandler = async (values) => {
    try {
      // let userId;
      if (navigator.onLine) {
        dispatch(showSpinner());

        //Verify user's email in the students email array before proceeding
        await signInWithEmailAndPassword(auth, values.email, values.password)
          .then((user) => {
            verifyStudentEmail(dispatch);

            return user;
          })
          .then((user) => {
            const userEmail = studentsEmail.find(
              (user) => user.email === values.email
            );
            if (userEmail === undefined) {
              dispatch(hideSpinner());
              dispatch(
                setWrongLoginMessage(
                  "User email is not recognised as one of the registered students. Please check your login details and try again, or create an account if you don't one with us"
                )
              );
              dispatch(showWrongAdminLoginMessage());

              throw new Error(
                "User email is not recognised as one of the registered students. Please check your login details and try again, or create an account if you don't one with us"
              );
            }

            return user;
          })
          .then(async (user) => {
            let userId = user.user.uid;
            dispatch(setUser(user));
            dispatch(setLoginUserId(userId));
            persistor.purge();
            invokeAllThunks(userId, dispatch);
          })
          .then(() => {
            getStudentsBioArrayFromDatabase(dispatch);
          })
          .then(() => {
            getUserPermissionsArray(studentsBioArray, currUserId, dispatch);
          })
          .then((userId) => {
            dispatch(setUserId(userId));
            dispatch(hideSpinner());
            navigate("/home");
          });
      } else if (!navigator.onLine) {
        dispatch(hideSpinner());
        dispatch(showNetworkFeedback());
      }
    } catch (err) {
      dispatch(hideSpinner());
      dispatch(showFeedback());
      console.log(err);
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
    <div className="relative h-screen p-2 bg-gray-50 w-[400px] my-[20px] mx-auto ">
      <HiChevronLeft
        className="text-3xl text-start"
        onClick={() => navigate("/")}
      />
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hello Techie!</span>
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
            <Link
              to={"/adminLogin"}
              className="text-lp-primary border-b border-lp-primary"
            >
              Login as admin
            </Link>
          </li>
          <li className="py-2">
            <button
              onClick={() => navigate("/signup")}
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
          Please enter correct email and password. If you're a not registered
          student, you can easily setup your account in few minutes.
        </FeedbackModal>
      ) : null}
      {displayWrongLoginCategoryMessage === true ? (
        <FeedbackModal handleClick={() => dispatch(hideWrongLoginCategory())}>
          {wrongLoginMessage}
        </FeedbackModal>
      ) : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );

  return componentBody;
};

export default Signin;
