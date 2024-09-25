import React, { useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import './HomePageCustomer.css';

const HomePageCustomer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Handle search logic based on the searchTerm
    console.log(`Searching for ${searchTerm}`);
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
            <div className="col-md-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCustomer;
