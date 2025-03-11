import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddUsers.css";

const AddUsers = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        website: [],
        status: "active",
        role: "",
        mobileNo: "",
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const websites = [
        { value: "Birth & Death Registration", label: "Birth & Death Registration" },
        { value: "Marriage Registration Portal", label: "Marriage Registration Portal" },
        { value: "Aaple Sarkar", label: "Aaple Sarkar" },
        { value: "UlhasNagar Municipal Corporation", label: "UlhasNagar Municipal Corporation" },
        { value: "Kulgoan Badlapur Municipal Council", label: "Kulgoan Badlapur Municipal Council" },

    ];

    const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
    const roleDropdownRef = useRef(null);

    const roles = [
        { value: "superadmin", label: "SuperAdmin" },
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
    ];

    // Handle role selection
    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
        setRoleDropdownOpen(false);
    };

    // Handle checkbox selection
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prevState) => {
            const updatedWebsites = checked
                ? [...prevState.website, value]
                : prevState.website.filter((site) => site !== value);
            return { ...prevState, website: updatedWebsites };
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
                setRoleDropdownOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="container-fluid mt-5 color-bg" id="users">
            <nav className="breadcrumb">
                <Link to="/dashboard" className="breadcrumb-item text-decoration-none">Home</Link>
                <Link to="/users" className="breadcrumb-item text-decoration-none">User Management</Link>
                <span className="breadcrumb-item active1">Add Users</span>
            </nav>

            <div className="row align-items-center">
                <div className="col-12">
                    <h2 className="location-title">
                        <span className="highlight">Add</span> <span className="highlighted-text">Users</span>
                    </h2>
                </div>
            </div>

            <div className="container-fluid p-4 shadow-lg" id="add-users-form">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4 mt-1">
                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label fw-semibold">Username</label>
                            <input type="text" className="form-control" placeholder="Enter your name" id="username" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                            <input type="email" className="form-control" placeholder="Enter your email" id="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                    </div>

                    <div className="row g-4 mt-1">
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" id="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mobileNo" className="form-label fw-bold">Mobile Number</label>
                            <input type="tel" className="form-control" placeholder="Enter your mobile number" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })} required />
                        </div>
                    </div>

                    {/* Custom Multi-Select Dropdown with Checkboxes */}
                    <div className="row g-4 mt-1">
                        <div className="col-lg-5 col-md-6">
                            <label className="form-label fw-bold">Website Name</label>
                            <div className="dropdown custom-dropdown" ref={dropdownRef}>
                                <button
                                    type="button"
                                    className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="selected-options text-truncate" title={formData.website.join(", ")}>
                                        {formData.website.length > 0 ? formData.website.join(", ") : "Select Website"}
                                    </span>
                                </button>

                                {dropdownOpen && (
                                    <ul className="dropdown-menu show w-100">
                                        {websites.map((site) => (
                                            <li key={site.value} className="dropdown-item custom-dropdown-item">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input checkbox-border me-2"
                                                    value={site.value}
                                                    checked={formData.website.includes(site.value)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span className="text-wrap">{site.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Custom Multi-Select Dropdown with Checkboxes */}
                        <div className="col-lg-4 col-md-6">
                            <label className="form-label fw-bold">Role</label>
                            <div className="dropdown custom-dropdown" ref={roleDropdownRef}>
                                <button
                                    type="button"
                                    className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between overflow-hidden"
                                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                                >
                                    <span className="selected-options text-truncate" title={formData.role ? roles.find(r => r.value === formData.role)?.label : "Select Role"}>
                                        {formData.role ? roles.find(r => r.value === formData.role)?.label : "Select Role"}
                                    </span>
                                </button>

                                {roleDropdownOpen && (
                                    <ul className="dropdown-menu show w-100">
                                        {roles.map((role) => (
                                            <li key={role.value} className="dropdown-item custom-dropdown-item custom-hover" onClick={() => handleRoleSelect(role.value)}>
                                                {role.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-12">
                            <label className="form-label fw-bold">Status</label>
                            <div className="d-flex gap-4 mt-1">
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="active" name="status" value="active" checked={formData.status === "active"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
                                    <label htmlFor="active">Active</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="deactive" name="status" value="deactive" checked={formData.status === "deactive"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
                                    <label htmlFor="deactive">Deactive</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="btn btn-success btn-md px-5">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUsers;
