import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/statsnav.css';

export default function StatsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.includes('statistics') ? 'statistics' : 'overview';

  return (
    <div>
      <div className="stat-nav">
        <button
          className={`stat-tab ${active === 'overview' ? 'active' : ''}`}
          onClick={() => navigate('/stats/overview')}
        >
          Tổng quát
        </button>
        <button
          className={`stat-tab ${active === 'statistics' ? 'active' : ''}`}
          onClick={() => navigate('/stats/statistics')}
        >
          Thống kê
        </button>
      </div>

      {/* Nội dung sẽ được render ở đây tùy theo route con */}
      <Outlet />
    </div>
  );
}
