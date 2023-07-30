// In-built imports ////
import React from "react";

/// Local directory Imports ////
import PageNavbar from "../../LandingPageComponents/Navbar/landingPageNavbar";
import Header from "../../LandingPageComponents/Header/header";
import Description from "../../LandingPageComponents/Description/description";
import Features from "../../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../../LandingPageComponents/Footer/footer";
import UserProfile from "./userProfile";
import AttendanceFeedback from "./attendanceFeedback";

const LandingPage = () => {
  return (
    <div className=" overflow-x-hidden">
      <PageNavbar />
      <Header />
      <Description />
      <Features />
      <Footer />
      {/* <UserProfile /> */}
      <AttendanceFeedback />
    </div>
  );
};

export default LandingPage;
