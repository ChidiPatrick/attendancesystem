//// Import from react ////////////
import React, { useState } from "react";

/////// Third party imports /////////////
import * as Yup from "yup";
import { useFormik } from "formik";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/// Local directory imports ////////////////
import { db, auth } from "../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Await, useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import NetworkFeedback from "../Modal/networkFeedback";
import {
  showNetworkFeedback,
  hideNetworkFeedback,
} from "../../Redux Slices/signupSlice";
import { firestoreRefCreator } from "../../General app handlers/general.handlers";
import {
  userProfileModelCreator,
  attendanceCollectionModelCreator,
  permissionCollectionModelCreator,
  announcementCollectionModelCreator,
} from "./signup.handlers";

////////////////Sign up component//////////////////////////////
const SignUp = () => {
  //// Initializations ///////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /// Redux states ///////////////
  const userId = useSelector((state) => state.attendanceRecord.userId);
  const displayNetworkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );

  ////// Account creation functions //////////////

  const signUpUserHandler = async (values) => {
    try {
      if (navigator.onLine) {
        let userId = "";
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then((res) => {
            console.log("Creating user Profile");
            console.log(res.user);
            userId = res.user.uid;
            userProfileModelCreator(
              db,
              userId,
              "userProfileCollection",
              "profile"
            );
          })
          .then(() => {
            attendanceCollectionModelCreator(
              db,
              userId,
              "attendanceCollection",
              "attendanceRecords"
            );
          })
          .then(() => {
            permissionCollectionModelCreator(
              db,
              userId,
              "permissionCollection",
              "permissionsRecord"
            );
          })
          .then(() => {
            announcementCollectionModelCreator(
              db,
              userId,
              "announcementsCollection",
              "announcements"
            );
          })
          .then(() => navigate("/home"));
      } else {
        console.log("Got here");
        dispatch(showNetworkFeedback());
      }
    } catch (err) {}
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      userName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 alpha-numeric characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Submit called");
      signUpUserHandler(values);
    },
  });

  const comp = (
    <div className=" h-screen relative">
      <HiChevronLeft
        className="text-3xl text-start"
        onClick={() => navigate("/")}
      />
      <h3 className="my-5 px-4 flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hello Techie!</span>
        <span className="text-lg mt-2">Welcome to LM Tech Hub</span>
      </h3>
      <form onSubmit={formik.handleSubmit} className="px-4">
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">First Name</legend>
          <label htmlFor="firstName">
            <input
              id="firstName"
              className="w-full h-full focus:outline-none"
              type="text"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </label>
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.firstName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Last Name</legend>
          <input
            id="lastName"
            className="w-full h-full focus:outline-none"
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName ? (
            <div className="text-red-800">{formik.errors.lastName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">User Name</legend>
          <input
            id="userName"
            className="w-full h-full focus:outline-none"
            type="text"
            name="userName"
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.userName ? (
            <div className="text-red-800">{formik.errors.userName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Email</legend>
          <input
            id="email"
            className="w-full h-full focus:outline-none"
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <div className="text-red-800">{formik.errors.email}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Password</legend>
          <input
            id="password"
            className="w-full h-full focus:outline-none"
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <div className="text-red-800">{formik.errors.password}</div>
          ) : null}
        </fieldset>

        <div className="w-3/2 mt-8 flex place-content-center">
          <button
            type="submit"
            onClick={() => firestoreRefCreator(db, userId, "mycoll", "docs")}
            className=" hover:bg-lp-secondary-dark text-white font-bold p-4 w-3/4 border rounded-2xl bg-lp-secondary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  return displayNetworkFeedback === true ? <NetworkFeedback /> : comp;
};

export default SignUp;
