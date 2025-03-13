import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/users"); // Fetch JSON from public folder
        const data = await response.json();

        // Find user with matching email & password
        const user = data.find((u) => u.email === email && u.password === password);

        if (user) {
          Swal.fire({
            title: "Login Successful",
            text: `Welcome ${user.username} (${user.role})`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          // Store login info in localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("username", user.username);

          setTimeout(() => {
            if (user.role === "SuperAdmin") {
              navigate("/superadmin-dashboard");
            } else if (user.role === "Admin") {
              navigate("/admin-dashboard");
            } else {
              navigate("/user-dashboard");
            }
          }, 2000);
        } else {
          Swal.fire({
            title: "Login Failed",
            text: "Invalid email or password",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load user data",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light" id="login">
      <div className="row shadow rounded bg-white p-4">
        <div className="form-container">
          <h3 className="text-primary fw-bold text-center">ADMIN DASHBOARD</h3>
          <p className="text-muted text-center fw-semibold">Welcome to Admin Dashboard</p>
          <form className="py-3" onSubmit={handleSubmit}>
            <h2 className="text-center fw-bold mb-4">LOGIN</h2>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "error-border" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="mb-3 position-relative">
              <label className="form-label fw-bold">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control password-input ${errors.password ? "error-border" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                />
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
              <div>
                <input type="checkbox" id="rememberMe" className="form-check-input me-2" />
                <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
              </div>
              <a href="#." className="forget-password text-primary text-decoration-none">Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
