import React from 'react';
import './FooterDistributor.css';
import footerGPKD from "/assets/assetsCustomer/footer-gpkd.png";

const FooterDistributor = () => {
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
                        <li>Hỗ trợ khách hàng</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Điều khoản dịch vụ</li>
                        <li>Gửi góp ý, khiếu nại</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>
                <div className="footer-about">
                    <h4>Về chúng tôi</h4>
                    <ul>
                        <li>Trang chủ</li>
                        <li>Sản phẩm</li>
                        <li>Giới thiệu</li>
                        <li>Tin tức</li>
                        <li>Liên hệ</li>
                    </ul>
                    
                </div>
                <div className="footer-policy">
                    <h4>Chính sách</h4>
                    <ul>
                        <li>Chính sách mua hàng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách vận chuyển</li>
                        <li>Chính sách thanh toán</li>
                        <li> </li>
                    </ul>
                </div>
            </div>
            <span className="footer-bottom">@Không gian đồ mỹ nghệ | Cung cấp bởi Amazing</span>
        </footer>
    );
}

export default FooterDistributor;
