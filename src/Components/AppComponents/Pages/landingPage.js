// In-built imports ////
import React from "react";

/// Local directory Imports ////
import PageNavbar from "../../LandingPageComponents/Navbar/landingPageNavbar";
import Header from "../../LandingPageComponents/Header/header";
import Description from "../../LandingPageComponents/Description/description";
import Features from "../../LandingPageComponents/LandingPageFeatures/features";
import Footer from "../../LandingPageComponents/Footer/footer";
import DashboardComponent from "../Admin Dashboard/admin dashboard components/dashboard.comp";

const LandingPage = () => {
  return (
    <div className=" overflow-x-hidden">
      <PageNavbar />
      <Header />
      <Description />
      <Features />
      <Footer />
      <DashboardComponent />
    </div>
  );
};

export default LandingPage;
