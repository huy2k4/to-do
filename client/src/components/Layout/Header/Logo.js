import React from 'react'
import AppLogo from '../../../assets/images/tuoitreLogo.webp';
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <div className="app-title">
            <Link to="/" className="nav-item">
                <img src={AppLogo} alt="Logo" className="logo" />
            </Link>
            {/* <span className="title-text">TEAMWORK</span> */}
        </div>
    )
}
