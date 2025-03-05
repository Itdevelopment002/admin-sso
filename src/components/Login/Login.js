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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Show SweetAlert on success
      Swal.fire({
        title: "Login Successful",
        text: "Redirecting to the dashboard",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Set localStorage after 2 seconds
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light" id="login">
      <div className="row w-50 shadow rounded bg-white p-4">
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
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="mb-3 position-relative">
              <label className="form-label fw-bold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                onClick={togglePasswordVisibility}
              ></i>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <input type="checkbox" id="rememberMe" className="form-check-input me-2" />
                <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
              </div>
              <a href="#." className="text-primary text-decoration-none">Forgot Password?</a>
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
