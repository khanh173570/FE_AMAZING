// Header.jsx
import React from 'react';
import './HeaderStaff.css'; // Nhớ tạo file header.css để định dạng
import companyLogo from "/assets/assetsCustomer/company_logo.png";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeaderStaff = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = () => {
        localStorage.removeItem("account");
        toast.success("Logged out successfully");
        navigate("/login");
      };

    return (
        <div>
        <header className="header">
           <img src={companyLogo} alt="Logo Công ty" className="header-logo" />
            <nav className="nav">
            <ul>
                    <li>Trang chủ </li>
                    <li>Đăng sản phẩm</li>
                    <li>Quản lý</li>
                    <li>Giới thiệu</li>
                    <li>Liên hệ</li>
                    <li className="icon">🔍</li> {/* Icon tìm kiếm */}
                    <li className="icon" onClick={handleLogout}>👤</li> {/* Icon người dùng */}
                    <li className="icon">⚙️</li> {/* Icon cài đặt */}
                </ul>
            </nav>
        </header>
        </div>
    );
};

export default HeaderStaff;
