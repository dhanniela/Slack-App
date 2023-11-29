import React, { useState, useEffect } from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { Outlet } from "react-router";
import { DMSidebar } from "./DMSidebar";

export function DashboardWrapper() {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 851);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="content">
        <Sidebar />
        <div className="content-container">
            <Outlet />
        </div>
    </div>
  );
}