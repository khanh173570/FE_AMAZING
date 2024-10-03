// HeaderDistributor.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderDistributor.css'; // Nhớ tạo file header.css để định dạng
import companyLogo from "/assets/assetsCustomer/company_logo.png";
import Swal from "sweetalert2";
import { FaSignOutAlt } from 'react-icons/fa'; // Import logout icon from react-icons
import { Popconfirm } from 'antd'; // Import Popconfirm from Ant Design

const HeaderDistributor = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("account");
        Swal.fire({
          title: "Logged out!",
          text: "You have successfully logged out.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
    };

    return (
        <div>
            <header className="header">
                <img src={companyLogo} alt="Logo Công ty" className="header-logo" />
                <nav className="nav">
                    <ul>
                        <li>Trang chủ</li>
                        <li>Đăng sản phẩm</li>
                        <li>Quản lý</li>
                        <li>Tin tức</li>
                        <li>Liên hệ</li>
                        <li className="icon">🔍</li> {/* Icon tìm kiếm */}
                        <li className="icon" style={{ cursor: 'pointer' }}>
                            <Popconfirm
                                title="Are you sure you want to log out?"
                                onConfirm={handleLogout}  // Call handleLogout on confirmation
                                okText="Yes"
                                cancelText="No"
                            >
                                <FaSignOutAlt /> {/* Logout icon */}
                            </Popconfirm>
                        </li>
                        <li className="icon">⚙️</li> {/* Icon cài đặt */}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderDistributor;
