import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Users/Users.css";

const API_URL = "http://localhost:5000/websites";

const ManageWebsite = () => {
    const [websites, setWebsites] = useState([]);  
    const [activeTab, setActiveTab] = useState("all");
    const [selectedWebsite, setSelectedWebsite] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedWebsite, setEditedWebsite] = useState({
        websiteName: "",
        websiteURL: "",
        websiteLogo: "",
        status: "active"
    });

    // 🔹 Fetch Data from JSON Server on Component Mount
    useEffect(() => {
        fetchWebsites();
    }, []);

    const fetchWebsites = async () => {
        try {
            const response = await axios.get(API_URL);
            setWebsites(response.data);
        } catch (error) {
            console.error("Error fetching websites:", error);
        }
    };

    const filteredWebsites = activeTab === "all"
        ? websites
        : websites.filter((site) => site.status.toLowerCase() === activeTab);

    const handleEditClick = (website) => {
        setSelectedWebsite(website);
        setEditedWebsite(website);
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedWebsite({ ...editedWebsite, [name]: value });
    };

    const handleSaveChanges = async () => {
        if (!selectedWebsite || !selectedWebsite.id) {
            console.error("No valid website selected for update.");
            return;
        }
    
        try {
            const response = await axios.put(`${API_URL}/${selectedWebsite.id}`, editedWebsite);
            console.log("Website updated successfully:", response.data);
            fetchWebsites();
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating website:", error.response?.data || error.message);
        }
    };
    

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${selectedWebsite.id}`);
            fetchWebsites();
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting website:", error);
        }
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

            {/* 🔹 Filter Tabs */}
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

            {/* 🔹 Website Table */}
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
                        {filteredWebsites.map((website, index) => (
                            <tr key={website.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{website.websiteName}</td>
                                <td>{website.websiteURL}</td>
                                <td className="text-center">
                                    <img src={`/images/${website.websiteLogo}`} alt="Logo" width="40" />
                                </td>
                                <td className="text-center">
                                    <span className={`px-3 py-1 rounded-pill fw-semibold ${website.status === "active"
                                            ? "bg-success bg-opacity-25 text-success"
                                            : "bg-danger bg-opacity-25 text-danger"
                                        }`} style={{ fontSize: '14px' }}>
                                        {website.status.charAt(0).toUpperCase() + website.status.slice(1)}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-purple mx-1 mt-1"
                                        onClick={() => handleEditClick(website)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger-custom mx-1 mt-1"
                                        onClick={() => { setSelectedWebsite(website); setShowDeleteModal(true); }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔹 Edit Modal */}
            {showEditModal && selectedWebsite && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Website</h5>
                                <button className="close" onClick={() => setShowEditModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <label>Website Name:</label>
                                <input type="text" className="form-control" name="websiteName" value={editedWebsite.websiteName} onChange={handleInputChange} />

                                <label>Website URL:</label>
                                <input type="text" className="form-control" name="websiteURL" value={editedWebsite.websiteURL} onChange={handleInputChange} />

                                <label>Website Logo:</label>
                                <input type="text" className="form-control" name="websiteLogo" value={editedWebsite.websiteLogo} onChange={handleInputChange} />

                                <label>Status:</label>
                                <select className="form-control" name="status" value={editedWebsite.status} onChange={handleInputChange}>
                                    <option value="active">Active</option>
                                    <option value="deactive">Deactive</option>
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

            {/* 🔹 Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
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

export default ManageWebsite;