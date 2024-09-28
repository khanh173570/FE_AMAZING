import React from 'react';
import "./MiniShoppingCart.scss";
import phat from "/assets/assetsCustomer/phat.jpg";

const MiniShoppingCart = () => {
  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <span className="shopping-cart-icon">🛒</span>
        <h2>Giỏ Hàng</h2>
      </div>
      <div className="cart-items">
        <div className="cart-item">
          <img src={phat} alt="Đồ cổ" className="item-image" />
          <div className="item-details">
            <h3>Đồ cổ</h3>
            <p className="price">3.200.000</p>
          </div>
          <button className="buy-button">Mua ngay</button>
        </div>
        <div className="cart-item">
          <img src={phat} alt="Bàn Sallem" className="item-image" />
          <div className="item-details">
            <h3>Bàn Sallem</h3>
            <p className="price">1.300.000</p>
          </div>
          <button className="buy-button">Mua ngay</button>
        </div>
      </div>
      <div className="cart-footer">
        <button className="add-note-button">
          {/* Thay thế SVG bằng văn bản hoặc hình ảnh */}
          <span className="plus-icon">➕</span>
          Thêm ghi chú
        </button>
        <button className="view-details-button">Xem chi tiết giỏ hàng</button>
      </div>
      <button className="checkout-button">Thanh toán Đơn hàng</button>
    </div>
  );
};

export default MiniShoppingCart;
