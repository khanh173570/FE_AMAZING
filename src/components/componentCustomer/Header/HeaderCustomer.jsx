
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderCustomer.css';
import companyLogo from "/assets/assetsCustomer/company_logo.png";
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const HeaderCustomer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('account');
        setIsLoggedIn(!!user); // Check if user is logged in
        console.log('User logged in status:', !!user); // Debug: log the login status
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn đăng xuất?',
            text: "Hành động này sẽ kết thúc phiên đăng nhập của bạn.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("account");
                Swal.fire({
                    title: "Đã đăng xuất!",
                    text: "Bạn đã đăng xuất thành công.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setIsLoggedIn(false); // Update logged-in state
                    console.log('User logged out, status:', false); // Debug: log logout status
                    navigate("/");
                });
            }
        });
    };

    const handleCartClick = () => {
        const user = localStorage.getItem('account');
        if (!user) {
            // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
            Swal.fire({
                title: 'Bạn cần đăng nhập để xem giỏ hàng.',
                text: "Vui lòng đăng nhập để tiếp tục.",
                icon: 'info',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate("/login"); // Điều hướng đến trang đăng nhập
            });
        } else {
            // Nếu người dùng đã đăng nhập, điều hướng đến trang giỏ hàng
            navigate("/addToCart");
        }
    };

    return (
        <div>
            <header className="header">
                <img src={companyLogo} alt="Logo Công ty" className="header-logo" />
                <nav className="nav">
                    <ul>
                        <div><Link to="/">Trang chủ</Link></div>
                        <div><Link to="/products">Sản phẩm</Link></div>
                        <div><Link to="/about">Giới thiệu</Link></div>
                        <div><Link to="/news">Tin tức</Link></div>
                        <div><Link to="/contact">Liên hệ</Link></div>
                    </ul>
                </nav>
                <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
                    <ShoppingCartOutlined className="cart-icon" />
                </div>
                <div className="user-icon" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <UserOutlined />
                </div>
            </header>
        </div>
    );
};

export default HeaderCustomer;


