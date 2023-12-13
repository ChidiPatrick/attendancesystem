import React from "react";

// Third-party imports
import { Outlet } from "react-router";

// Local directory imports
import SideNavigation from "./sidenav.comp";

function AdminDashboardLayout() {
  return (
    <div className="w-full p-[10px] flex justify-start  h-screen  bg-[#F7F7F773]">
      {/* // <div className="w-full grid grid-cols-2"> */}
      <div className="w-[20%]">
        <SideNavigation />
      </div>
      <div className="w-[100%] h-screen">
        <Outlet className="w-[100%] h-screen" />
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
