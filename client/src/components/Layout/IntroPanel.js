import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/intropanel.css';

function IntroPanel() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="intro-panel">
      <div className="intro-panel__content">
        <h1 className="intro-panel__title">
          Chào mừng đến với <span className="highlight">Todo App</span>
        </h1>
        <p className="intro-panel__subtitle">
          Quản lý công việc của bạn một cách dễ dàng, hiệu quả và phong cách.
          Bắt đầu ngay để tổ chức cuộc sống của bạn!
        </p>
        <div className="intro-panel__cta">
          <button className="btn btn--primary" onClick={handleLoginClick}>
            Đăng nhập
          </button>
          <button className="btn btn--secondary" onClick={handleRegisterClick}>
            Đăng ký miễn phí
          </button>
        </div>
        <div className="intro-panel__features">
          <div className="feature-item">
            <span className="feature-icon">📋</span>
            <p>Tạo và quản lý danh sách công việc dễ dàng</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⏰</span>
            <p>Theo dõi thời hạn và ưu tiên công việc</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <p>Đồng bộ hóa trên mọi thiết bị</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroPanel;