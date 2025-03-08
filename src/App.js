import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import AddUsers from "./components/Users/AddUsers";
import AddWebsite from "./components/Website/AddWebsite";
import ManageWebsite from "./components/Website/ManageWebsite.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(loggedIn);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <Route path="/*" element={<Login />} />
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-users" element={<AddUsers />} />
            <Route path="/add-website" element={<AddWebsite />} />
            <Route path="/manage-website" element={<ManageWebsite />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
