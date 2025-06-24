import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/userprofile.css';

export default function UserProfile() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user')) || {};

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="user-profile">
            <span className="username">Xin chào, {user.username || 'Người dùng'}</span>
            <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
}
