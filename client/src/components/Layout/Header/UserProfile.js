import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { clearTags } from '../../../redux/slices/tagSlice';
import { clearTasks } from '../../../redux/slices/taskSlice';

import '../../../assets/css/userprofile.css';

export default function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        dispatch(clearTags());
        dispatch(clearTasks());
        navigate('/login');
    };

    return (
        <div className="user-profile">
            <span className="username">Xin chào, {user?.username || 'Người dùng'}</span>
            <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
}
