import React from "react";

// Third-party imports
import { Outlet } from "react-router";

// Local directory imports
import SideNavigation from "./sidenav.comp";

function AdminDashboardLayout() {
  return (
    <div className="w-full p-[10px] flex h-screen  bg-[#F7F7F773]">
      <div>
        <SideNavigation />
      </div>
      <div>
        <Outlet className="w-[100%] bg-red-400 h-screen" />
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
