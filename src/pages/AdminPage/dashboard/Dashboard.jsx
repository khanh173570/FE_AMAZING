import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const data = {
    totalUsers: 120,
    activeUsers: 95,
    totalRevenue: 5000, // Dạng số
    monthlyGrowth: 5,    // Dạng số
  };

  const userChartData = [
    { name: 'Người Dùng', totalUsers: data.totalUsers, activeUsers: data.activeUsers }
  ];

  const revenueGrowthChartData = [
    { name: 'Doanh Thu', totalRevenue: data.totalRevenue },
    { name: 'Tăng Trưởng', monthlyGrowth: data.monthlyGrowth }
  ];

  return (
    <div className="dashboard-container">
      <h2 style={{ textAlign: 'center', color: '#595959' }}>Tổng Quan Dashboard</h2>
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
          <p>${data.totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Tăng Trưởng Hàng Tháng</h3>
          <p>{data.monthlyGrowth}%</p>
        </div>
      </div>

      {/* Biểu đồ người dùng */}
      <div className="chart">
        <h3>Biểu đồ Người Dùng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalUsers" fill="#8884d8" />
            <Bar dataKey="activeUsers" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ doanh thu và tăng trưởng */}
      <div className="chart">
        <h3>Biểu đồ Doanh Thu và Tăng Trưởng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueGrowthChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#ffc658" />
            <Bar dataKey="monthlyGrowth" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
