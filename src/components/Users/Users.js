import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Users.css";

const API_URL = "http://localhost:5000/users"; // JSON Server endpoint

const Users = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedUser, setEditedUser] = useState({ username: "", websiteName: "", role: "", status: "Active" });
    const [users, setUsers] = useState([]);

    // Fetch users from JSON server
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Filter users based on active tab
    const filteredUsers =
        activeTab === "all" ? users : users.filter((user) => user.role.toLowerCase() === activeTab);

    // Handle edit button click
    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditedUser(user);
        setShowEditModal(true);
    };

    // Handle input change in edit modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    // Save edited user data
    const handleSaveChanges = async () => {
        if (!selectedUser || !selectedUser.id) {
            console.error("No valid user selected for update.");
            return;
        }

        try {
            await axios.put(`${API_URL}/${selectedUser.id}`, editedUser);
            fetchUsers(); // Refresh the user list
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Handle delete user
    const handleDelete = async () => {
        if (!selectedUser || !selectedUser.id) {
            console.error("No valid user selected for deletion.");
            return;
        }

        try {
            await axios.delete(`${API_URL}/${selectedUser.id}`);
            fetchUsers(); // Refresh the user list
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
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

            {/* Filter Tabs */}
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

            {/* User Table */}
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
                                <td>{user.website}</td>
                                <td className="text-center">{user.role === "superadmin" ? "SuperAdmin" : user.role}</td>
                                <td className="text-center">
                                    <span
                                        className={`px-3 py-1 rounded-pill fw-semibold ${user.status === "Active"
                                                ? "bg-success bg-opacity-25 text-success"
                                                : "bg-danger bg-opacity-25 text-danger"
                                            }`}
                                        style={{ fontSize: '14px' }}
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

            {/* Edit Modal */}
            {showEditModal && selectedUser && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header  d-flex justify-content-between p-2"style={{ color: "#8A2BE2", backgroundColor: "rgba(138, 43, 226, 0.1)" }}>
                                <h5 className="modal-title">Edit User</h5>
                                <button className="close  bg-transparent border-0 p-0 fs-3" onClick={() => setShowEditModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <label>Username:</label>
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
                                <button className="btn btn-success btn-sm" onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between p-2"style={{ color: "#8A2BE2", backgroundColor: "rgba(138, 43, 226, 0.1)" }}>
                                <h5 className="modal-title">Delete User</h5>
                                <button className="close  bg-transparent border-0 p-0 fs-3" onClick={() => setShowDeleteModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;