//// React Imports /////////////////////
import React from "react";

///Third Party Imports //////////////////
import * as Yup from "yup";
import { useFormik } from "formik";
import { ColorRing } from "react-loader-spinner";

////// Local directory Imports ///////////////
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";
import { signInWithEmailAndPassword } from "firebase/auth";
import SpinnerSmall from "../Loading spinners/spinnerSmall";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
      console.log("called");
    },
  });
  return (
    <div className="relative h-screen mt-16 p-2 border-t border-lp-primary">
      <h3 className="my-5  flex flex-col justify-start item-start">
        <span className="font-bold text-xl text-lp-primary">Hello Techie!</span>
        <span className="text-lg mt-2">Welcome Back</span>
      </h3>
      <form>
        <fieldset className="px-2 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Email</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
          {formik.errors.email ? (
            <div className="text-red-800">{formik.errors.email}</div>
          ) : null}
        </fieldset>
        <fieldset className="px-4 mb-4 border-2 border-solid border-signup-gray rounded py-2">
          <legend className="text-lp-primary">Password</legend>
          <input className="w-full h-full focus:outline-none" type="text" />
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
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#fcb05e", "#f47e60", "#3f71dc", "#034be6", "#F78F1E"]}
      />
      <SpinnerSmall />
    </div>
  );
};

export default Login;
