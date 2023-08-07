// In-built imports ////
import React from "react";

/// Local directory Imports ////
import PageNavbar from "../../LandingPageComponents/Navbar/landingPageNavbar";
import Header from "../../LandingPageComponents/Header/header";
import Description from "../../LandingPageComponents/Description/description";
import Features from "../../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../../LandingPageComponents/Footer/footer";
import UserProfile from "./userProfile";
import AttendanceFeedback from "./attendance.feedback";
import ClockLaunchCamera from "./clockin.launch.camera";
import UploadProfilePicture from "./upload.profile.pic";

const LandingPage = () => {
  return (
    <div className=" overflow-x-hidden">
      <PageNavbar />
      <Header />
      <Description />
      <Features />
      <Footer />
      <UploadProfilePicture />
    </div>
  );
};

export default LandingPage;
