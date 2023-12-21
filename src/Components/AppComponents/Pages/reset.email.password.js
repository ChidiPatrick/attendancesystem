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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
    if (!navigator.onLine) {
      dispatch(hideSpinner());

      toast("Please connect to the internet🤨", {
        autoClose: 3000,
        type: "warning",
      });
      return;
    }
    dispatch(showSpinner());
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast("Email and password updated successfully", {
          autoClose: 3000,
          type: "success",
        });
      })
      .then(() => {
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
      resetPassword(values);
    },
  });

  return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="p-4 h-[500px] w-[500px] bg-white shadow-lg border border-gray-100 rounded-lg ">
        <div className="w-full flex items-center mb-[50px]">
          <HiChevronLeft size={30} onClick={() => navigate(-1)} />
          <h2 className="w-full text-center font-bold ">
            Change Email or Password
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <fieldset className="px-2 mb-4 border-2 border-solid border-lp-primary rounded py-2">
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
          <div className="flex justify-center w-full text-white mt-[50px]">
            <button
              type="submit"
              className="w-[80%] p-2 text-center border border-lp-secondary rounded-lg cursor-pointer bg-lp-secondary"
            >
              Reset password
            </button>
          </div>
          <ToastContainer style={{ width: "100%", textAlign: "center" }} />
        </form>
        {displayFeedback === true ? (
          <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
            Please check your mail to complete the password resetting from
            there. Note that you need to check your email and finish up before
            the session expires
          </FeedbackModal>
        ) : null}
        {displaySpinner === true ? <SpinnerSmall /> : null}
        <div className="w-full text-lp-primary p-2 mt-[40px]">
          <Link to={"/signin"} className=" border-b border-lp-primary p-1">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetEmailAndPassword;
