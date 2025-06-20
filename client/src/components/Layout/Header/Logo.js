import React from 'react'
import AppLogo from '../../../assets/images/tuoitreLogo.webp';

export default function Logo() {
    return (
        <div className="app-title">
            <a href="/">
                <img src={AppLogo} alt="Logo" className="logo" />
            </a>
            {/* <span className="title-text">TEAMWORK</span> */}
        </div>
    )
}
