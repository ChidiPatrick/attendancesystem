import React from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
    onSubmit: (values) => {},
  });
  return (
    <div className="p-2 h-screen ">
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hello Techie!</span>
        <span className="text-lg">Welcome to LM Tech Hub</span>
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <fieldset className="px-2 mb-4 border-2 border-solid border-gray-500">
          <legend>First Name</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.firstName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-gray-500">
          <legend>Last Name</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.lastName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-gray-500">
          <legend>User Name</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.userName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-gray-500">
          <legend>Email</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.email}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-gray-500">
          <legend>Password</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.password}</div>
          ) : null}
        </fieldset>

        <div className="w-3/2 mt-4 flex place-content-center">
          <button
            type="submit"
            onClick={() => {}}
            className="text-white font-bold p-4 w-3/4 border rounded-2xl bg-lp-secondary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
