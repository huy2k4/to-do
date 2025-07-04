import React,{ useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
// import Navbar from './Navbar';
import UserProfile from './UserProfile';
import '../../../assets/css/header.css';

export default function Header() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="menu-toggle" onClick={toggleNav}>
                <i className="fa fa-bars"></i>
            </div>
            <Logo />
            {/* <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} /> */}
            <UserProfile
                currentUser={currentUser}
                handleProfileClick={handleProfileClick}
                handleLoginClick={handleLoginClick}
            />
        </header>
    );
}