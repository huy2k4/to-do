import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { clearTags } from '../../../redux/slices/tagSlice';
import { clearTasks } from '../../../redux/slices/taskSlice';
import '../../../assets/css/userprofile.css';

export default function UserProfile({ currentUser, handleProfileClick, handleLoginClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    dispatch(clearTags());
    dispatch(clearTasks());
    navigate('/login');
  };

  return (
    <div className="profile-section" style={{ cursor: 'pointer' }}>
      <i className="fa fa-user-circle"></i>
      {currentUser ? (
        <div onClick={handleProfileClick}>
          <div className="user-profile">
            <span className="username">Xin chào, {currentUser.username || 'Người dùng'}</span>
            
            <button className="logout-btn" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        <a
          onClick={handleLoginClick}
          style={{ marginLeft: '8px', textDecoration: 'underline', color: 'blue' }}
        >
          Đăng nhập
        </a>
      )}
    </div>
  );
}