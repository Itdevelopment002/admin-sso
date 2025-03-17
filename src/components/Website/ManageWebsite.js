import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        dashboardURL: "",
        websiteLogo: "",
        status: "active",
    });

    useEffect(() => {
        fetchWebsites();
    }, []);

    const fetchWebsites = async () => {
        try {
            const response = await axios.get(API_URL);
            setWebsites(response.data);
        } catch (error) {
            console.error("Error fetching websites:", error);
            toast.error("Failed to fetch websites!", { position: "top-right" });
        }
    };

    const filteredWebsites = activeTab === "all" ? websites : websites.filter((site) => site.status.toLowerCase() === activeTab);

    const handleEditClick = (website) => {
        setSelectedWebsite(website);
        setEditedWebsite(website);
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedWebsite({ ...editedWebsite, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedWebsite({ ...editedWebsite, websiteLogo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async () => {
        if (!selectedWebsite || !selectedWebsite.id) {
            toast.error("No website selected for update!", { position: "top-right" });
            return;
        }

        try {
            await axios.put(`${API_URL}/${selectedWebsite.id}`, editedWebsite);
            toast.success("Website updated successfully!", { position: "top-right" });
            fetchWebsites();
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating website:", error.response?.data || error.message);
            toast.error("Failed to update website!", { position: "top-right" });
        }
    };

    const handleDelete = async () => {
        if (!selectedWebsite || !selectedWebsite.id) {
            toast.error("No website selected for deletion!", { position: "top-right" });
            return;
        }

        try {
            await axios.delete(`${API_URL}/${selectedWebsite.id}`);
            toast.success("Website deleted successfully!", { position: "top-right" });
            fetchWebsites();
            setShowDeleteModal(false);
            setSelectedWebsite(null);
        } catch (error) {
            console.error("Error deleting website:", error);
            toast.error("Failed to delete website!", { position: "top-right" });
        }
    };

    return (
        <div className="container-fluid mt-5 color-bg" id="users">
            <ToastContainer />

            <nav className="breadcrumb">
                <Link to="/dashboard" className="breadcrumb-item text-decoration-none">Home</Link>
                <span className="breadcrumb-item active1">Website Management</span>
            </nav>

            <div className="row align-items-center">
                <div className="col-12 col-md-6 col-sm-7">
                    <h2 className="location-title">
                        <span className="highlight">Website</span> <span className="highlighted-text">Management</span>
                    </h2>
                </div>
                <div className="col-12 col-md-6 col-sm-5 text-end">
                    <Link to="/add-website" className="btn btn-users">
                        <i className="fa fa-plus me-2"></i> Add Website
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
                            <th width="6%">Sr. No.</th>
                            <th>Website Name</th>
                            <th>Dashboard URL</th>
                            <th className="text-center">Website Logo</th>
                            <th className="text-center">Status</th>
                            <th width="10%" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWebsites.map((website, index) => (
                            <tr key={website.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{website.websiteName}</td>
                                <td>{website.dashboardURL}</td>
                                <td className="text-center">
                                    <img src={website.websiteLogo} alt="Logo" width="40" />
                                </td>
                                <td className="text-center">
                                    <span className={`px-3 py-1 rounded-pill fw-semibold ${website.status === "active" ? "bg-success bg-opacity-25 text-success" : "bg-danger bg-opacity-25 text-danger"}`} style={{ fontSize: "14px" }}>
                                        {website.status.charAt(0).toUpperCase() + website.status.slice(1)}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-purple mx-1 mt-1" onClick={() => handleEditClick(website)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-sm btn-danger mx-1 mt-1" onClick={() => { setSelectedWebsite(website); setShowDeleteModal(true); }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between" style={{ color: "#8A2BE2", backgroundColor: "rgba(138, 43, 226, 0.1)" }}
                            >
                                <h5 className="modal-title" style={{ color: "#8A2BE2" }}
                                >Edit Website</h5>
                                <button
                                    className="close bg-transparent border-0 p-0 fs-3"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Website Name:</label>
                                    <input type="text" className="form-control" name="websiteName" value={editedWebsite.websiteName} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Website URL:</label>
                                    <input type="text" className="form-control" name="dashboardURL" value={editedWebsite.dashboardURL} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label me-2">Website Logo:</label>
                                    <div className="d-flex align-items-center">
                                        <input type="file" className="form-control w-70 me-4" onChange={handleImageChange} />
                                        {editedWebsite.websiteLogo && (
                                            <img src={editedWebsite.websiteLogo} alt="Preview" width="50" height="50" className="border rounded" />
                                        )}
                                    </div>
                                </div>

                                <div className="">
                                    <label className="form-label">Status:</label>
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
                </div>
            )}
            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between p-2" style={{ color: "#8A2BE2", backgroundColor: "rgba(138, 43, 226, 0.1)" }}>
                                <h5 className="modal-title">Delete Website</h5>
                                <button className="close bg-transparent border-0 p-0 fs-3" onClick={() => setShowDeleteModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this website?</p>
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

export default ManageWebsite;
