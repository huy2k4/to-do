import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li><Link to="/" className="nav-item">Todolist</Link></li>
                {/* <li><Link to="/stats" className="nav-item">Thống kê</Link></li>
                <li><Link to="/team" className="nav-item">Đội nhóm</Link></li> */}
            </ul>
        </nav>
    )
}
