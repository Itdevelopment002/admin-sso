import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddUsers.css";
import api, {baseURL} from "../api";



const AddUsers = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        website: [],
        status: "active",
        role: "",
        mobileNo: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        website: "",
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
        { value: "SuperAdmin", label: "SuperAdmin" },
        { value: "Admin", label: "Admin" },
        { value: "User", label: "User" },
    ];

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
        setErrors({ ...errors, role: "" });
        setRoleDropdownOpen(false);
    };


    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prevState) => {
            const updatedWebsites = checked
                ? [...prevState.website, value]
                : prevState.website.filter((site) => site !== value);
            return { ...prevState, website: updatedWebsites };
        });
        setErrors({ ...errors, website: "" });
    };

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

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.mobileNo) newErrors.mobileNo = "Mobile Number is required";
        if (formData.website.length === 0) newErrors.website = "At least one website must be selected";
        if (!formData.role) newErrors.role = "Role is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await api.post("/users", formData);
            console.log("User added successfully:", response.data);
            toast.success("User added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate("/users");
            }, 1000); 
        } catch (error) {
            console.error("Error adding user:", error.response?.data || error.message);
            toast.error("Failed to add user. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    return (
        <div className="container-fluid mt-5 color-bg" id="users">
            <ToastContainer />

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
                            <input type="text" className="form-control" placeholder="Enter your name" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                            <input type="email" className="form-control" placeholder="Enter your email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="row g-4 mt-1">
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mobileNo" className="form-label fw-bold">Mobile Number</label>
                            <input type="tel" className="form-control" placeholder="Enter your mobile number" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} required />
                            {errors.mobileNo && <div className="text-danger">{errors.mobileNo}</div>}
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
                            {errors.website && <div className="text-danger">{errors.website}</div>}
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
                            {errors.role && <div className="text-danger">{errors.role}</div>}
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