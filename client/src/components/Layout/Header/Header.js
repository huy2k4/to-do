import React from 'react';
import Logo from './Logo';
import Navbar from './Navbar';
// import UserProfile from './UserProfile'
import '../../../assets/css/header.css'
export default function Header() {
    return (
        <header className="app-header">
            <Logo/>
            <Navbar/>
        </header>
    );
}
