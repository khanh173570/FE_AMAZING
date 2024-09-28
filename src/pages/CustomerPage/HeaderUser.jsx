import React, { Component } from "react";
import "./HeaderUser.scss";
import shop from "/assets/assetsCustomer/shop.png";
import user from "/assets/assetsCustomer/user.png";
import house from "/assets/assetsCustomer/house.png";
import pay from "/assets/assetsCustomer/pay.png";

class HeaderUser extends Component {
  render() {
    const { selectedItem, onSelectItem } = this.props;

    return (
        <div className="row payment-navigation">
          <div
            className={`col-md-3 nav-item ${selectedItem === 'cart' ? 'active' : ''}`}
            onClick={() => onSelectItem('cart')}
          >
            <img src={shop} alt="Giỏ hàng của tôi"/>
            <span>Giỏ hàng của tôi</span>
          </div>
          <div
            className={`col-md-3 nav-item ${selectedItem === 'info' ? 'active' : ''}`}
            onClick={() => onSelectItem('info')}
          >
            <img src={user} alt="Thông tin" />
            <span>Thông tin của tôi</span>
          </div>
          <div
            className={`col-md-3 nav-item ${selectedItem === 'payment' ? 'active' : ''}`}
            onClick={() => onSelectItem('payment')}
          >
            <img src={pay}  alt="Phương thức" />
            <span>Phương thức thanh toán</span>
          </div>
          <div
            className={`col-md-3 nav-item ${selectedItem === 'address' ? 'active' : ''}`}
            onClick={() => onSelectItem('acceptpayment')}
          >
            <img src={house} alt="Địa chỉ" />
            <span>Xác nhận đặt hàng</span>
          </div>

        </div>

    );
  }
}

export default HeaderUser;
