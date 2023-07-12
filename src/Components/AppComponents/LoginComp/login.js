import React from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";

const Login = () => {
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
    <div className="h-screen mt-16 p-2 border-t border-lp-primary">
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hello Techie!</span>
        <span className="text-lg mt-2">Welcome Back</span>
      </h3>
      <form>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Email</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.firstName}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Password</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.firstName ? (
            <div className="text-red-800">{formik.errors.password}</div>
          ) : null}
        </fieldset>
        <div className="w-3/2 mt-4 flex place-content-center">
          <button
            type="submit"
            onClick={() => {}}
            className="text-white mt-8 font-bold p-4 w-3/4 border rounded-2xl bg-lp-secondary"
          >
            Login
          </button>
        </div>
        <ul className="mt-7">
          <li className="py-2">
            <a href="#" className="text-lp-primary border-b border-lp-primary">
              Create account
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-lp-primary border-b border-lp-primary">
              Reset Password
            </a>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
