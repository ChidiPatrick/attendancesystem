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
} from "../../Redux Slices/login.slice";
import { setUserId } from "../../Redux Slices/attendanceSlice";
import { Link } from "react-router-dom";
import { persistor } from "../../Store/store";
import { getStudentsBioArrayFromDatabase } from "./login.handlers";
import { getUnreadResponseNumber } from "../Handlers/permission.handler";
import { getLatenessHour } from "../Handlers/clockin.handler";
import {
  getProgramEndingDate,
  getProgramStartingDate,
  getTotalClockins,
} from "../Handlers/user.profile.handlers";
import custom from "../../Custom CSS/admin.profile.css";
import { getBreakDays } from "../Handlers/break.days";

const Signin = () => {
  ///// Initialisations////////
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date();

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

  ///////// HANDLER FUNCTIONS ////////////////////
  const cancleBtnHandler = () => {
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
            getUnreadResponseNumber(dispatch, currUserId);
          })

          .then(() => {
            getProgramStartingDate(dispatch);
          })

          .then(() => {
            getProgramEndingDate(dispatch);
          })

          .then(() => getLatenessHour(dispatch))

          .then(() => getTotalClockins(currUserId, dispatch))

          .then(() => getBreakDays(dispatch))

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
      signinHandler(values);
    },
  });

  const componentBody = (
    <div className="w-full h-screen bg-gray-100 sm:flex sm:justify-center sm:items-center">
      <div className="relative h-[100%] sm:h-[500px] sm:border sm:border-gray-200 sm:shadow-lg sm:rounded-md p-2 bg-white  sm:w-[500px] sm:my-[20px] sm:mx-auto ">
        <HiChevronLeft
          className="text-3xl text-start"
          onClick={() => navigate("/")}
        />
        <h3 className="my-5  flex flex-col justify-start item-start">
          <span className="font-bold text-xl text-lp-primary">
            Hello Techie!
          </span>
          <span className="text-lg mt-2">Welcome Back</span>
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <fieldset className="px-2 mb-4 border-2 border-solid border-lp-primary rounded py-2">
            <legend className="text-lp-primary">Email</legend>
            <input
              className="w-full h-full focus:outline-none "
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
          <fieldset className="px-4 mb-4 border-2 border-solid border-lp-primary rounded py-2">
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
          <ul className="mobile_large:w-[70%] tablet:w-[60%] mt-[20px]  w-[90%] sm:w-[50%] mx-auto flex justify-between">
            <li className="py-2">
              <Link to={"/adminLogin"} className="text-lp-primary ">
                Login as admin
              </Link>
            </li>
            <li className="py-2">
              <button
                onClick={() => navigate("/signup")}
                className="text-lp-primary "
              >
                Create account
              </button>
            </li>
          </ul>
          <div className="w-[100%] flex items-center justify-center">
            <Link
              to={"/resetpassword"}
              className="text-lp-primary border-b border-lp-primary"
            >
              Reset Password
            </Link>
          </div>
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
    </div>
  );

  return componentBody;
};

export default Signin;
