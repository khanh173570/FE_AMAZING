// Header.jsx
import React from 'react';
import './HeaderDistributor.css'; // Nhớ tạo file header.css để định dạng
import companyLogo from "/assets/assetsCustomer/company_logo.png";

const HeaderDistributor = () => {
    return (
        <div>
        <header className="header">
           <img src={companyLogo} alt="Logo Công ty" className="header-logo" />
            <nav className="nav">
            <ul>
                    <li>Trang chủ </li>
                    <li>Đăng sản phẩm</li>
                    <li>Quản lý</li>
                    <li>Tin tức</li>
                    <li>Liên hệ</li>
                    <li className="icon">🔍</li> {/* Icon tìm kiếm */}
                    <li className="icon">👤</li> {/* Icon người dùng */}
                    <li className="icon">⚙️</li> {/* Icon cài đặt */}
                </ul>
            </nav>
        </header>
        </div>
    );
};

export default HeaderDistributor;
