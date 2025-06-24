import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import '../../../assets/css/header.css';

export default function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('user'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <header className="app-header">
            <Logo/>
            <Navbar/>
            <div className="profile-section" style={{ cursor: 'pointer' }}>
                <i className="fa fa-user-circle"></i>
                {isLoggedIn ? (
                    <div onClick={handleProfileClick}>
                        <UserProfile />
                    </div>
                ) : (
                    <a onClick={handleLoginClick} style={{ marginLeft: '8px', textDecoration: 'underline', color: 'blue' }}>
                        Đăng nhập
                    </a>
                )}
            </div>
        </header>
    );
}
