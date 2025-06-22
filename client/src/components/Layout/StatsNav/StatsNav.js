import React, { useState } from 'react';
import '../../assets/css/statnav.css';

export default function StatsNav({ onChange }) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onChange?.(tab); // Gửi event ra ngoài nếu cần
  };

  return (
    <div className="stat-nav">
      <button
        className={`stat-tab ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => handleTabClick('overview')}
      >
        Tổng quát
      </button>
      <button
        className={`stat-tab ${activeTab === 'statistics' ? 'active' : ''}`}
        onClick={() => handleTabClick('statistics')}
      >
        Thống kê
      </button>
    </div>
  );
}
