import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Alert, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(""); // State to hold the new status

  useEffect(() => {
    fetch(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setStatus(data.status); // Set the initial status from the product
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Update status on change
  };

  const handleSaveStatus = () => {
    const updatedProduct = { ...product, status }; // Create an updated product object

    fetch(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(() => {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Product status has been updated successfully.',
          confirmButtonText: 'OK',
        });
        setProduct(updatedProduct); // Update the local state with the new status
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <Row>
        {/* Column for Image */}
        <Col md={6}>
          <img src={product.img} alt={product.name} className="img-fluid" />
        </Col>

        {/* Column for Product Information */}
        <Col md={6}>
          <h2>{product.name}</h2>
          <p><strong>Artist:</strong> {product.artist}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Status:</strong> {product.status}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Dimensions:</strong> {`Height: ${product.detail.height}, Weight: ${product.detail.weight}, Length: ${product.detail.length}`}</p>
          <p><strong>Date:</strong> {product.detail.date}</p>

          {/* Status Update */}
          <Form.Select
            value={status}
            onChange={handleStatusChange}
            style={{ width: '200px', marginTop: '20px' }}
          >
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
          <Button onClick={handleSaveStatus} variant="primary" style={{ marginLeft: '10px' }}>
            Save Status
          </Button>

          {/* Back Button */}
          <Button onClick={() => navigate(-1)} variant="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
            Back
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
