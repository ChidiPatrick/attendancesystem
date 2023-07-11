import React from "react";

import { Routes, Route } from "react-router";

// import Header from "./Components/LandingPageComponents/Header/header";
import LandingPage from "./Components/Landing Page/landingPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
