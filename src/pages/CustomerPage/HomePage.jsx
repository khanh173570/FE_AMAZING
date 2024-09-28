import React, { Component } from "react";
import HeaderUser from "./HeaderUser";
import "./HomePage.scss";
import phat from "/assets/assetsCustomer/phat.jpg";
import ttknh from "/assets/assetsCustomer/ttknh.png";
import vi from "/assets/assetsCustomer/vi.png";
import tg from "/assets/assetsCustomer/tg.png";
import vidt from "/assets/assetsCustomer/vidt.png";
import remove from "/assets/assetsCustomer/remove.png";
import { DatePicker } from 'antd';
import axios from 'axios';


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
      },
      products: [
        { id: 1, name: "Dish 1", price: 22.00, quantity: 1, image: phat },
        { id: 2, name: "Dish 2", price: 15.00, quantity: 1, image: phat },
        { id: 3, name: "Dish 3", price: 30.00, quantity: 1, image: phat },
        { id: 4, name: "Dish 4", price: 25.00, quantity: 1, image: phat },
        { id: 5, name: "Dish 5", price: 25.00, quantity: 1, image: phat },
        { id: 6, name: "Dish 6", price: 25.00, quantity: 1, image: phat },
      ],
      selectedProducts: [],
      provinces: [],
      districts: [],
      wards: [],
      selectedProvince: '',
      selectedDistrict: '',
      selectedWard: '',
    };
  }
  componentDidMount() {
    this.fetchProvinces();
    const orderDetails = localStorage.getItem('orderDetails');
    if (orderDetails) {
      console.log('Retrieved Order Details:', JSON.parse(orderDetails));
    }
  }

  fetchProvinces = async () => {
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      this.setState({ provinces: response.data });
    } catch (error) {
      console.error("Error fetching provinces: ", error);
    }
  };

  handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    this.setState({ selectedProvince: provinceId, selectedDistrict: '', selectedWard: '', districts: [], wards: [] });

    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`);
      this.setState({ districts: response.data.districts });
    } catch (error) {
      console.error("Error fetching districts: ", error);
    }
  };

  handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    this.setState({ selectedDistrict: districtId, selectedWard: '', wards: [] });

    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`);
      this.setState({ wards: response.data.wards });
    } catch (error) {
      console.error("Error fetching wards: ", error);
    }
  };

  handleWardChange = (e) => {
    this.setState({ selectedWard: e.target.value });
  };


  increaseQuantity = (productId) => {
    this.setState(prevState => ({
      products: prevState.products.map(product =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    }));
  };

  decreaseQuantity = (productId) => {
    this.setState(prevState => ({
      products: prevState.products.map(product =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    }));
  };

  handleQuantityChange = (e, productId) => {
    const newQuantity = e.target.value;

    //Nhập giá trị trống hoặc số lớn hơn 0
    if (newQuantity === '' || parseInt(newQuantity, 10) >= 0) {
      this.setState(prevState => ({
        products: prevState.products.map(product =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      }));
    }
  };

  handleQuantityBlur = (productId) => {
    this.setState(prevState => ({
      products: prevState.products.map(product =>
        product.id === productId && (product.quantity === '' || product.quantity === '0')
          ? { ...product, quantity: 1 } // Nếu để trống hoặc là 0 thì cập nhật lại thành 1
          : product
      )
    }));
  };



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

  //Xóa sản phẩm
  handleDelete = (productId) => {
    this.setState(prevState => ({
      products: prevState.products.filter(product => product.id !== productId)
    }));
  };

  handleCheckboxChange = (productId) => {
    const { selectedProducts } = this.state;
    if (selectedProducts.includes(productId)) {
      // ấn lần 2 sẽ xóa khỏi list
      this.setState({
        selectedProducts: selectedProducts.filter((id) => id !== productId),
      });
    } else {
      // ấn 1 lần sẽ thêm vào list
      this.setState({
        selectedProducts: [...selectedProducts, productId],
      });
    }
  };


  handleOrderClick = () => {
    this.setState({ selectedItem: 'info' });
  };





  handleSubmitInfoClick = () => {
    this.setState({ selectedItem: 'payment' });
  };
  handleSubmitClick = () => {
    this.setState({ selectedItem: 'acceptpayment' });
  };



  renderContent = () => {
    const { selectedItem, userProfileForm, products, selectedProducts, provinces, districts, wards, selectedProvince, selectedDistrict, selectedWard } = this.state;


    switch (selectedItem) {

      case 'cart':
        return (
          <div className="card-wrapper">
            <div className="product-column">
              {products.map((product) => (
                <div key={product.id} className="card-container">
                  <div className="select-product">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => this.handleCheckboxChange(product.id)}
                    />
                  </div>
                  <div className="image-container">
                    <img src={product.image} className="food-image" />
                  </div>
                  <div className="details">
                    <div className="info-row">
                      <div className="column name">
                        <div className="item-container">
                          <h2 className="label">Name Product</h2>
                          <span className="item">{product.name}</span>
                        </div>
                      </div>
                      <div className="column price">
                        <div className="item-container">
                          <h2 className="label">Price</h2>
                          <span className="item">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="column quantity">
                        <div className="item-container">
                          <div className="quantity-control">
                            <div className="quantity-buttons">
                              <button
                                className="quantity-button decrease"
                                onClick={() => this.decreaseQuantity(product.id)}>
                                -
                              </button>
                              <span className="quantity-display">
                                <input
                                  type="number"
                                  min="1"
                                  value={product.quantity}
                                  onChange={(e) => this.handleQuantityChange(e, product.id)}
                                  onBlur={() => this.handleQuantityBlur(product.id)}
                                  className="quantity-input"
                                />
                              </span>
                              <button
                                className="quantity-button increase"
                                onClick={() => this.increaseQuantity(product.id)}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column total">
                        <div className="item-container">
                          <h2 className="label">Total</h2>
                          <span className="item">${(product.price * product.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="delete-icon">
                        <button
                          className="delete-button"
                          onClick={() => this.handleDelete(product.id)}
                        >
                          <img src={remove} alt="Delete" className="delete-icon" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              ))}

              <div className="sticky-buttons">
                <button className="continue-button">Tiếp tục xem sản phẩm</button>
                <button className="update-cart-button">Cập nhật giỏ hàng</button>
              </div>
            </div>
            <div className="additional-column">

              <div className="order-summary">
                <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minHeight: '320px' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '1px' }}>Quantity</th>
                        <th style={{ border: '1px solid #ddd', padding: '1px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '1px' }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products
                        .filter((product) => selectedProducts.includes(product.id))
                        .map((product) => (
                          <tr key={product.id} className="order-item">
                            <td className="order-item-qty" style={{ border: '1px solid #ddd', padding: '1px' }}>{product.quantity}</td>
                            <td className="order-item-name" style={{ border: '1px solid #ddd', padding: '1px' }}>{product.name}</td>
                            <td className="order-item-price" style={{ border: '1px solid #ddd', padding: '1px' }}>
                              ${(product.price * product.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      {selectedProducts.length === 0 && (
                        <tr>
                          <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>No items selected</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>



                <div className="order-total">
                  <h3>Total:</h3>
                  <span className="order-total-amount">
                    ${products
                      .filter((product) => selectedProducts.includes(product.id))
                      .reduce((total, product) => total + product.price * product.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <button className="order-button" onClick={this.handleOrderClick}> {/* Updated to use this.handleOrderClick */}
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="user-profile-container">
            <h1>Thông tin thanh toán</h1>
            <form className="user-profile-form" onSubmit={this.handleUserProfileSubmit}>
              <div className="form-row">
                {/* Column 1 */}
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
                </div>

                {/* Column 2 */}
                <div className="form-column">
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
                  <div className="form-group">
                    <label>Quận / Huyện</label>
                    <select
                      onChange={this.handleDistrictChange}
                      value={selectedDistrict}
                      disabled={!selectedProvince}
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Column 3 */}
                <div className="form-column">

                  <div className="form-group">
                    <label>Tỉnh / Thành phố</label>
                    <select onChange={this.handleProvinceChange} value={selectedProvince}>
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Phường / Xã</label>
                    <select
                      onChange={this.handleWardChange}
                      value={selectedWard}
                      disabled={!selectedDistrict}
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Full width row for additional notes */}
              <div className="form-row">
                <div className="form-column full-width">
                  <div className="form-group">
                    <label>Ghi chú (Số nhà, địa chỉ cụ thể)</label>
                    <textarea rows="3" placeholder="" className="form-control" />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button type="submit" className="submit-button" onClick={this.handleSubmitInfoClick}>Cập nhật</button>
            </form>
          </div>
        );

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
              <button type="submit" className="update-button" onClick={this.handleSubmitClick}>
                Cập nhật
              </button>
            </form>
          </div>


        );


      case 'acceptpayment':
        return (
          <div className="order-form">
            <h2>Đặt hàng</h2>
            <div className="form-container">
              <div className="customer-info">
                <div className="input-row">
                  <div className="input-group">
                    <h3>Thông tin người nhận</h3>
                    <input type="text" placeholder="Lê Văn Trung" />
                  </div>
                  <div className="input-group">
                    <h3>SĐT</h3>
                    <input type="text" placeholder="0947225188" />
                  </div>
                </div>
                <div className="full-width">
                  <h3>Địa chỉ nhận</h3>
                  <input type="text" placeholder="Thanh Hóa, Hậu Lộc, Hưng Lộc, Số nhà 21" />
                </div>
                <div className="payment-methods">
                  <h3>Phương thức thanh toán</h3>
                  <div className="buttons">
                    <button className="active">Trực tiếp</button>
                    <button>Thẻ tín dụng</button>
                    <button>Ví MoMo</button>
                  </div>
                </div>
              </div>
              <div className="order-summary1">
                <h3>Đơn hàng  <span className="edit">Sửa</span></h3>
                <div className="order-items">
                  <div className="item">
                    <span>1 x Tượng phật</span>
                    <span>3.200.000</span>
                  </div>
                  <div className="item">
                    <span>1 x Tượng phật</span>
                    <span>1.300.000</span>
                  </div>
                </div>
                <div className="total">
                  <span>Thành tiền</span>
                  <span className="price">4.500.000</span>
                </div>
                <button className="checkout-button">Thanh toán</button>
              </div>
            </div>
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




