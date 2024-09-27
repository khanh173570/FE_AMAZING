import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { NavLink } from 'react-router-dom'; // Ensure NavLink is imported

const { TextArea } = Input; // Ant Design TextArea for description

const SellerAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation after successful submission

  const onFinish = (values) => {
    setLoading(true);

    // Construct product object with auto-filled status and date
    const productData = {
      ...values,
      status: 'Pending', // Automatically set status
      detail: {
        ...values.detail,
        date: new Date().toISOString().split('T')[0], // Set the date to the current date
      },
    };

    // Send data to the API
    axios
      .post('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570', productData)
      .then(() => {
        message.success('Product added successfully');
        navigate('/seller'); // Redirect to product list page after success
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        message.error('Failed to add product');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      name="add_product"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ quantity: 1 }} // Set initial value for quantity
    >
      <Row gutter={24}>
        {/* First Column */}
        <Col span={12}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Artist"
            name="artist"
            rules={[{ required: true, message: 'Please enter the artist name' }]}
          >
            <Input placeholder="Enter artist name" />
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber
              placeholder="Enter price"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please enter the product type' }]}
          >
            <Input placeholder="Enter product type" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please enter the category' }]}
          >
            <Input placeholder="Enter product category" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
        </Col>

        {/* Second Column */}
        <Col span={12}>
          <Form.Item
            label="Image URL"
            name="img"
            rules={[{ required: true, message: 'Please enter the image URL' }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Height (cm)"
            name={['detail', 'height']}
            rules={[{ required: true, message: 'Please enter the height' }]}
          >
            <InputNumber
              placeholder="Enter height"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Weight (kg)"
            name={['detail', 'weight']}
            rules={[{ required: true, message: 'Please enter the weight' }]}
          >
            <InputNumber
              placeholder="Enter weight"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Length (cm)"
            name={['detail', 'length']}
            rules={[{ required: true, message: 'Please enter the length' }]}
          >
            <InputNumber
              placeholder="Enter length"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Product ID"
            name={['detail', 'idProduct']}
            rules={[{ required: true, message: 'Please enter the product ID' }]}
          >
            <Input placeholder="Enter product ID" />
          </Form.Item>
        </Col>
      </Row>


      <Form.Item>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <NavLink to="/seller" style={{ marginRight: '8px' }}>
      <Button type="default">
        Back
      </Button>
    </NavLink>
    <Button type="primary" htmlType="submit" loading={loading}>
      Add Product
    </Button>
  </div>
</Form.Item>

    </Form>
  );
};

export default SellerAddProduct;
