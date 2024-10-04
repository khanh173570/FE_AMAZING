import React, { useState, useEffect } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePageCustomer.css';
import { toast } from 'react-toastify';

const HomePageCustomer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570");
        const result = await response.json();
        const acceptedProducts = result.filter(item => item.status === 'Accepted');
        setData(acceptedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    console.log(`Searching for ${searchTerm}`);
  };

  const handleViewDetail = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product) => {
    if (product.quantity <= 0) {
      toast.error("Sản phẩm này không còn hàng để thêm vào giỏ hàng.");
      return;
    }

    const existingProductIndex = cart.findIndex((cartItem) => cartItem.id === product.id);
    if (existingProductIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="sidebar-main">
        <div className="sidebar">
          <h4 className="title">Bạn đang cần gì?</h4>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Tìm kiếm theo tên hoặc loại"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" onClick={handleSearch}>Tìm kiếm</Button>
          </InputGroup>
          <a href="#orders">Orders</a>
          <a href="#products">Products</a>
        </div>
        <div className="main-content">
          <div className="row">
            {data.map((item) => (
              <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                <Card className="h-100">
                  <Card.Img variant="top" src={item.img} alt={item.name} className="card-img-top" />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <div className="titles">Nghệ nhân: {item.artist}</div>
                      <div className="titles" style={{ color: "red" }}>Giá trị: {item.price}</div>
                      <div className="titles">Loại: {item.type}</div>
                      <div className="titles">Danh mục: {item.category}</div>
                      <div className="titles">Số lượng: {item.quantity}</div>
                    </Card.Text>
                    <Button
                      variant="primary"
                      style={{ marginLeft: "10px", backgroundColor: "#E0FFFF", color: "#1E90FF" }}
                      onClick={() => handleViewDetail(item.id)}
                    >
                      Xem Chi Tiết
                    </Button>
                    <Button
                      variant="primary"
                      style={{ marginLeft: "10px", backgroundColor: "#E0FFFF", color: "#1E90FF" }}
                      onClick={() => handleAddToCart(item)}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCustomer;
