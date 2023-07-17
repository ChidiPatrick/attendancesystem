import React from "react";

import Header from "../LandingPageComponents/Header/header";
import Description from "../LandingPageComponents/Description/description";
import Features from "../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../LandingPageComponents/Footer/footer";
import SignUp from "../AppComponents/SignUpComp/signUpComp";
import FaceScanSuccessful from "../AppComponents/Face Scan component/faceScanSuccessful";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Description />
      <Features />
      <Footer />
      <FaceScanSuccessful />
    </div>
  );
};

export default LandingPage;
