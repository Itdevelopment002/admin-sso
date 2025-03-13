import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AddWebsite.css";

const AddWebsite = () => {
    const [formData, setFormData] = useState({
        websiteName: "",
        websiteLogo: "",
        websiteURL: "",
        status: "active",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newWebsite = {
            id: String(Date.now()), // Convert ID to string
            websiteName: formData.websiteName,
            websiteLogo: formData.websiteLogo.name, 
            websiteURL: formData.websiteURL,
            status: formData.status,
        };
    
        try {
            const response = await axios.post("http://localhost:5000/websites", newWebsite);
            console.log("Data Added Successfully:", response.data);
            alert("Website added successfully!");
            setFormData({ websiteName: "", websiteLogo: "", websiteURL: "", status: "active" });
        } catch (error) {
            console.error("Error adding website:", error);
            alert("Failed to add website!");
        }
    };
    

    return (
        <div className="container-fluid mt-5 color-bg" id="manage-website">
            <nav className="breadcrumb">
                <Link to="/dashboard" className="breadcrumb-item text-decoration-none">Home</Link>
                <Link to="/manage-website" className="breadcrumb-item text-decoration-none">Website Management</Link>
                <span className="breadcrumb-item active1">Add Website</span>
            </nav>

            <div className="row align-items-center">
                <div className="col-12">
                    <h2 className="location-title">
                        <span className="highlight">Add</span> <span className="highlighted-text">Website</span>
                    </h2>
                </div>
            </div>

            <div className="container-fluid p-4 shadow-lg" id="website-form">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4 mt-1">
                        <div className="col-md-6">
                            <label htmlFor="websiteName" className="form-label fw-semibold">Website Name</label>
                            <input type="text" className="form-control" placeholder="Enter website name" id="websiteName" name="websiteName" value={formData.websiteName} onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="websiteLogo" className="form-label fw-bold">Website Logo</label>
                            <input type="file" className="form-control" id="websiteLogo" name="websiteLogo" onChange={(e) => setFormData({ ...formData, websiteLogo: e.target.files[0] })} required />
                        </div>
                    </div>

                    <div className="row g-4 mt-1">
                        <div className="col-md-6">
                            <label htmlFor="websiteURL" className="form-label fw-bold">Website URL</label>
                            <input type="url" className="form-control" placeholder="Enter website URL" id="websiteURL" name="websiteURL" value={formData.websiteURL} onChange={(e) => setFormData({ ...formData, websiteURL: e.target.value })} required />
                        </div>
                        <div className="col-md-6">
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

export default AddWebsite;
