import React from 'react'
import tuoitreLogo from '../../../assets/images/tuoitreLogo.webp';

export default function Logo() {
    return (
        <div className="app-title">
            <a href="/">
                <img src={tuoitreLogo} alt="Tuổi Trẻ Logo" className="logo" />
            </a>
            {/* <span className="title-text">TEAMWORK</span> */}
        </div>
    )
}
