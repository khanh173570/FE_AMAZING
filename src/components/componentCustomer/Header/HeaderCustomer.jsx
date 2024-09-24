// Header.jsx
import React from 'react';
import './HeaderCustomer.css'; // Nhớ tạo file header.css để định dạng
import companyLogo from "/assets/assetsCustomer/company_logo.png";
import { UserOutlined } from '@ant-design/icons';
const HeaderCustomer = () => {
    return (
        <div>
        <header className="header">
           <img src={companyLogo} alt="Logo Công ty" className="header-logo" />
            <nav className="nav">
            <ul>
                    <li>Trang chủ </li>
                    <li>Sản phẩm</li>
                    <li>Giới thiệu</li>
                    <li>Tin tức</li>
                    <li>Liên hệ</li>
                </ul>
            </nav>
            <UserOutlined className="user-icon" /> {/* Thêm icon con người */}
        </header>
        </div>
    );
};

export default HeaderCustomer;
