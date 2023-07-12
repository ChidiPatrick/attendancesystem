import React from "react";

import Header from "../LandingPageComponents/Header/header";
import Description from "../LandingPageComponents/Description/description";
import Features from "../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../LandingPageComponents/Footer/footer";
import SignUp from "../AppComponents/SignUpComp/signUpComp";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Description />
      <Features />
      <Footer />
      <SignUp />
    </div>
  );
};

export default LandingPage;
