import React from "react";

import { Routes, Route } from "react-router";

// import Header from "./Components/LandingPageComponents/Header/header";
import LandingPage from "./Components/Landing Page/landingPage";
import SignUp from "./Components/AppComponents/SignUpComp/signUpComp";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
