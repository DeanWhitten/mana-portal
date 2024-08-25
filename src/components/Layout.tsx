import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout-main">
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </div>
  );
};

export default Layout;
