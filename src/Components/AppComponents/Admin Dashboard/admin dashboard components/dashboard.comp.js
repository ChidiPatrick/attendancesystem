import React from "react";

//Local Imports
import SideNavigation from "./sidenav.comp";

function DashboardComponent() {
  return (
    <div className="w-full flex h-screen  bg-[#F7F7F773]">
      <div>
        <SideNavigation />
      </div>
      <div className="w-full h-screen "></div>
    </div>
  );
}

export default DashboardComponent;
