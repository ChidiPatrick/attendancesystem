import React from "react";

import { Routes, Route } from "react-router";

// import Header from "./Components/LandingPageComponents/Header/header";
import LandingPage from "./Components/AppComponents/Pages/landingPage";
import SignUp from "./Components/AppComponents/SignUpComp/signUpComp";
import Signin from "./Components/AppComponents/LoginComp/login";
import UserProfile from "./Components/AppComponents/Pages/userProfile";
import History from "./Components/AppComponents/Pages/history";
import Home from "./Components/AppComponents/Pages/home";
import Permission from "./Components/AppComponents/Pages/permission";
import Announcement from "./Components/AppComponents/Pages/announcement";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/history" element={<History />} />
        <Route path="/home" element={<Home />} />
        <Route path="/permission" element={<Permission />} />
        <Route path="/announcement" element={<Announcement />} />
      </Routes>
    </div>
  );
}

export default App;
