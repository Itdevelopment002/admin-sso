import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/websites"; // Replace with your actual API endpoint

const Dashboard = () => {
    const [userRole, setUserRole] = useState(null);
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
        fetchCardData();
    }, []);

    const fetchCardData = async () => {
        try {
            const response = await axios.get(API_URL);
            setCardData(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setError("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-color-page">
            <div className="container-fluid py-4" id="dashboard">
                <nav className="breadcrumb mb-4">
                    <span className="breadcrumb-item active1">Home</span>
                </nav>

                {/* Show buttons based on role */}
                <div className="d-flex justify-content-end gap-3 mb-4 flex-wrap">
                    {userRole === "SuperAdmin" && (
                        <>
                            <Link to="/users" className="btn btn-manage">
                                <i className="fa fa-user-gear me-2"></i>
                                Manage Users
                            </Link>
                            <Link to="/manage-website" className="btn btn-users">
                                <i className="fa fa-plus me-2"></i>
                                Manage Website
                            </Link>
                        </>
                    )}
                    {userRole === "Admin" && (
                        <Link to="/users" className="btn btn-manage">
                            <i className="fa fa-user-gear me-2"></i>
                            Manage Users
                        </Link>
                    )}
                </div>

                {/* Display loading or error message */}
                {loading && <p className="text-center">Loading dashboard...</p>}
                {error && <p className="text-center text-danger">{error}</p>}

                {/* Dashboard Cards */}
                {!loading && !error && (
                    <div className="row mt-5">
                        {cardData.map((card, index) => (
                            <div key={index} className="col-md-3 mb-5">
                                <div className="color-bg p-3 border-0 overflow-hidden transition-transform transform hover:scale-105">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <div className="bg1-light p-3 rounded-circle">
                                                <img
                                                    src={card.websiteLogo}
                                                    alt={card.websiteName}
                                                    className="img-fluid"
                                                    style={{ width: "60px", height: "60px" }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold text-uppercase mt-3 text-center">{card.websiteName}</h6>
                                        </div>
                                        <a
                                            href={card.dashboardURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 w-100 d-flex fw-bold align-items-center justify-content-center gap-2 text-decoration-none website-link"
                                        >
                                            Go to Dashboard
                                            <i className="fas fa-arrow-right i-move"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
