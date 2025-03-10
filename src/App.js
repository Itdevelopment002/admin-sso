import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import AddUsers from "./components/Users/AddUsers";
import AddWebsite from "./components/Website/AddWebsite";
import ManageWebsite from "./components/Website/ManageWebsite";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole");
      setIsAuthenticated(loggedIn);
      setUserRole(role);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Redirect to login if not authenticated */}
        {!isAuthenticated ? (
          <Route path="/*" element={<Login />} />
        ) : (
          <>
            {/* Common Route for All Roles */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* SuperAdmin Routes */}
            {userRole === "SuperAdmin" && (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/add-users" element={<AddUsers />} />
                <Route path="/add-website" element={<AddWebsite />} />
                <Route path="/manage-website" element={<ManageWebsite />} />
              </>
            )}

            {/* Admin Routes */}
            {userRole === "Admin" && (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/add-users" element={<AddUsers />} />
              </>
            )}

            {/* Default Route for Unmatched Paths */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
