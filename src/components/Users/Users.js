// import { useState } from "react";
// import { Link } from "react-router-dom";
// import './Users.css';

// const Users = () => {
//     const [activeTab, setActiveTab] = useState("all");
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);

//     const users = [
//         { id: 1, name: "John Doe", role: "Superadmin", website: "Orders" },
//         { id: 2, name: "Jane Smith", role: "Admin", website: "Services" },
//         { id: 3, name: "Mike Johnson", role: "User", website: "Orders" },
//         { id: 4, name: "Emily Davis", role: "Admin", website: "Services" },
//         { id: 5, name: "Robert Brown", role: "Superadmin", website: "Orders" },
//         { id: 6, name: "Alice Green", role: "User", website: "Services" },
//         { id: 7, name: "Charlie White", role: "Admin", website: "Orders" },
//         { id: 8, name: "Sophia Blue", role: "Superadmin", website: "Services" },
//         { id: 9, name: "Daniel Black", role: "User", website: "Orders" },
//         { id: 10, name: "Olivia Red", role: "Admin", website: "Services" },
//         { id: 11, name: "Ethan Gray", role: "Superadmin", website: "Orders" },
//         { id: 12, name: "Emma Yellow", role: "User", website: "Services" },
//         { id: 13, name: "Liam Purple", role: "Admin", website: "Orders" },
//         { id: 14, name: "Mia Orange", role: "Superadmin", website: "Services" },
//         { id: 15, name: "Noah Pink", role: "User", website: "Orders" },
//         { id: 16, name: "Ava Cyan", role: "Admin", website: "Services" },
//         { id: 17, name: "William Indigo", role: "Superadmin", website: "Orders" },
//         { id: 18, name: "Isabella Magenta", role: "User", website: "Services" },
//         { id: 19, name: "James Gold", role: "Admin", website: "Orders" },
//         { id: 20, name: "Charlotte Silver", role: "Superadmin", website: "Services" },
//         { id: 21, name: "Benjamin Bronze", role: "User", website: "Orders" },
//         { id: 22, name: "Amelia Platinum", role: "Admin", website: "Services" }
//     ];

//     const filteredUsers =
//         activeTab === "all" ? users : users.filter((user) => user.role.toLowerCase() === activeTab);

//     return (
//         <div className="container-fluid mt-5 color-bg" id="users">
//             <nav className="breadcrumb">
//                 <Link to="/dashboard" className="breadcrumb-item text-decoration-none">
//                     Home
//                 </Link>
//                 <span className="breadcrumb-item active1">User Management</span>
//             </nav>
//             <h2 className="location-title">
//                 <span className="highlight">User</span>
//                 <span className="highlighted-text"> Management</span>
//             </h2>
//             <ul className="nav nav-tabs">
//                 {['all', 'superadmin', 'admin', 'user'].map((tab) => (
//                     <li className="nav-item" key={tab}>
//                         <button
//                             className={`nav-link ${activeTab === tab ? "active" : ""}`}
//                             onClick={() => setActiveTab(tab)}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             <div className="table-responsive mt-3">
//                 <table className="table table-bordered table-hover">
//                     <thead className="thead-dark">
//                         <tr>
//                             <th width="30%">Name</th>
//                             <th width="30%">Website</th>
//                             <th className="text-center" width="30%">Role</th>
//                             <th className="text-center" width="10%">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.website}</td>
//                                 <td className="text-center">{user.role}</td>
//                                 <td className="text-center">
//                                     <button className="btn btn-sm btn-warning mx-1 mt-1" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
//                                         <i className="fas fa-edit"></i>
//                                     </button>
//                                     <button className="btn btn-sm btn-danger mx-1 mt-1" onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}>
//                                         <i className="fas fa-trash"></i>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {showEditModal && selectedUser && (
//                 <div className="modal fade show d-block" tabIndex="-1">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Edit User</h5>
//                                 <button className="close" onClick={() => setShowEditModal(false)}>&times;</button>
//                             </div>
//                             <div className="modal-body">
//                                 <label>Role:</label>
//                                 <select className="form-control">
//                                     <option value="Superadmin">Superadmin</option>
//                                     <option value="Admin">Admin</option>
//                                     <option value="User">User</option>
//                                 </select>
//                             </div>
//                             <div className="modal-footer">
//                                 <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Users;

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
        { id: 1, name: "John Doe", role: "Superadmin", website: "Orders" },
        { id: 2, name: "Jane Smith", role: "Admin", website: "Services" },
        { id: 3, name: "Mike Johnson", role: "User", website: "Orders" },
        { id: 4, name: "Emily Davis", role: "Admin", website: "Services" },
        { id: 5, name: "Robert Brown", role: "Superadmin", website: "Orders" },
        { id: 6, name: "Alice Green", role: "User", website: "Services" },
        { id: 7, name: "Charlie White", role: "Admin", website: "Orders" },
        { id: 8, name: "Sophia Blue", role: "Superadmin", website: "Services" },
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
            <h2 className="location-title">
                <span className="highlight">User</span>
                <span className="highlighted-text"> Management</span>
            </h2>
            <ul className="nav nav-tabs">
                {['all', 'superadmin', 'admin', 'user'].map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.website}</td>
                                <td className="text-center">{user.role}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-warning mx-1 mt-1" onClick={() => handleEditClick(user)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-sm btn-danger mx-1 mt-1" onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}>
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
                                    <option value="Superadmin">Superadmin</option>
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

