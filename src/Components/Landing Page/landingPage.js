import React from "react";

import Header from "../LandingPageComponents/Header/header";
import Description from "../LandingPageComponents/Description/description";
import Features from "../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../LandingPageComponents/Footer/footer";
import SignUp from "../AppComponents/SignUpComp/signUpComp";
import Login from "../AppComponents/LoginComp/login";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Description />
      <Features />
      <Footer />
      <SignUp />
      <Login />
    </div>
  );
};

export default LandingPage;
