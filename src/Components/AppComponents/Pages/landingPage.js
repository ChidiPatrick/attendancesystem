// In-built imports ////
import React from "react";

/// Local directory Imports ////
import PageNavbar from "../../LandingPageComponents/Navbar/landingPageNavbar";
import Header from "../../LandingPageComponents/Header/header";
import Description from "../../LandingPageComponents/Description/description";
import Features from "../../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../../LandingPageComponents/Footer/footer";

const LandingPage = () => {
  return (
    <div className=" overflow-x-hidden">
      <PageNavbar />
      <Header />
      <Description />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
