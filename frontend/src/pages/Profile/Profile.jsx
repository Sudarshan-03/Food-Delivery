
import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { url, token, user, setToken, setUser } = useContext(StoreContext);
    const navigate = useNavigate();

    console.log("Profile Render:", { user, token });

    const [isEditing, setIsEditing] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        address: "",
        age: "",
        phone: ""
    });

    useEffect(() => {
        if (user) {
            setInputs({
                name: user.name || "",
                email: user.email || "",
                address: user.address || "",
                age: user.age || "",
                phone: user.phone || ""
            });
        }
    }, [user]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        navigate('/');
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            setInputs({
                name: user.name || "",
                email: user.email || "",
                address: user.address || "",
                age: user.age || "",
                phone: user.phone || ""
            });
        }
    }

    const handleSave = async () => {
        if (!user) {
            alert("User data not loaded. Please refresh.");
            return;
        }
        try {
            const response = await axios.put(url + "/api/user/update", {
                userId: user._id,
                ...inputs
            }, { headers: { token } });

            if (response.data.success) {
                setUser(response.data.user);
                setIsEditing(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error updating profile");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    }

    if (!token) {
        // Optional: Redirect if no token, though Navbar handles this mostly.
        return null;
    }


    return (
        <div className='profile'>
            <div className="profile-header">
                <h1>My Profile</h1>
            </div>

            <div className="profile-container">
                <div className="profile-details-card">
                    <div className="profile-image-container">
                        <img src={assets.profile_icon} alt="Profile" />
                    </div>
                    <div className="profile-info">
                        {isEditing ? (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" value={inputs.name} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={inputs.email} disabled className="disabled-input" title="Email cannot be changed" />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" name="address" value={inputs.address} onChange={handleChange} />
                                </div>
                                <div className="form-group-row">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input type="number" name="age" value={inputs.age} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" name="phone" value={inputs.phone} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="edit-actions">
                                    <button onClick={handleSave} className="save-btn">Save</button>
                                    <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2>{user ? user.name : "User"}</h2>
                                <p>{user ? user.email : "Email not available"}</p>
                                <div className="user-meta">
                                    {user?.address && <p><strong>Address:</strong> {user.address}</p>}
                                    {user?.age && <p><strong>Age:</strong> {user.age}</p>}
                                    {user?.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                                </div>
                                <div className="profile-actions">
                                    {user && <button onClick={handleEdit} className="action-btn">Edit Profile</button>}
                                    <button onClick={() => navigate('/myorders')} className="action-btn">My Orders</button>
                                    <button onClick={logout} className="action-btn logout-btn">Log Out</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
