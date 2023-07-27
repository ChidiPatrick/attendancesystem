import React from "react";

const Footer = () => {
  return (
    <footer className="bg-lp-footer-bg min-h-64 w-full pt-10 border rounded-t-3xl  ">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="text-lp-secondary p-4">Quick Links</div>
        <ul>
          <li className="flex justify-between px-4 mb-5">
            <a className="text-white border-b h-6  border-solid border-white">
              Home
            </a>
            <div className="h-5 w-5 flex place-content-center border rounded-full bg-white">
              <img src="/images/facebook.svg" />
            </div>
          </li>
          <li className="flex justify-between px-4 mb-5">
            <a className="text-white border-b h-6  border-solid border-white">
              Create account
            </a>
            <div className="h-5 w-5 flex place-content-center border rounded-full bg-white">
              <img src="/images/instagram.svg" />
            </div>
          </li>
          <li className="flex justify-between px-4 mb-5">
            <a className="text-white border-b h-6  border-solid border-white">
              Login as admin
            </a>
            <div className="h-5 w-5 flex place-content-center border rounded-full bg-white">
              <img src="/images/admin.svg" />
            </div>
          </li>
          <li className="flex justify-between px-4 mb-5">
            <a className="text-white border-b h-6  border-solid border-white">
              Contact Us
            </a>
            <div className="h-5 w-5 flex place-content-center border rounded-full bg-white"></div>
          </li>
        </ul>
        <p className="w-full text-[14px] md:text-base text-white font-bold text-center mt-10 mb-4">
          Diaku House, 105 Zik Avenue,
          <br /> Awka, Anambra State, Nigeria
        </p>
        <p className="m-5 text-gray-50 text-sm border-t border-gray-50 border-opacity-10 border-solid text-center">
          &copy; De Real Devs
        </p>
      </div>
    </footer>
  );
};

export default Footer;
