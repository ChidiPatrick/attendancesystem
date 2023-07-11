import React from "react";

import Header from "../LandingPageComponents/Header/header";
import Description from "../LandingPageComponents/Description/description";
import Features from "../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../LandingPageComponents/Footer/footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Description />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
