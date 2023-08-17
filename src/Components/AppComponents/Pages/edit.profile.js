import React from "react";

// Third-party imports //
import * as Yup from "yup";
import { useFormik } from "formik";

/// Local directory imports ///
import NavBar from "./navBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveProfileEdit } from "../Handlers/save.profile.handler";
import NetworkFeedback from "../Modal/networkFeedback";
import SpinnerSmall from "../Loading spinners/spinnerSmall";
import FeedbackModal from "../Modal/feedbackModal";
import { hideFeedback } from "../../Redux Slices/signupSlice";
import { Link } from "react-router-dom";

function EditProfie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////// Redux states //////
  const displayNetWorkFeedback = useSelector(
    (state) => state.signupSlice.displayNetWorkFeedback
  );

  const userProfile = useSelector(
    (state) => state.profileSlice.userProfileData
  );

  const displaySpinner = useSelector(
    (state) => state.signupSlice.displaySpinner
  );

  const displayFeedback = useSelector(
    (state) => state.signupSlice.displayFeedback
  );

  const userId = useSelector((state) => state.loginSlice.userId);

  console.log(userProfile);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      userName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      saveProfileEdit(values, userId, dispatch);
      console.log(values);
    },
  });

  return (
    <div className="w-full relative p-2 h-screen bg-user-profile ">
      <NavBar>Edit Profile</NavBar>
      <figure className="w-full relative h-[300px] bg-blue-300 border rounded-xl">
        <img
          src={userProfile.profilePictureURL}
          className="w-full h-[300px] bg-blue-300 border rounded-xl"
        />
        <Link
          to={"/uploadProfilePicture"}
          className="absolute top-[85%] right-[2%] min-w-[50px] p-2 bg-lp-secondary border rounded-md"
        >
          Upload icon
        </Link>
      </figure>

      <form onSubmit={formik.handleSubmit} className="mt-[50px]">
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
        <div className="w-full mt-[50px] flex justify-center items-center">
          <button
            type="submit"
            className="p-2 w-3/4  bg-lp-secondary text-white text-lg border rounded-full"
          >
            Save changes
          </button>
        </div>
      </form>
      {displayNetWorkFeedback === true ? <NetworkFeedback /> : null}
      {displaySpinner === true ? <SpinnerSmall /> : null}
      {displayFeedback === true ? (
        <FeedbackModal handleClick={() => dispatch(hideFeedback())}>
          Profile updated successfully
        </FeedbackModal>
      ) : null}
    </div>
  );
}

export default EditProfie;
