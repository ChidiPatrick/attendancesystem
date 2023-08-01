import React from "react";

const Footer = () => {
  return (
    <footer className="bg-lp-footer-bg min-h-64 w-full pt-10 border rounded-t-3xl  h-auto">
      <div className="w-[90%] md:w-[80%] mx-auto relative">
        <div className=" w-full absolute img-center">
          <figure className=" md:w-full flex justify-center ">
            <img
              src="/images/adminFeatures.svg"
              className=" w-[180px] md:w-[300px]"
            />
          </figure>
          <div className="w-full md:text-white bg-[#CCC] md:bg-inherit rounded-lg">
            <p className="text-center text-5 mt-4 ">
              Easy daily download of recorded
            </p>
            <p className=" text-center text-[14px] md:text-base">
              attendance by instructor
            </p>
          </div>
        </div>
        {/* <div className="text-lp-secondary p-4"></div> */}
        <div className=" w-full md:w-[70%] lg:w-[50%] mx-auto">
          <h4 className="text-lp-secondary pt-36 md:pt-52">Quick Links</h4>
          <div className=" text-white flex lg:gap-10 justify-between">
            <div>
              <ul className=" flex gap-4 underline flex-col lg:flex-row">
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>Create account</span>
                </li>
                <li>
                  <span>Login as admin</span>
                </li>
                <li>
                  <span>Contact us</span>
                </li>
              </ul>
            </div>
            <div className="  flex flex-col justify-center">
              <ul className=" flex gap-4 flex-col justify-center items-center lg:flex-row">
                <li>
                  <span className="h-5 w-5 flex place-content-center border rounded-full bg-white">
                    <img src="/images/facebook.svg" />
                  </span>
                </li>
                <li>
                  <span className="h-5 w-5 flex place-content-center border rounded-full bg-white">
                    <img src="/images/instagram.svg" />
                  </span>
                </li>
                <li>
                  <span className="h-5 w-5 flex place-content-center border rounded-full bg-white">
                    <img src="/images/admin.svg" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center py-10 text-white">
          Diaku House, 105 Zik Avenue, Awka, Anambra State, Nigeria
        </p>

        <p className="m-5 text-gray-50 text-sm border-t border-gray-50 border-opacity-10 border-solid text-center pt-3">
          &copy; LM Tech Hub
        </p>
        {/* <ul>
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
        </ul> */}
        {/* <p className="w-full text-[14px] md:text-base text-white font-bold text-center mt-10 mb-4">
          Diaku House, 105 Zik Avenue,
          <br /> Awka, Anambra State, Nigeria
        </p>
        <p className="m-5 text-gray-50 text-sm border-t border-gray-50 border-opacity-10 border-solid text-center">
          &copy; De Real Devs
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
