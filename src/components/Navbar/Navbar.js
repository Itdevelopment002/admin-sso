import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaUser, FaEdit, FaSignOutAlt, FaEllipsisV } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("User");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");

    if (storedRole) {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          const loggedInUser = data.find((user) => user.role === storedRole);
          if (loggedInUser) {
            setUsername(loggedInUser.username);
            setRole(loggedInUser.role);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-bg container-fluid nav-bg-color d-flex align-items-center justify-content-between py-3 border-bottom" id="navbar">
      <Link to="/dashboard" className="text-decoration-none">
        <h3 className="fw-bold m-0 colors-text">ADMIN DASHBOARD</h3>
      </Link>
      <div className="position-relative d-none d-md-block search-container">
        <FaSearch className="search-icon" />
        <input type="text" className="form-control rounded-pill ps-5 form-search" placeholder="Search or type command..." />
      </div>
      <div className="d-none d-md-flex align-items-center gap-2 position-relative" ref={dropdownRef}>
        <div className="user-profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img
            src="https://img.freepik.com/premium-vector/profile-icon_933463-643.jpg"
            alt="User"
            className="user-image"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold username">{username}</span>
            <span className="user-role">{role}</span>
          </div>
          <RiArrowDropDownLine className="dropdown-arrow" size={30} />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu show position-absolute top-100 mt-2 shadow rounded p-2 custom-dropdown">
            <Link to="#" className="dropdown-item d-flex align-items-center gap-2 custom-text-color">
              <FaUser /> View Profile
            </Link>
            <Link to="#" className="dropdown-item d-flex align-items-center gap-2 custom-text-color">
              <FaEdit /> Edit Profile
            </Link>
            <Link to="#" onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger">
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        )}
      </div>
      <div className="d-md-none position-relative" ref={mobileMenuRef}>
        <button className="btn p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaEllipsisV size={20} className="menu-icon" />
        </button>

        {isMobileMenuOpen && (
          <div className="dropdown-menu show position-absolute end-0 top-100 mt-2 shadow rounded p-2 custom-dropdown">
            <Link to="#" className="dropdown-item d-flex align-items-center gap-2 custom-text-color">
              <FaUser /> View Profile
            </Link>
            <Link to="#" className="dropdown-item d-flex align-items-center gap-2 custom-text-color">
              <FaEdit /> Edit Profile
            </Link>
            <Link to="#" onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger">
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;