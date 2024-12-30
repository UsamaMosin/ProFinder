import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../adminPanel.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function adminSidebar() {
  const [active, setActive] = useState(1);
  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 vh-100">
      <div>
        <a href="" className="p-3 text-decoration-none text-white">
          <i className="bi bi-code-slash fs-4 me-4 "></i>
          <span className="fs-4">Sidebar</span>
        </a>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          <li
            className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(1)}
          >
            <Link
              to="/dashboard"
              className="p-1 text-decoration-none text-white"
            >
              <i className="bi bi-speedometer2 me-3 fs-4"></i>
              <span className="fs-4">Dashboard</span>
            </Link>
          </li>
          <li
            className={active === 2 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(2)}
          >
            <Link to="/users" className="p-1 text-decoration-none text-white">
              <i className="bi bi-people me-3 fs-4"></i>
              <span className="fs-4">Users</span>
            </Link>
          </li>
          <li
            className={active === 3 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(3)}
          >
            <Link to="/report" className="p-1 text-decoration-none text-white">
              <i className="bi bi-grid me-3 fs-4"></i>
              <span className="fs-4">Posts</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary" />
        <div className="nav-item p-2">
          <a href="" className="p-1 text-decoration-none text-white">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span className="fs-4">
              <strong>Usama</strong>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default adminSidebar;
