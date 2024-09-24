import React from 'react';
import './FooterCustomer.css';
import companyLogo from "/assets/assetsCustomer/company_logo.png";
import footerGPKD from "/assets/assetsCustomer/footer-gpkd.png";
import footerBoCongThuong from "/assets/assetsCustomer/footer-bocongthuong.png";
import footerPay from "/assets/assetsCustomer/footer-pay.png";
const FooterCustomer = () => {
    return (
        <footer className="footer">
             <div className="footer-top">
                <img src={companyLogo} alt="Logo Công ty" className="company-logo" />
                <span className="company-name">CÔNG TY CỔ PHẦN MỸ NGHỆ AMAZING </span>
                
                </div>
            <div className="footer-section">
                <div className="footer-contact">
                <p className="company-license">GPKD số 0317404604 cấp ngày 27/07/2022 tại Sở kế hoạch và Đầu tư TP.HCM</p>
                <img src={footerGPKD} alt="Đạt chuẩn" className="footer-gpkd" />
                    <p><i className="icon icon-home"></i>40 Trường Sa, Quận 3, Thành Phố HCM</p>
                    <p><i className="icon icon-phone"></i> +84 983260509 (Ms.Hoa)</p>
                    <p><i className="icon icon-email"></i> domynghe@gmail.com</p>
                <img src={footerBoCongThuong} alt="Đạt chuẩn Bộ Công Thương" className="footer-bocongthuong" />   
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
                       
                    <h4>Phương thức thanh toán</h4>
                    <img src={footerPay} alt="Phương thức thanh toán" className="footer-pay" /> 
                    </ul>
                </div>
            </div>
            <span className="footer-bottom">@Không gian đồ mỹ nghệ | Cung cấp bởi Amazing</span>
        </footer>
    );
}

export default FooterCustomer;
