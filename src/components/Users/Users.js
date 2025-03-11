import { useState } from "react";
import { Link } from "react-router-dom";
import './Users.css';

const Users = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedUser, setEditedUser] = useState({ username: "", websiteName: "", role: "", status: "Active" });

    const users = [
        { id: 1, username: "Rahul Sharma", role: "superadmin", websiteName: "Birth & Death", status: "Active" },
        { id: 2, username: "Priya Patel", role: "Admin", websiteName: "Online Marriage Application", status: "Active" },
        { id: 3, username: "Amit Singh", role: "User", websiteName: "Online Pandal(Mandap) Permission", status: "Deactive" },
        { id: 4, username: "Neha Gupta", role: "Admin", websiteName: "e-Tender", status: "Active" },
        { id: 5, username: "Vikram Yadav", role: "superadmin", websiteName: "Fire NOC", status: "Active" },
        { id: 6, username: "Anjali Desai", role: "User", websiteName: "Library Management System", status: "Deactive" },
        { id: 7, username: "Rajesh Kumar", role: "Admin", websiteName: "Service Book", status: "Deactive" },
        { id: 8, username: "Sneha Reddy", role: "superadmin", websiteName: "Aaple Sarkar/PG Portal", status: "Active" },
        { id: 9, username: "Arun Mishra", role: "User", websiteName: "Property Tax", status: "Active" },
        { id: 10, username: "Pooja Choudhary", role: "Admin", websiteName: "BPMS", status: "Deactive" },
        { id: 11, username: "Karan Mehta", role: "superadmin", websiteName: "E-office", status: "Active" },
        { id: 12, username: "Divya Joshi", role: "User", websiteName: "AttDuty", status: "Deactive" },
        { id: 13, username: "Ravi Verma", role: "Admin", websiteName: "Biometric Attendance System", status: "Active" },
        { id: 14, username: "Shreya Malhotra", role: "superadmin", websiteName: "Water Billing", status: "Active" },
        { id: 15, username: "Sanjay Tiwari", role: "User", websiteName: "Legal Application", status: "Deactive" },
        { id: 16, username: "Kavita Bhatia", role: "Admin", websiteName: "UMC Website", status: "Active" },
        { id: 17, username: "Manoj Saxena", role: "superadmin", websiteName: "Divyang Kalyankari Yojna", status: "Active" },
        { id: 18, username: "Anita Rao", role: "User", websiteName: "Town Planning – Permission", status: "Deactive" },
        { id: 19, username: "Vivek Pandey", role: "Admin", websiteName: "Tree Census", status: "Active" },
        { id: 20, username: "Swati Dubey", role: "superadmin", websiteName: "Property Tax Survey New", status: "Active" },
        { id: 21, username: "Rohit Nair", role: "User", websiteName: "Nagrik Suvidha", status: "Deactive" },
        { id: 22, username: "Preeti Iyer", role: "Admin", websiteName: "Election", status: "Active" },
        { id: 23, username: "Deepak Menon", role: "superadmin", websiteName: "BCR", status: "Active" }
    ];

    const filteredUsers =
        activeTab === "all" ? users : users.filter((user) => user.role.toLowerCase() === activeTab);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditedUser(user);
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="container-fluid mt-5 color-bg" id="users">
            <nav className="breadcrumb">
                <Link to="/dashboard" className="breadcrumb-item text-decoration-none">
                    Home
                </Link>
                <span className="breadcrumb-item active1">User Management</span>
            </nav>
            <div className="row align-items-center">
                <div className="col-12 col-md-6 col-sm-7">
                    <h2 className="location-title">
                        <span className="highlight">User</span>
                        <span className="highlighted-text"> Management</span>
                    </h2>
                </div>
                <div className="col-12 col-md-6 col-sm-5 text-end mt-md-0 userbuttom-margin">
                    <Link to="/add-users" className="btn btn-users">
                        <i className="fa fa-plus me-2"></i>
                        Add Users
                    </Link>
                </div>
            </div>

            <ul className="nav nav-tabs">
                {["all", "superadmin", "admin", "user"].map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "superadmin" ? "SuperAdmin" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="table-responsive mt-3">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th width='6%'>Sr. No.</th>
                            <th>Username</th>
                            <th>Website Name</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Status</th>
                            <th width='10%' className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.websiteName}</td>
                                <td className="text-center">{user.role === "superadmin" ? "SuperAdmin" : user.role}</td>
                                <td className="text-center">
                                    <span
                                        className={`px-3 py-1 rounded-pill fw-semibold ${user.status === "Active"
                                                ? "bg-success bg-opacity-25 text-success"
                                                : "bg-danger bg-opacity-25 text-danger"
                                            }`}
                                            style={{fontSize:'14px'}}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-purple mx-1 mt-1"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger-custom mx-1 mt-1"
                                        onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showEditModal && selectedUser && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button className="close" onClick={() => setShowEditModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <label>UserName:</label>
                                <input type="text" className="form-control" name="username" value={editedUser.username} onChange={handleInputChange} />

                                <label>Website Name:</label>
                                <input type="text" className="form-control" name="websiteName" value={editedUser.websiteName} onChange={handleInputChange} />

                                <label>Role:</label>
                                <select className="form-control" name="role" value={editedUser.role} onChange={handleInputChange}>
                                    <option value="superadmin">SuperAdmin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>

                                <label>Status:</label>
                                <select className="form-control" name="status" value={editedUser.status} onChange={handleInputChange}>
                                    <option value="Active">Active</option>
                                    <option value="Deactive">Deactive</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEditModal(false)}>Close</button>
                                <button className="btn btn-success btn-sm">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
