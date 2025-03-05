import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import image1 from "../../assets/icons/crs-logo.png"
import image2 from "../../assets/icons/wedding.png"
import image3 from "../../assets/icons/umc.png"

import { Link } from "react-router-dom";

const cardData = [
    { title: "Birth & Death Registration", image: image1 },
    { title: "Marriage Registration Portal", image: image2 },
    { title: "UlhasNagar Municipal Corporation", image: image3 },
    { title: "Revenue", image: image2 },
    { title: "Subscribers", image: image2 },
    { title: "Deliveries", image: image2 },
    { title: "Refunds", image: image2 },
    { title: "Profits", image: image2 },
    { title: "Visitors", image: image2 },
    { title: "New Orders", image: image2 },
    { title: "Pending Payments", image: image2 },
    { title: "Total Expenses", image: image2 },
];

const Dashboard = () => {
    return (
        <div className="bg-color-page">
            <div className="container-fluid py-4" id="dashboard">

                <nav className="breadcrumb mb-4">
                    <span className="breadcrumb-item active1">Home</span>
                </nav>

                <div className="d-flex justify-content-end gap-3 mb-4 flex-wrap">
                    <Link to="/users" className="btn btn-manage">
                        <i className="fa fa-user-gear me-2"></i>
                        Manage Users
                    </Link>
                    <Link to="/manage-website" className="btn btn-users">
                        <i className="fa fa-plus me-2"></i>
                        Manage Website
                    </Link>
                </div>



                <div className="row mt-5">
                    {cardData.map((card, index) => (
                        <div key={index} className="col-md-3 mb-5">
                            <div className="color-bg p-3 border-0 overflow-hidden transition-transform transform hover:scale-105">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div className="bg1-light p-3 rounded-circle">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="img-fluid"
                                                style={{ width: "60px", height: "60px" }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold text-uppercase mt-3 text-center">{card.title}</h6>
                                    </div>
                                    <a
                                        href="https://www.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 w-100 d-flex fw-bold align-items-center justify-content-center gap-2 text-decoration-none"
                                    >
                                        Go to Site
                                        <i className="fas fa-arrow-right i-move"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;