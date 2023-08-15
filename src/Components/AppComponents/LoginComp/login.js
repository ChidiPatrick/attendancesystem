//// React Imports /////////////////////
import React from "react";

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
import { invokeAllThunks } from "../../General app handlers/general.handlers";
import { setLoginUserId } from "../../Redux Slices/login.slice";
import { setUserId } from "../../Redux Slices/attendanceSlice";
import { Link } from "react-router-dom";

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

  const userId = useSelector((state) => state.menuSlice.userId);

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
      if (navigator.onLine) {
        dispatch(showSpinner());
        await signInWithEmailAndPassword(auth, values.email, values.password)
          .then(async (user) => {
            let userId = user.user.uid;
            console.log("Calling invokeAllThunks");
            dispatch(setLoginUserId(userId));
            invokeAllThunks(userId, dispatch);
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
    <div className="relative h-screen p-2">
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
          Please enter correct email and password. If you're not registered
          user, you can easily setup your account in few minutes
        </FeedbackModal>
      ) : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
    </div>
  );

  return componentBody;
};

export default Signin;
