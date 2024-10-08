import React from 'react';
import './FooterCustomer.css';
import footerGPKD from "/assets/assetsCustomer/footer-gpkd.png";
const FooterCustomer = () => {
    return (
        <footer className="footer">
             <div className="footer-top">
                <span className="company-name">CÔNG TY CỔ PHẦN MỸ NGHỆ AMAZING </span>
                </div>
            <div className="footer-section">
                <div className="footer-contact">
                <p className="company-license">GPKD số 0317404604 cấp ngày 27/07/2022 tại Sở kế hoạch và Đầu tư TP.HCM</p>
                <img src={footerGPKD} alt="Đạt chuẩn" className="footer-gpkd" />
                </div>
                <div className="footer-services">
                    <h4>Dịch vụ</h4>
                    <ul>
                    <li><a href="#">Hỗ trợ khách hàng</a></li>
                        <li><a href="#">Hướng dẫn mua hàng</a></li>
                        <li><a href="#">Điều khoản dịch vụ</a></li>
                        <li><a href="#">Gửi góp ý, khiếu nại</a></li>
                        <li><a href="#">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>
                <div className="footer-about">
                    <h4>Về chúng tôi</h4>
                    <ul>
                    <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Sản phẩm</a></li>
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="#">Tin tức</a></li>
                        <li><a href="#">Liên hệ</a></li>
                    </ul>
                    
                </div>
                <div className="footer-policy">
                    <h4>Chính sách</h4>
                    <ul>
                    <li><a href="#">Chính sách mua hàng</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Chính sách bảo hành</a></li>
                        <li><a href="#">Chính sách vận chuyển</a></li>
                        <li><a href="#">Chính sách thanh toán</a></li>
                    </ul>
                </div>
            </div>
            <span className="footer-bottom">@Không gian đồ mỹ nghệ | Cung cấp bởi Amazing</span>
        </footer>
    );
}

export default FooterCustomer;
