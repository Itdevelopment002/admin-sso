import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddWebsite.css"

const AddWebsite = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        websiteName: '',
        websiteLogo: null,
        dashboardURL: '',
        status: 'active',
    });
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({
        websiteName: '',
        websiteLogo: '',
        dashboardURL: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, websiteLogo: file });
            setPreview(URL.createObjectURL(file));
            setErrors({ ...errors, websiteLogo: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = { websiteName: '', websiteLogo: '', dashboardURL: '' };

        if (!formData.websiteName.trim()) {
            newErrors.websiteName = 'Website name is required';
            isValid = false;
        }
        if (!formData.websiteLogo) {
            newErrors.websiteLogo = 'Website logo is required';
            isValid = false;
        }
        if (!formData.dashboardURL.trim()) {
            newErrors.dashboardURL = 'Dashboard URL is required';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;

            const newWebsite = {
                id: String(Date.now()),
                websiteName: formData.websiteName,
                websiteLogo: base64Image,
                dashboardURL: formData.dashboardURL,
                status: formData.status,
            };

            try {
                await axios.post('http://localhost:5000/websites', newWebsite);
                toast.success('Website added successfully!', { position: "top-right", autoClose: 3000 });

                setFormData({ websiteName: '', websiteLogo: null, dashboardURL: '', status: 'active' });
                setPreview(null);

                setTimeout(() => navigate('/manage-website'), 1000);
            } catch (error) {
                console.error('Error adding website:', error);
                toast.error('Failed to add website!', { position: "top-right", autoClose: 3000 });
            }
        };

        reader.readAsDataURL(formData.websiteLogo);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    return (
        <div className="container-fluid mt-5 color-bg">
            <ToastContainer />

            <h2 className="location-title">
                <span className="highlight">Add</span> <span className="highlighted-text">Website</span>
            </h2>

            <div className="container-fluid p-4 shadow-lg" id='website-form'>
                <form onSubmit={handleSubmit}>
                    <div className="row g-4 mt-1">

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Website Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter website name"
                                name="websiteName"
                                value={formData.websiteName}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.websiteName && <div className="text-danger">{errors.websiteName}</div>}
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <div style={{ flex: 1 }}>
                                <label className="form-label fw-bold">Website Logo</label>
                                <input type="file" className="form-control" onChange={handleImageChange} required />
                                {errors.websiteLogo && <div className="text-danger">{errors.websiteLogo}</div>}
                            </div>
                            {preview && (
                                <img src={preview} alt="Preview" width="50" className="ms-3 mt-2" />
                            )}
                        </div>
                    </div>

                    <div className="row g-4 mt-1">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Dashboard URL</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter website URL"
                                name="dashboardURL"
                                value={formData.dashboardURL}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.dashboardURL && <div className="text-danger">{errors.dashboardURL}</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Status</label>
                            <div className="d-flex gap-4 mt-1">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="active"
                                        name="status"
                                        value="active"
                                        checked={formData.status === 'active'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    />
                                    <label htmlFor="active">Active</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="deactive"
                                        name="status"
                                        value="deactive"
                                        checked={formData.status === 'deactive'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    />
                                    <label htmlFor="deactive">Deactive</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="btn btn-success btn-md px-5">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddWebsite;