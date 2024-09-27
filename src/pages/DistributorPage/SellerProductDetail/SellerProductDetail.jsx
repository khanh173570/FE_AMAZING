import React, { useState, useEffect } from 'react';
import { Descriptions, Avatar, Spin, message, Button, Tag } from 'antd'; // Import Tag from antd
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const SellerProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        message.error('Failed to load product data');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`)
      .then(() => {
        message.success('Product deleted successfully');
        navigate('/seller');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        message.error('Failed to delete product');
      });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  // Function to determine the tag color based on product status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Pending':
        return 'yellow';
      default:
        return 'default'; // Fallback color
    }
  };

  return (
    <div>
      <Descriptions title="Product Details" bordered layout="vertical">
        <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
        <Descriptions.Item label="Artist">{product.artist}</Descriptions.Item>
        <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Type">{product.type}</Descriptions.Item>
        <Descriptions.Item label="Price">{`$${product.price}`}</Descriptions.Item>
        <Descriptions.Item label="Date">
          {new Date(product.detail.date).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={getStatusColor(product.status)}>{product.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {product.description}
        </Descriptions.Item>
        <Descriptions.Item label="Image">
          <Avatar src={product.img} alt={product.name} shape="square" size={120} />
        </Descriptions.Item>
      </Descriptions>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <NavLink to="/seller" style={{ marginRight: '12px', marginTop: '12px' }}>
            <Button type="default">Back</Button>
          </NavLink>
          {product.status === 'Pending' && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              style={{ marginTop: '12px', marginLeft: '12px' }}
              ghost
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Delete
            </Button>
          )}
        </div>
      </Form.Item>
    </div>
  );
};

export default SellerProductDetail;
