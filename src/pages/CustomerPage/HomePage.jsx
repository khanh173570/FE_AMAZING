
import React, { Component } from "react";
import HeaderUser from "./HeaderUser";
import "./HomePage.scss";
import phat from "/assets/assetsCustomer/phat.jpg";
import ttknh from "/assets/assetsCustomer/ttknh.png";
import vi from "/assets/assetsCustomer/vi.png";
import tg from "/assets/assetsCustomer/tg.png";
import vidt from "/assets/assetsCustomer/vidt.png";
import { DatePicker } from 'antd';

const cartItems = [
  { id: 1, name: 'Tượng phật', price: 3200000, originalPrice: 3900000, color: 'Xám', image: '/api/placeholder/100/100' },
  { id: 2, name: 'Tượng phật', price: 1300000, color: 'Nâu', image: '/api/placeholder/100/100' },
];


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'cart', // Default to 'cart'
      userProfileForm: {
        name: 'Lê Văn Trung',
        gender: 'Nam',
        sdt: '0947225188',
        email: 'House@gmail.com',
        birthDate: null
      }
    };
  }


  handleUserProfileInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userProfileForm: {
        ...prevState.userProfileForm,
        [name]: value
      }
    }));
  };

  handleUserProfileDateChange = (date) => {
    this.setState(prevState => ({
      userProfileForm: {
        ...prevState.userProfileForm,
        birthDate: date
      }
    }));
  };

  handleUserProfileSubmit = (e) => {
    e.preventDefault();
    console.log('User Profile Form submitted:', {
      ...this.state.userProfileForm,
      birthDate: this.state.userProfileForm.birthDate ? this.state.userProfileForm.birthDate.format('YYYY-MM-DD') : null
    });
  };

  handleSelectItem = (item) => {
    this.setState({ selectedItem: item });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);
    console.log("Form Values: ", values);
  };

  renderContent = () => {
    const { selectedItem, userProfileForm } = this.state;

    switch (selectedItem) {
      case 'cart':
        // return (
        //   <div className="shopping-cart container">
        //     <h4>Giỏ hàng ({cartItems.length})</h4>

        //     <div className="row">
        //       {cartItems.slice(0, Math.ceil(cartItems.length / 2)).map(item => (
        //         <div key={item.id} className="col-md-4 cart-item">
        //           <div className="card mb-3">
        //             <div className="col-md-4">
        //               <img src={phat} alt={item.name} className="img-fluid rounded-start" />
        //             </div>
        //             <div className="col-md-4 d-flex flex-column">
        //               <div className="card-body">
        //                 <h5 className="card-title">{item.name}</h5>
        //                 <p className="card-text">Màu sắc: {item.color}</p>
        //                 <input type="number" min="1" defaultValue="1" className="form-control quantity-input mt-2" />
        //                 <div className="price-column mt-2">
        //                   <span className="current-price">{item.price.toLocaleString()} đ</span>
        //                   {item.originalPrice && (
        //                     <span className="original-price">{item.originalPrice.toLocaleString()} đ</span>
        //                   )}
        //                 </div>
        //               </div>
        //             </div>
        //             <div className="col-md-4 d-flex align-items-end">
        //               <div className="action-column">
        //                 <button className="btn btn-danger me-2">Xóa</button>
        //                 <button className="btn btn-info">Xem chi tiết</button>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       ))}
        //     </div>

        //     <div className="row mt-3">
        //       {cartItems.slice(Math.ceil(cartItems.length / 2)).map(item => (
        //         <div key={item.id} className="col-md-4 cart-item">
        //           <div className="card mb-3">
        //             <div className="col-md-4">
        //               <img src={phat} alt={item.name} className="img-fluid rounded-start" />
        //             </div>
        //             <div className="col-md-4 d-flex flex-column">
        //               <div className="card-body">
        //                 <h5 className="card-title">{item.name}</h5>
        //                 <p className="card-text">Màu sắc: {item.color}</p>
        //                 <input type="number" min="1" defaultValue="1" className="form-control quantity-input mt-2" />
        //                 <div className="price-column mt-2">
        //                   <span className="current-price">{item.price.toLocaleString()} đ</span>
        //                   {item.originalPrice && (
        //                     <span className="original-price">{item.originalPrice.toLocaleString()} đ</span>
        //                   )}
        //                 </div>
        //               </div>
        //             </div>
        //             <div className="col-md-4 d-flex align-items-end">
        //               <div className="action-column">
        //                 <button className="btn btn-danger me-2">Xóa</button>
        //                 <button className="btn btn-info">Xem chi tiết</button>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       ))}
        //     </div>

        //     <div className="cart-footer">
        //       <h4 className="total-price">Tổng tiền: 4.500.000 đ</h4>
        //       <button className="btn btn-success order-button">Đặt hàng</button>
        //     </div>
        //   </div>

        // );
        return (

          <div class="card-wrapper">
            <div className="card-container">
              {/* Left Section: Dish details */}
              <div className="image-container">
                <img
                  src={phat}
                  alt="Food"
                  className="food-image"
                />
              </div>
              <div className="details">
                <div className="actions">
                  <button className="action-button">+</button>
                  <button className="fav-button">♥</button>
                </div>
                <div className="info-row">
                  <div className="column price">
                    <h2 className="price">$22.00</h2>
                  </div>
                  <div className="column quantity">
                    <h2 className="quantity">Quantity: <input type="number" min="1" defaultValue="1" /></h2>
                  </div>
                  <div className="column total">
                    <h2 className="total">Total: $<span id="total-amount">22.00</span></h2>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );

      case 'info':
        return (
          <div className="user-profile-container">
            <div className="profile-image">
              <img src={phat} alt="avatar" />
              <button className="change-avatar-button">Thay ảnh đại diện</button>
            </div>

            <form onSubmit={this.handleUserProfileSubmit}>
              <div className="form-columns">
                {/* Cột 1 */}
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userProfileForm.name}
                      onChange={this.handleUserProfileInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sdt">SĐT</label>
                    <input
                      type="tel"
                      id="sdt"
                      name="sdt"
                      value={userProfileForm.sdt}
                      onChange={this.handleUserProfileInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userProfileForm.email}
                      onChange={this.handleUserProfileInputChange}
                    />
                  </div>
                </div>

                {/* Cột 2 */}
                <div className="form-column">
                  <div className="form-group">
                    <label>Giới tính</label>
                    <div className="gender-group">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Nam"
                          checked={userProfileForm.gender === 'Nam'}
                          onChange={this.handleUserProfileInputChange}
                        />
                        Nam
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Nữ"
                          checked={userProfileForm.gender === 'Nữ'}
                          onChange={this.handleUserProfileInputChange}
                        />
                        Nữ
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Khác"
                          checked={userProfileForm.gender === 'Khác'}
                          onChange={this.handleUserProfileInputChange}
                        />
                        Khác
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthDate">Ngày sinh</label>
                    <DatePicker
                      id="birthDate"
                      value={userProfileForm.birthDate}
                      onChange={this.handleUserProfileDateChange}
                      format="DD/MM/YYYY"
                      placeholder="Chọn ngày sinh"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button">Cập nhật</button>
            </form>

          </div>
        );

      case 'address':

        return <div>Địa chỉ nhận hàng content here</div>;

      case 'payment':
        return (
          <div className="payment-form-container">
            <h1>Phương thức thanh toán</h1>
            <form onSubmit={this.handleFormSubmit} className="payment-form">
              <div className="payment-options-row">
                <div className="payment-option">
                  <label>
                    <img src={ttknh} alt="Cash Icon" />
                    Thanh toán khi nhận hàng
                  </label>
                  <input type="text" name="cashOnDelivery" placeholder="Địa chỉ" />
                </div>
                <div className="payment-option">
                  <label>
                    <img src={vi} alt="VNPay Icon" />
                    Thanh toán qua ví VNPay
                  </label>
                  <input type="text" name="vnpay" placeholder="Cổng Thanh Toán VNPay" />
                </div>
              </div>
              <div className="payment-options-row">
                <div className="payment-option">
                  <label>
                    <img src={tg} alt="Installment Icon" />
                    Trả góp
                  </label>
                  <input type="text" name="installment" placeholder="Tính năng sắp bổ sung" disabled />
                </div>
                <div className="payment-option">
                  <label>
                    <img src={vidt} alt="MoMo Icon" />
                    Ví điện tử
                  </label>
                  <input type="text" name="momo" placeholder="MoMo" />
                </div>
              </div>
              <button type="submit" className="update-button">Cập nhật</button>
            </form>
          </div>


        );
      default:
        return <div>Select an item</div>;
    }
  };

  render() {
    return (
      <div className="payment-method-container">
        <HeaderUser
          selectedItem={this.state.selectedItem}
          onSelectItem={this.handleSelectItem}
        />
        <div className="payment-method-content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default HomePage;
