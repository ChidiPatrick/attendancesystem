import React from "react";

// Third-party imports ////
import * as Yup from "yup";
import { useFormik } from "formik";
import { sendPasswordResetEmail } from "firebase/auth";
import { HiChevronLeft } from "react-icons/hi";

/// Local directory imports ///
import { auth } from "../../Firebase/firebase";
import {
  hideFeedback,
  hideSpinner,
  showFeedback,
  showSpinner,
} from "../../Redux Slices/signupSlice";
import { useDispatch, useSelector } from "react-redux";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import FeedbackModal from "../Modal/feedbackModal";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { Link, useNavigate } from "react-router-dom";
import History from "./history";

function ResetEmailAndPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// Redux store state ////
  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );
  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );

  /// Reset password ///
  const resetPassword = async (values) => {
    dispatch(showSpinner());
    await sendPasswordResetEmail(auth, values.email).then(() => {
      dispatch(hideSpinner());
      dispatch(showFeedback());
    });
  };

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
      resetPassword(values);
    },
  });

  return (
    <div className="p-4">
      <div className="w-full flex items-center mb-[50px]">
        <HiChevronLeft size={30} onClick={() => navigate(-1)} />
        <h2 className="w-full text-center w-[90%] font-bold ">
          Change Email or Password
        </h2>
      </div>
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
        <div className="flex justify-center w-full text-white mt-[50px]">
          <button
            type="submit"
            className="w-[80%] p-2 text-center border border-lp-secondary rounded-2xl cursor-pointer bg-lp-secondary"
          >
            Reset password
          </button>
        </div>
      </form>
      {displayFeedback === true ? (
        <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
          Please check your mail to complete the password resetting from there.
          Note that you need to check your email and finish up before the
          session expires
        </FeedbackModal>
      ) : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
      <div className="w-full text-lp-primary p-2 mt-[40px]">
        <Link to={"/signin"} className=" border-b border-lp-primary p-1">
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default ResetEmailAndPassword;
