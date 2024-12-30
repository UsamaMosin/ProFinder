import React from "react";
import NavBar from "./adminNavbar";
import AdminSidebar from "./adminSidebar";

function adminReport() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <AdminSidebar />
      </div>
      <div className="col overflow auto">
        <NavBar />
      </div>
    </div>
  );
}

export default adminReport;
