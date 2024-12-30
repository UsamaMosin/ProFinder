import React from "react";
import NavBar from "./adminNavbar";
import Home from "./adminHome";
import AdminSidebar from "./adminSidebar";
function dashboard() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <AdminSidebar />
      </div>
      <div className="col overflow auto">
        <NavBar />
        <Home />
      </div>
    </div>
  );
}

export default dashboard;
