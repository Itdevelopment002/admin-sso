import { useState } from "react";
import { Link } from "react-router-dom";
import './Users.css';

const Users = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: "", website: "", role: "" });

    const users = [
        { id: 1, name: "John Doe", role: "superadmin", website: "Orders" },
        { id: 2, name: "Jane Smith", role: "Admin", website: "Services" },
        { id: 3, name: "Mike Johnson", role: "User", website: "Orders" },
        { id: 4, name: "Emily Davis", role: "Admin", website: "Services" },
        { id: 5, name: "Robert Brown", role: "superadmin", website: "Orders" },
        { id: 6, name: "Alice Green", role: "User", website: "Services" },
        { id: 7, name: "Charlie White", role: "Admin", website: "Orders" },
        { id: 8, name: "Sophia Blue", role: "superadmin", website: "Services" },
        { id: 9, name: "Daniel Black", role: "User", website: "Orders" },
        { id: 10, name: "Olivia Red", role: "Admin", website: "Services" }
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
                    <Link to="/manage-website" className="btn btn-users">
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
                            <th>Name</th>
                            <th>Website</th>
                            <th className="text-center">Role</th>
                            <th width='10%' className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.website}</td>
                                <td className="text-center">{user.role === "superadmin" ? "SuperAdmin" : user.role}</td>
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
                                <label>Name:</label>
                                <input type="text" className="form-control" name="name" value={editedUser.name} onChange={handleInputChange} />

                                <label>Website:</label>
                                <input type="text" className="form-control" name="website" value={editedUser.website} onChange={handleInputChange} />

                                <label>Role:</label>
                                <select className="form-control" name="role" value={editedUser.role} onChange={handleInputChange}>
                                    <option value="superadmin">SuperAdmin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
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
