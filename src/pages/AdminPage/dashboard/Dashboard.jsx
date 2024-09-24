
import React from 'react';

const Dashboard = () => {
  const data = {
    totalUsers: 120,
    activeUsers: 95,
    totalRevenue: "$10,000",
    monthlyGrowth: "5%",
  };

  return (
    <div>
      <h2>Tổng Quan Dashboard</h2>
      <div className="overview-cards">
        <div className="card">
          <h3>Tổng Số Người Dùng</h3>
          <p>{data.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Số Người Dùng Hoạt Động</h3>
          <p>{data.activeUsers}</p>
        </div>
        <div className="card">
          <h3>Tổng Doanh Thu</h3>
          <p>{data.totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Tăng Trưởng Hàng Tháng</h3>
          <p>{data.monthlyGrowth}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;