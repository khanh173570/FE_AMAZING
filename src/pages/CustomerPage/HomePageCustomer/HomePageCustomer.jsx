import React, { useState, useEffect } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomePageCustomer.css';

const HomePageCustomer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570");
        const result = await response.json();
        
        // Filter the results to only include products with status "accepted"
        const acceptedProducts = result.filter(item => item.status === 'Accepted');
        
        setData(acceptedProducts); // Set the filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Handle search logic based on the searchTerm
    console.log(`Searching for ${searchTerm}`);
  };

  const handleViewDetail = (id) => {
    // Navigate to the detail page
    navigate(`/products/${id}`); // Change this to your detail page route
  };

  return (
    <div className="container-fluid">
      <div className="sidebar-main">
        {/* Sidebar */}
        <div className="sidebar">
          <h4 className="title">Bạn đang cần gì ?</h4>
          
          {/* Search Input */}
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Tìm kiếm theo tên hoặc loại"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </InputGroup>

          <a href="#orders">Orders</a>
          <a href="#products">Products</a>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="row">
            {data.map((item) => (
              <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                <Card>
                  <Card.Img variant="top" src={item.img} alt={item.name} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text  > 
                      <div className="titles">Nghệ nhân: {item.artist}</div> <br />
                      <div className="titles" style={{color:"red"}}>Giá trị: ${item.price}</div> 
                      <div className="titles">Loại:  {item.type}</div>
                      <div className="titles">Danh mục:  {item.category}</div> 
                      <div className="titles">Số lượng:  {item.quantity}</div>
                      
                    </Card.Text>
                    <Button variant="primary" style={{marginLeft:"10px", backgroundColor:"#E0FFFF", color:"#1E90FF"}} onClick={() => handleViewDetail(item.id)} >
                      Xem Chi Tiết
                    </Button>
                    <Button variant="primary" style={{marginLeft:"10px", backgroundColor:"#E0FFFF", color:"#1E90FF"}}>Thêm vào giỏ</Button>
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
