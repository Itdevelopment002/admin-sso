import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";

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

const cardData = [
    { title: "Birth & Death Registration", image: image1, link: "https://dc.crsorgi.gov.in" },
    { title: "Online Marriage Application", image: image2, link: "https://marriage.rtsumc.com" },
    { title: "Online Pandal Permission", image: image3, link: "https://smartumc.com" },
    { title: "e-Tender", image: image4, link: "https://mahatenders.gov.in" },
    { title: "Fire NOC", image: image5, link: "https://fire.rtsumc.com/admin/login" },
    { title: "Library Management System", image: image6, link: "https://umclibrary.com" },
    { title: "Service Book", image: image7, link: "https://servicebook.smartumc.com" },
    { title: "Aaple Sarkar / PG Portal", image: image8, link: "https://aaplesarkar.mahaonline.gov.in/en" },
    { title: "Property Tax", image: image9, link: "https://www.umconlineservices.in/payment" },
    { title: "BPMS", image: image10, link: "https://mahavastu.maharashtra.gov.in" },
    { title: "E-office", image: image11, link: "https://mahaeoffice.maharshtra.gov.in" },
    { title: "AttDuty", image: image12, link: "https://umc.attduty.com" },
    { title: "Biometric Attendance System", image: image13, link: "http://117.247.85.16:90/iclock/Main.aspx" },
    { title: "Water Billing", image: image14, link: "https://www.water.umcgov.in" },
    { title: "Legal Application", image: image15, link: "https://app.zelican.com" },
    { title: "UMC Website", image: image16, link: "https://www.umc.gov.in" },
    { title: "Divyang Kalyankari Yojna", image: image17, link: "https://umc.divyangyojana.com" },
    { title: "Town Planning – Permission", image: image18, link: "#" },
    { title: "Tree Census", image: image19, link: "#" },
    { title: "Property Tax Survey New", image: image20, link: "https://www.umconlineservices.in/Payment/" },
    { title: "Nagrik Suvidha", image: image21, link: "#" },
    { title: "Election", image: image22, link: "#" },
    { title: "BCR", image: image23, link: "http://ulbbudget.com/LoginForm.aspx" }
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
                                        href={card.link}
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
            </div>
        </div>
    );
};

export default Dashboard;
