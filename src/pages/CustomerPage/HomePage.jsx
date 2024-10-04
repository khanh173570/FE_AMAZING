import React, { Component } from "react";
import HeaderUser from "./HeaderUser";
import "./HomePage.scss";
import ttknh from "/assets/assetsCustomer/ttknh.png";
import vi from "/assets/assetsCustomer/vi.png";
import tg from "/assets/assetsCustomer/tg.png";
import vidt from "/assets/assetsCustomer/vidt.png";
import remove from "/assets/assetsCustomer/remove.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
      selectedProducts: [],
      provinces: [],
      districts: [],
      wards: [],
      selectedProvince: '',
      selectedDistrict: '',
      selectedWard: '',
      continueClicked: false,
      data: [],
      products: [],
    };
  }
  componentDidMount() {
    const storedProducts = localStorage.getItem('cart');
    console.log("check Data", storedProducts);
    if (storedProducts) {
      this.setState({ products: JSON.parse(storedProducts) });
    }

    this.fetchProvinces();
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.products !== this.state.products) {
      localStorage.setItem('cart', JSON.stringify(this.state.products));
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
  fetchData = async () => {
    try {
      const response = await fetch("https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570");
      const result = await response.json();

      // Filter the results to only include products with status "accepted"
      const acceptedProducts = result.filter(item => item.status === 'Accepted');

      this.setState({ data: acceptedProducts }); // Update the state with the filtered data
    } catch (error) {
      console.error("Error fetching data:", error);
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
    this.setState(prevState => {
      const updatedProducts = prevState.products.map(product => {
        if (product.id === productId) {
          console.log(`Tăng số lượng cho sản phẩm: ${product.name}, Số lượng hiện tại: ${product.quantity}, Tồn kho: ${product.stock}`);
          // Kiểm tra nếu số lượng trong giỏ hàng đã bằng hoặc vượt quá số lượng còn lại trong kho
          if (product.quantity >= product.stock) {
            alert(`Sản phẩm ${product.name} đã đạt số lượng tối đa trong kho.`);
            return product; // Giữ nguyên nếu vượt quá số lượng tồn kho
          }
          return { ...product, quantity: product.quantity + 1 }; // Tăng số lượng nếu còn trong kho
        }
        return product;
      });

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  };

  decreaseQuantity = (productId) => {
    this.setState(prevState => {
      const updatedProducts = prevState.products.map(product => {
        if (product.id === productId) {
          console.log(`Giảm số lượng cho sản phẩm: ${product.name}, Số lượng hiện tại: ${product.quantity}, Tồn kho: ${product.stock}`);
          // Giảm số lượng nếu còn nhiều hơn 1
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            alert(`Số lượng sản phẩm ${product.name} không thể nhỏ hơn 1.`);
            return product; // Giữ nguyên nếu số lượng <= 1
          }
        }
        return product;
      });

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  };



  handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    this.setState(prevState => {
      const updatedProducts = prevState.products.map(product => {
        if (product.id === productId) {
          console.log(`thay đổi số lượng cho sản phẩm: ${product.name}, Số lượng hiện tại: ${product.quantity}, Tồn kho: ${product.stock}`);
          // Kiểm tra và đảm bảo giá trị mới nằm trong phạm vi hợp lệ
          const newQuantity = Math.max(1, Math.min(value, product.stock)); // Đảm bảo số lượng từ 1 đến stock
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      localStorage.setItem('cart', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
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
    this.setState(prevState => {
      const updatedProducts = prevState.products.filter(product => product.id !== productId);

      // Lưu giỏ hàng cập nhật vào localStorage
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
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
  handleContinueClick = () => {
    this.setState({ continueClicked: true });
    window.location.href = "/";
  };





  handleSubmitInfoClick = () => {
    this.setState({ selectedItem: 'payment' });
  };
  handleSubmitClick = () => {
    this.setState({ selectedItem: 'acceptpayment' });
  };

  handlePayment = async () => {
    const { products } = this.state;
    // Tính toán tổng số tiền từ các sản phẩm
    const totalAmount = products.reduce((total, product) => {
      return total + (this.formatCurrency(product.price) * product.quantity);
    }, 0);
    try {
      await Promise.all(
        products.map(product => this.updateProductQuantity(product.id, product.quantity))
      );

      toast.success("Thanh toán thành công!", {
        position: "top-right",
        autoClose: 2000, // Toast will show for 5 seconds (5000ms)
      });

      // Set timeout for 5 seconds to wait before executing the next action
      setTimeout(() => {
        localStorage.removeItem('cart'); // Clear cart from localStorage
        localStorage.removeItem('products'); // Clear products from localStorage
        this.props.navigate("/"); // Navigate to home page
      }, 2000); // 5 seconds delay

    } catch (error) {
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  // Hàm gọi API để cập nhật số lượng sản phẩm
  updateProductQuantity = async (productId, quantityPurchased) => {
    const mockAPI = `https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${productId}`;

    try {
      // Lấy thông tin sản phẩm từ API trước
      const productData = await fetch(mockAPI)
        .then(response => response.json());

      const currentQuantity = productData.quantity; // Lấy số lượng hiện tại từ API

      // Tính toán số lượng còn lại
      const remainingQuantity = currentQuantity - quantityPurchased;

      // Kiểm tra nếu số lượng còn lại không đủ
      if (remainingQuantity < 0) {
        toast.error(`Số lượng sản phẩm ${productId} không đủ để mua.`, {
          autoClose: 2000, // Set toast duration to 2 seconds
        });
        throw new Error(`Số lượng sản phẩm ${productId} không đủ để mua.`);
      }

      // Cập nhật lại số lượng trong API
      return fetch(mockAPI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: remainingQuantity, // Gửi số lượng còn lại
        })
      })
        .then(response => response.json())
        .then(data => {
          toast.success(`Sản phẩm ${productId} đã được cập nhật. Số lượng còn lại: ${remainingQuantity}`, {
            autoClose: 2000, // Set toast duration to 2 seconds
          });
          return data;
        })
        .catch(error => {
          toast.error(`Lỗi khi cập nhật số lượng cho sản phẩm ${productId}.`, {
            autoClose: 2000, // Set toast duration to 2 seconds
          });
          throw error;
        });
    } catch (error) {
      toast.error(`Lỗi khi lấy thông tin sản phẩm ${productId}.`, {
        autoClose: 2000, // Set toast duration to 2 seconds
      });
      throw error;
    }
  };


  formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  }




  renderContent = () => {
    const { selectedItem, userProfileForm, products, selectedProducts, provinces, districts, wards, selectedProvince, selectedDistrict, selectedWard } = this.state;
    const totalAmount =
      products
        .filter((product) => selectedProducts.includes(product.id))
        .reduce((total, product) => total + (product.price * product.quantity), 0)




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
                    <img src={product.img} className="food-image" />
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
                          <p>{this.formatCurrency(product.price)}</p>
                        </div>

                      </div>
                      <div className="column quantity">
                        <div className="item-container">
                          <div className="quantity-control">
                            <div className="quantity-buttons">
                              {/* Nút giảm số lượng */}
                              <button
                                className="quantity-button decrease"
                                onClick={() => this.decreaseQuantity(product.id)}
                                disabled={product.quantity <= 1} // Disable khi số lượng = 1
                              >
                                -
                              </button>

                              {/* Hiển thị số lượng */}
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

                              {/* Nút tăng số lượng */}
                              <button
                                className="quantity-button increase"
                                onClick={() => this.increaseQuantity(product.id)}
                                disabled={product.quantity >= product.stock} // Disable khi quantity >= stock
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column total">
                        <div className="item-container">
                          <h2 className="label">Total</h2>
                          <span className="item">
                            {this.formatCurrency(product.price * product.quantity)}
                          </span>

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
                {/* Kiểm tra xem có sản phẩm nào trong giỏ hàng không */}
                {products.length > 0 && (
                  <div>
                    {/* Các sản phẩm hoặc thông tin sản phẩm */}
                    <button className="continue-button" onClick={this.handleContinueClick}>
                      Tiếp tục xem sản phẩm
                    </button>
                  </div>
                )}
                {products.length > 0 && (
                  <button className="update-cart-button">Cập nhật giỏ hàng</button>
                )}
              </div>


            </div>
            <div className="additional-column">

              <div className="order-summary">
                <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <table style={{ borderCollapse: 'separate' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '1px', textAlign: 'center' }}>Quantity</th>
                        <th style={{ border: '1px solid #ddd', padding: '1px', textAlign: 'center' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '1px', textAlign: 'center' }}>Price</th>
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
                              {this.formatCurrency(product.price * product.quantity)}
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
                    {this.formatCurrency(
                      products
                        .filter((product) => selectedProducts.includes(product.id))
                        .reduce((total, product) => total + product.price * product.quantity, 0)
                    )}
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
                <h3>Đơn hàng</h3>
                <div className="order-items">
                  <div
                    style={{
                      maxHeight: '200px',
                      overflowY: selectedProducts.length > 0 && selectedProducts.length * 50 > 100 ? 'auto' : 'hidden', // Điều chỉnh overflowY dựa trên số lượng sản phẩm được chọn
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        minHeight: selectedProducts.length > 0 ? '100px' : '300px', // Giữ chiều cao tối thiểu
                        margin: '0',
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ border: '1px solid #ddd', textAlign: 'center', padding: '5px' }}>Quantity</th>
                          <th style={{ border: '1px solid #ddd', textAlign: 'center', padding: '5px' }}>Name</th>
                          <th style={{ border: '1px solid #ddd', textAlign: 'center', padding: '5px' }}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products
                          .filter((product) => selectedProducts.includes(product.id))
                          .map((product) => (
                            <tr key={product.id} className="order-item">
                              <td className="order-item-qty" style={{ border: '1px solid #ddd', padding: '1px', textAlign: 'center' }}>
                                {product.quantity}
                              </td>
                              <td className="order-item-name" style={{ border: '1px solid #ddd', padding: '1px', textAlign: 'center' }}>
                                {product.name}
                              </td>
                              <td className="order-item-price" style={{ border: '1px solid #ddd', padding: '1px', textAlign: 'center' }}>
                                {this.formatCurrency(product.price * product.quantity)}
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
                </div>
                {selectedProducts.length > 0 && (
                  <div className="total">
                    <div className="price">
                      <p>Total: {this.formatCurrency(totalAmount)}</p>
                    </div>
                    <button
                      className="checkout-button"
                      onClick={this.handlePayment}
                      style={{ marginLeft: '0' }} // Tắt margin-left bằng inline style
                    >
                      Thanh toán
                    </button>

                  </div>
                )}
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

const HomePageWrapper = () => {
  const navigate = useNavigate();
  return <HomePage navigate={navigate} />;
};

export default HomePageWrapper;




