import { useState } from "react";
import { Link } from "react-router-dom";
import '../Users/Users.css';

import image1 from "../../assets/icons/crs-logo.png";
import image2 from "../../assets/icons/wedding.png";
import image3 from "../../assets/icons/pandal.png";
import image4 from "../../assets/icons/e-tender.png";
import image5 from "../../assets/icons/fire-station.png";
import image6 from "../../assets/icons/literature.png";
import image7 from "../../assets/icons/book.png";
import image8 from "../../assets/icons/aaple-sarkar.png";
import image9 from "../../assets/icons/property.png";
import image10 from "../../assets/icons/building.png";
import image11 from "../../assets/icons/office.png";
import image12 from "../../assets/icons/attduty.png";
import image13 from "../../assets/icons/biometric-authentication.png";
import image14 from "../../assets/icons/water.png";
import image15 from "../../assets/icons/legal.png";
import image16 from "../../assets/icons/umc.png";
import image17 from "../../assets/icons/divyang.png";
import image18 from "../../assets/icons/town-planning.png";
import image19 from "../../assets/icons/tree.png";
import image20 from "../../assets/icons/property-tax.png";
import image21 from "../../assets/icons/welfare.png";
import image22 from "../../assets/icons/election.png";
import image23 from "../../assets/icons/control.png";

const ManageWebsite = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedUser, setEditedUser] = useState({ websiteName: "", websiteUrl: "", websiteLogo: "", status: "Active" });

    const users = [
        { id: 1, websiteName: "Birth & Death Registration", websiteUrl: "/public/index2.html", websiteLogo: image1, status: "Active" },
        { id: 2, websiteName: "Online Marriage Application", websiteUrl: "https://marriage.rtsumc.com", websiteLogo: image2, status: "Active" },
        { id: 3, websiteName: "Online Pandal Permission", websiteUrl: "https://smartumc.com", websiteLogo: image3, status: "Active" },
        { id: 4, websiteName: "e-Tender", websiteUrl: "https://mahatenders.gov.in", websiteLogo: image4, status: "Active" },
        { id: 5, websiteName: "Fire NOC", websiteUrl: "https://fire.rtsumc.com/admin/login", websiteLogo: image5, status: "Active" },
        { id: 6, websiteName: "Library Management System", websiteUrl: "https://umclibrary.com", websiteLogo: image6, status: "Active" },
        { id: 7, websiteName: "Service Book", websiteUrl: "https://servicebook.smartumc.com", websiteLogo: image7, status: "Active" },
        { id: 8, websiteName: "Aaple Sarkar/PG Portal", websiteUrl: "https://aaplesarkar.mahaonline.gov.in/en", websiteLogo: image8, status: "Active" },
        { id: 9, websiteName: "Property Tax", websiteUrl: "https://www.umconlineservices.in/payment", websiteLogo: image9, status: "Active" },
        { id: 10, websiteName: "BPMS", websiteUrl: "https://mahavastu.maharashtra.gov.in", websiteLogo: image10, status: "Active" },
        { id: 11, websiteName: "E-office", websiteUrl: "https://mahaeoffice.maharshtra.gov.in", websiteLogo: image11, status: "Active" },
        { id: 12, websiteName: "AttDuty", websiteUrl: "https://umc.attduty.com", websiteLogo: image12, status: "Active" },
        { id: 13, websiteName: "Biometric Attendance System", websiteUrl: "https://117.247.85.16:90/iclock/Main.aspx", websiteLogo: image13, status: "Active" },
        { id: 14, websiteName: "Water Billing", websiteUrl: "https://www.water.umcgov.in", websiteLogo: image14, status: "Active" },
        { id: 15, websiteName: "Legal Application", websiteUrl: "https://app.zelican.com", websiteLogo: image15, status: "Active" },
        { id: 16, websiteName: "UMC Website", websiteUrl: "https://www.umc.gov.in", websiteLogo: image16, status: "Active" },
        { id: 17, websiteName: "Divyang Kalyankari Yojna", websiteUrl: "http://umc.divyangyojana.com", websiteLogo: image17, status: "Active" },
        { id: 18, websiteName: "Town Planning – Permission", websiteUrl: "#", websiteLogo: image18, status: "Deactive" },
        { id: 19, websiteName: "Tree Census", websiteUrl: "#", websiteLogo: image19, status: "Deactive" },
        { id: 20, websiteName: "Property Tax Survey New", websiteUrl: "https://www.umconlineservices.in/Payment/", websiteLogo: image20, status: "Active" },
        { id: 21, websiteName: "Nagrik Suvidha", websiteUrl: "#", websiteLogo: image21, status: "Deactive" },
        { id: 22, websiteName: "Election", websiteUrl: "#", websiteLogo: image22, status: "Deactive" },
        { id: 23, websiteName: "BCR", websiteUrl: "http://ulbbudget.com/LoginForm.aspx", websiteLogo: image23, status: "Active" }
    ];

    const filteredUsers =
        activeTab === "all" ? users : users.filter((user) => user.status.toLowerCase() === activeTab);

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
                <span className="breadcrumb-item active1">Website Management</span>
            </nav>
            <div className="row align-items-center">
                <div className="col-12 col-md-6 col-sm-7">
                    <h2 className="location-title">
                        <span className="highlight">Website</span>
                        <span className="highlighted-text"> Management</span>
                    </h2>
                </div>
                <div className="col-12 col-md-6 col-sm-5 text-end mt-md-0 userbuttom-margin">
                    <Link to="/add-website" className="btn btn-users">
                        <i className="fa fa-plus me-2"></i>
                        Add Website
                    </Link>
                </div>
            </div>


            <ul className="nav nav-tabs">
                {["all", "active", "deactive"].map((tab) => (
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
                            <th width='6%'>Sr. No.</th>
                            <th>Website Name</th>
                            <th>Dashboard URL</th>
                            <th className="text-center">Website Logo</th>
                            <th className="text-center">Status</th>
                            <th width='10%' className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{user.websiteName}</td>
                                <td>{user.websiteUrl}</td>
                                <td className="text-center"><img src={user.websiteLogo} alt="Logo" width="40" /></td>
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

            {showEditModal && selectedUser && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Website</h5>
                                <button className="close" onClick={() => setShowEditModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <label>Website Name:</label>
                                <input type="text" className="form-control" name="websiteName" value={editedUser.websiteName} onChange={handleInputChange} />

                                <label>Website URL:</label>
                                <input type="text" className="form-control" name="websiteUrl" value={editedUser.websiteUrl} onChange={handleInputChange} />

                                <label>Website Logo:</label>
                                <input type="text" className="form-control" name="websiteLogo" value={editedUser.websiteLogo} onChange={handleInputChange} />

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

export default ManageWebsite;