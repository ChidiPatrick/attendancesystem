import React from "react";

import { Routes, Route } from "react-router";

// import Header from "./Components/LandingPageComponents/Header/header";
import LandingPage from "./Components/AppComponents/Pages/landingPage";
import SignUp from "./Components/AppComponents/SignUpComp/signUpComp";
import Signin from "./Components/AppComponents/LoginComp/login";
import UserProfile from "./Components/AppComponents/Pages/userProfile";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
