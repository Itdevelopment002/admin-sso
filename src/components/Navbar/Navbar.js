import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaUser, FaEdit, FaSignOutAlt, FaEllipsisV } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <nav className="navbar container-fluid nav-bg-color d-flex align-items-center justify-content-between py-2 border-bottom" id="navbar" style={{ background: `linear-gradient(to right, #F57F42 0%, #F55570 100%)`}}>
      <h3 className="fw-bold m-0 colors-text">ADMIN DASHBOARD</h3>
      <div className="position-relative d-none d-md-block" style={{ flex: 1, maxWidth: "400px" }}>
        <FaSearch className="position-absolute ms-2 mt-2 text-muted" />
        <input
          type="text"
          className="form-control rounded-pill ps-4 form-search"
          placeholder="Search or type command..."
        />
      </div>
      <div className="d-none d-md-flex align-items-center gap-2 position-relative">
        <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img
            src="https://img.freepik.com/premium-vector/profile-icon_933463-643.jpg"
            alt="User"
            className="rounded-circle"
            width="40"
            height="40"
          />
          <span className="fw-bold text-white">John Doe</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu show position-absolute top-100 end-0 mt-2 shadow rounded p-2" style={{ minWidth: "150px" }}>
            <a href="#" className="dropdown-item d-flex align-items-center gap-2">
              <FaUser /> View Profile
            </a>
            <a href="#" className="dropdown-item d-flex align-items-center gap-2">
              <FaEdit /> Edit Profile
            </a>
            <a href="#" onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger">
              <FaSignOutAlt /> Logout
            </a>
          </div>
        )}
      </div>
      <div className="d-md-none position-relative">
        <button className="btn p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaEllipsisV size={20} />
        </button>

        {isMobileMenuOpen && (
          <div className="dropdown-menu show position-absolute end-0 top-100 mt-2 shadow rounded p-2" style={{ minWidth: "150px" }}>
            <a href="#" className="dropdown-item d-flex align-items-center gap-2">
              <FaUser /> View Profile
            </a>
            <a href="#" className="dropdown-item d-flex align-items-center gap-2">
              <FaEdit /> Edit Profile
            </a>
            <a href="#" onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger">
              <FaSignOutAlt /> Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
