import React from "react";
import { useHistory } from "react-router-dom";
function adminNavbar() {
  const history = useHistory();
  const handleLogout = () => {
    // Perform logout actions here
    // Clear session storage or any other necessary tasks
    sessionStorage.removeItem("userId");
    console.log(sessionStorage.getItem("userId"));
    // Redirect to the login page
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand d-none d-md-block" href="#">
          Admin's Dashboard
        </a>
        <a className="navbar-brand d-block d-md-none" href="#">
          <i className="bi bi-justify"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item border rounded">
              <a className="nav-link text-white" aria-current="page" href="#">
                <i className="bi bi-search"></i>
                Search
              </a>
            </li>
            <li className="nav-item mx-1 rounded border">
              <a className="nav-link text-white" aria-current="page" href="#">
                Account
              </a>
            </li>
            <li className="nav-item border rounded">
              <a
                className="nav-link text-white"
                aria-current="page"
                href="#"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default adminNavbar;
