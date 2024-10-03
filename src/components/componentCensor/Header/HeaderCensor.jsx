// Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderCensor.css'; // Nhớ tạo file header.css để định dạng
import companyLogo from "/assets/assetsCustomer/company_logo.png";
import Swal from "sweetalert2";

const HeaderCensor = () => {
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
                        <li>Đăng sản phẩm</li>A
                        <li>Chỉnh sửa</li>
                        <li>Giới thiệu</li>
                        <li>Liên hệ</li>
                        <li className="icon">🔍</li> {/* Icon tìm kiếm */}
                        <li className="icon" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            👤 {/* Icon người dùng */}
                        </li>
                        <li className="icon">⚙️</li> {/* Icon cài đặt */}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderCensor;
